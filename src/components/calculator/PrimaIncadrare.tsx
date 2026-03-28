import { useState } from 'react';
import { CorpGradSelect } from './CorpGradSelect';
import { ResultDisplay } from './ResultDisplay';
import { COTA_BANI_2026, COTA_NATURA_2026, LUNI, Corp, formatLei } from './constants';
import { Info } from 'lucide-react';

// Items distributed once at initial grade (from Annex table)
const ARTICOLE_O_SINGURA_DATA = [
  'Șapcă din stofă',
  'Costum din stofă (sacou cu 2 pantaloni)',
  'Pardesiu / Impermeabil pentru ploaie',
  '3 perechi suporți de grad profesional',
  '2 perechi epoleți cu grad profesional',
];

export function PrimaIncadrare() {
  const [corp, setCorp] = useState<Corp>('ofiteri');
  const [grad, setGrad] = useState('');
  const [lunaIncadrare, setLunaIncadrare] = useState(9);
  const [echipamentPrimitGrad, setEchipamentPrimitGrad] = useState(0);
  const [echipamentPrimitCota, setEchipamentPrimitCota] = useState(0);
  const [aSursa, setASursa] = useState<'absolvent' | 'extern'>('absolvent');
  const [aDetinutAnterior, setADetinutAnterior] = useState(false);

  // Art. 25 alin. 2: drepturi acordate în anul încadrării, indiferent de dată
  const cotaBani = COTA_BANI_2026;
  const cotaNatura = COTA_NATURA_2026;

  // One-time items value (received at grade award)
  const dreptArticoleGrad = aDetinutAnterior ? 0 : echipamentPrimitGrad;

  // Difference calculation (Art. 24 alin. 3)
  const totalPrimit = dreptArticoleGrad + echipamentPrimitCota;
  const drepturiCuvenite = cotaNatura; // Full year quota for in-kind

  const diferenta = drepturiCuvenite - echipamentPrimitCota;
  const esteAnticipatie = diferenta < 0;

  // Cash equivalent
  const procentNatura = cotaNatura > 0 ? Math.min(100, (echipamentPrimitCota / cotaNatura) * 100) : 0;
  const reducereBani = (procentNatura / 100) * cotaBani;
  const totalBani = cotaBani - reducereBani;
  const baniLunar = totalBani / 12;

  const lines = [
    ...(aDetinutAnterior ? [] : [{ label: 'Articole distribuite la acordarea gradului', value: echipamentPrimitGrad }]),
    { label: 'Echipament primit din cotă anuală', value: echipamentPrimitCota },
    { label: 'Cotă anuală natură', value: cotaNatura },
    { label: 'Reducere proporțională bani (' + procentNatura.toFixed(1) + '%)', value: reducereBani, negative: true },
    { label: 'Total drepturi bani (an complet)', value: totalBani, bold: true, highlight: true, separator: true },
    { label: '→ Sumă lunară (1/12)', value: baniLunar, bold: true, highlight: true },
    {
      label: esteAnticipatie ? 'Anticipație pentru anul următor' : 'Drept natură rămas de primit',
      value: Math.abs(diferenta),
      bold: true,
      highlight: true,
      separator: true,
      negative: esteAnticipatie,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex gap-2 text-xs text-muted-foreground bg-accent/10 rounded-lg p-3">
        <span>🎓</span>
        <span>
          Calculul drepturilor la prima încadrare – absolvenți sau sursă externă (Art. 24-25).
          Drepturile se acordă în anul încadrării, indiferent de data acordării gradului.
        </span>
      </div>

      <CorpGradSelect corp={corp} setCorp={setCorp} grad={grad} setGrad={setGrad} />

      {/* Sursa */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Sursa încadrării</label>
        <div className="grid grid-cols-2 gap-3">
          <label className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer text-sm ${
            aSursa === 'absolvent' ? 'border-primary bg-primary/5' : 'border-input'
          }`}>
            <input type="radio" checked={aSursa === 'absolvent'} onChange={() => setASursa('absolvent')} />
            Absolvent instituție
          </label>
          <label className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer text-sm ${
            aSursa === 'extern' ? 'border-primary bg-primary/5' : 'border-input'
          }`}>
            <input type="radio" checked={aSursa === 'extern'} onChange={() => setASursa('extern')} />
            Sursă externă
          </label>
        </div>
      </div>

      {/* A mai deținut calitatea */}
      <label className="flex items-start gap-3 rounded-lg border border-input p-3 cursor-pointer">
        <input
          type="checkbox"
          checked={aDetinutAnterior}
          onChange={e => setADetinutAnterior(e.target.checked)}
          className="mt-0.5"
        />
        <div>
          <span className="text-sm text-foreground">A mai deținut calitatea de ofițer/agent anterior</span>
          <p className="text-[11px] text-muted-foreground">
            Art. 24 alin. 5: Nu mai are dreptul la articolele distribuite o singură dată la acordarea gradului.
          </p>
        </div>
      </label>

      {/* Luna încadrării */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Luna încadrării</label>
        <select
          value={lunaIncadrare}
          onChange={e => setLunaIncadrare(Number(e.target.value))}
          className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {LUNI.map((luna, i) => (
            <option key={luna} value={i + 1}>{luna}</option>
          ))}
        </select>
      </div>

      {/* One-time items */}
      {!aDetinutAnterior && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Articole primite la acordarea gradului (Art. 24 alin. 1 lit. a)</span>
          </div>
          <div className="bg-secondary/30 rounded-lg p-3 space-y-1">
            {ARTICOLE_O_SINGURA_DATA.map(art => (
              <p key={art} className="text-xs text-muted-foreground">• {art}</p>
            ))}
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-muted-foreground">Valoare totală articole primite la grad (lei)</label>
            <input
              type="number"
              min={0}
              value={echipamentPrimitGrad || ''}
              onChange={e => setEchipamentPrimitGrad(Math.max(0, Number(e.target.value)))}
              placeholder="0.00"
              className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      )}

      {/* Echipament din cotă anuală */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Echipament primit din cota anuală (lei) – Art. 24 alin. 1 lit. b
        </label>
        <input
          type="number"
          min={0}
          max={COTA_NATURA_2026}
          value={echipamentPrimitCota || ''}
          onChange={e => setEchipamentPrimitCota(Math.max(0, Number(e.target.value)))}
          placeholder="0.00"
          className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="text-[10px] text-muted-foreground/60">
          Se asigură cu prioritate articolele din coloana 4 a tabelului din anexă (Art. 24 alin. 2).
        </p>
      </div>

      <ResultDisplay
        title="Rezultat – Prima încadrare"
        lines={lines}
        progressLabel="Procent utilizat din cota natură"
        progressValue={procentNatura}
        notes={[
          '<strong>Art. 24-25</strong>: Drepturile se acordă în anul încadrării, indiferent de data acordării gradului.',
          esteAnticipatie
            ? '<strong>Art. 24 alin. 3 lit. a</strong>: Valoarea care depășește drepturile anului se consideră anticipație.'
            : '<strong>Art. 24 alin. 3 lit. b</strong>: Diferența se acordă în echipament de unitatea de încadrare.',
          `Cota anuală 2026: <strong>${formatLei(COTA_BANI_2026)}</strong> (bani) / <strong>${formatLei(COTA_NATURA_2026)}</strong> (natură).`,
        ]}
      />
    </div>
  );
}
