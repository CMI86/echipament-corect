import { useState } from 'react';
import { CorpGradSelect } from './CorpGradSelect';
import { RestanteAnticipații } from './RestanteAnticipații';
import { ResultDisplay } from './ResultDisplay';
import { COTA_BANI_2026, COTA_NATURA_2026, LUNI, Corp, formatLei } from './constants';

interface Props {
  /** true = mutare (Art. 22, 32), false = încadrare altă unitate (Art. 23) */
  isMutare: boolean;
}

export function MutareUnitate({ isMutare }: Props) {
  const [corp, setCorp] = useState<Corp>('ofiteri');
  const [grad, setGrad] = useState('');
  const [lunaMutare, setLunaMutare] = useState(6);
  const [echipamentPrimit, setEchipamentPrimit] = useState(0);
  const [baniPrimiti, setBaniPrimiti] = useState(0);
  const [restanteBani, setRestanteBani] = useState(0);
  const [restanteNatura, setRestanteNatura] = useState(0);
  const [anticipatiiBani, setAntipatiiBani] = useState(0);
  const [anticipatiiNatura, setAntipatiiNatura] = useState(0);

  // Prorated quotas for months worked (including transfer month)
  const cotaBaniProrata = (COTA_BANI_2026 / 12) * lunaMutare;
  const cotaNaturaProrata = (COTA_NATURA_2026 / 12) * lunaMutare;

  // Remaining months at new unit
  const luniRamase = 12 - lunaMutare;
  const cotaBaniNoua = (COTA_BANI_2026 / 12) * luniRamase;
  const cotaNaturaNoua = (COTA_NATURA_2026 / 12) * luniRamase;

  // What the old unit owes/recovers
  const procentNaturaVechi = cotaNaturaProrata > 0 ? Math.min(100, (echipamentPrimit / cotaNaturaProrata) * 100) : 0;
  const reducereBaniVechi = (procentNaturaVechi / 100) * cotaBaniProrata;
  const dreptBaniVechi = cotaBaniProrata - reducereBaniVechi;
  const diferentaBaniVechi = dreptBaniVechi - baniPrimiti;

  // What the new unit provides
  const naturaNedistribuita = Math.max(0, cotaNaturaProrata - echipamentPrimit);
  const totalNaturaNou = cotaNaturaNoua + naturaNedistribuita + restanteNatura - anticipatiiNatura;
  const totalBaniNou = cotaBaniNoua + restanteBani - anticipatiiBani;
  const baniLunarNou = luniRamase > 0 ? totalBaniNou / luniRamase : 0;

  const articolRef = isMutare ? 'Art. 22, 32' : 'Art. 23';
  const titlu = isMutare ? 'Mutare la altă unitate' : 'Încadrare la altă unitate';

  const lines = [
    { label: `Cotă proratată ${lunaMutare} luni (bani)`, value: cotaBaniProrata },
    { label: `Cotă proratată ${lunaMutare} luni (natură)`, value: cotaNaturaProrata },
    { label: 'Echipament primit (natură)', value: echipamentPrimit, negative: true },
    { label: 'Bani primiți de la unitatea veche', value: baniPrimiti, negative: true },
    { label: 'Reducere proporțională bani', value: reducereBaniVechi, negative: true },
    {
      label: diferentaBaniVechi >= 0
        ? 'Diferență bani de primit (unitatea veche)'
        : 'Diferență bani de recuperat (unitatea veche)',
      value: diferentaBaniVechi,
      bold: true,
      highlight: true,
      separator: true,
    },
    { label: `Drepturi natură la unitatea nouă (${luniRamase} luni)`, value: totalNaturaNou, bold: true, highlight: true, separator: true },
    { label: `Drepturi bani la unitatea nouă (${luniRamase} luni)`, value: totalBaniNou, bold: true, highlight: true },
    { label: `→ Sumă lunară la noua unitate`, value: baniLunarNou, bold: true, highlight: true },
  ];

  return (
    <div className="space-y-5">
      <div className="flex gap-2 text-xs text-muted-foreground bg-accent/10 rounded-lg p-3">
        <span>🔄</span>
        <span>
          {isMutare
            ? 'Calculul drepturilor la mutarea dintr-o unitate în alta (Art. 22, 32). Luna mutării se consideră achitată dacă s-a lucrat cel puțin o zi.'
            : 'Calculul drepturilor la încadrarea de la altă structură (Art. 23). Drepturile se acordă din prima zi a lunii următoare mutării.'
          }
        </span>
      </div>

      <CorpGradSelect corp={corp} setCorp={setCorp} grad={grad} setGrad={setGrad} />

      {/* Luna mutării */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Luna {isMutare ? 'mutării' : 'încadrării'} (inclusiv)
        </label>
        <select
          value={lunaMutare}
          onChange={e => setLunaMutare(Number(e.target.value))}
          className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {LUNI.map((luna, i) => (
            <option key={luna} value={i + 1}>{luna} ({i + 1} {i === 0 ? 'lună' : 'luni'})</option>
          ))}
        </select>
      </div>

      {/* Echipament primit */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Echipament primit în natură la unitatea veche (lei)
        </label>
        <input
          type="number"
          min={0}
          value={echipamentPrimit || ''}
          onChange={e => setEchipamentPrimit(Math.max(0, Number(e.target.value)))}
          placeholder="0.00"
          className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Bani primiți */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Bani primiți de la unitatea veche (lei)
        </label>
        <input
          type="number"
          min={0}
          value={baniPrimiti || ''}
          onChange={e => setBaniPrimiti(Math.max(0, Number(e.target.value)))}
          placeholder="0.00"
          className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <RestanteAnticipații
        restanteBani={restanteBani} setRestanteBani={setRestanteBani}
        restanteNatura={restanteNatura} setRestanteNatura={setRestanteNatura}
        anticipatiiBani={anticipatiiBani} setAntipatiiBani={setAntipatiiBani}
        anticipatiiNatura={anticipatiiNatura} setAntipatiiNatura={setAntipatiiNatura}
      />

      <ResultDisplay
        title={`Rezultat – ${titlu}`}
        lines={lines}
        notes={[
          `<strong>${articolRef}</strong>: Drepturile în bani pentru lunile lucrate se asigură de unitatea veche. Echipamentul solicitat și neasigurat se distribuie de unitatea nouă.`,
          isMutare
            ? 'La mutare, unitatea veche comunică extrasul drepturilor în 15 zile calendaristice (Art. 32 alin. 1).'
            : 'Dacă este necesară uniformă completă, excedentul se consideră anticipație (Art. 23 alin. 3).',
          `Cota anuală 2026: <strong>${formatLei(COTA_BANI_2026)}</strong> (bani) / <strong>${formatLei(COTA_NATURA_2026)}</strong> (natură).`,
        ]}
      />
    </div>
  );
}
