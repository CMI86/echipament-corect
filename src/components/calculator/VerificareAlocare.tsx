import { useState } from 'react';
import { CorpGradSelect } from './CorpGradSelect';
import { RestanteAnticipații } from './RestanteAnticipații';
import { ResultDisplay } from './ResultDisplay';
import { COTA_BANI_2026, COTA_NATURA_2026, TIPURI_ALOCARE, TipAlocare, Corp, formatLei } from './constants';

export function VerificareAlocare() {
  const [corp, setCorp] = useState<Corp>('ofiteri');
  const [grad, setGrad] = useState('');
  const [tipAlocare, setTipAlocare] = useState<TipAlocare>('echipament_si_bani');
  const [echipamentPrimit, setEchipamentPrimit] = useState(0);
  const [restanteBani, setRestanteBani] = useState(0);
  const [restanteNatura, setRestanteNatura] = useState(0);
  const [anticipatiiBani, setAntipatiiBani] = useState(0);
  const [anticipatiiNatura, setAntipatiiNatura] = useState(0);

  // Proportionality: in-kind usage reduces cash quota proportionally
  const procentNatura = COTA_NATURA_2026 > 0 ? Math.min(100, Math.max(0, (echipamentPrimit / COTA_NATURA_2026) * 100)) : 0;
  const reducereBani = (procentNatura / 100) * COTA_BANI_2026;
  const baniRamasi = COTA_BANI_2026 - reducereBani;

  const totalBani = baniRamasi + restanteBani - anticipatiiBani;
  const totalNatura = (COTA_NATURA_2026 - echipamentPrimit) + restanteNatura - anticipatiiNatura;
  const baniLunar = totalBani / 12;

  const lines = [];

  if (tipAlocare === 'numai_echipament') {
    lines.push(
      { label: 'Cotă anuală natură', value: COTA_NATURA_2026 },
      { label: 'Echipament primit', value: echipamentPrimit, negative: true },
      { label: 'Restanțe natură', value: restanteNatura },
      { label: 'Anticipații natură', value: anticipatiiNatura, negative: true },
      { label: 'Drept natură rămas', value: totalNatura, bold: true, highlight: true, separator: true },
    );
  } else if (tipAlocare === 'numai_bani') {
    lines.push(
      { label: 'Cotă anuală bani', value: COTA_BANI_2026 },
      { label: 'Restanțe bani', value: restanteBani },
      { label: 'Anticipații bani', value: anticipatiiBani, negative: true },
      { label: 'Total drepturi bani', value: COTA_BANI_2026 + restanteBani - anticipatiiBani, bold: true, highlight: true, separator: true },
      { label: '→ Sumă lunară (1/12)', value: (COTA_BANI_2026 + restanteBani - anticipatiiBani) / 12, bold: true, highlight: true },
    );
  } else {
    lines.push(
      { label: 'Echipament primit (natură)', value: echipamentPrimit },
      { label: 'Reducere proporțională bani (' + procentNatura.toFixed(1) + '%)', value: reducereBani, negative: true },
      { label: 'Drept bani rămas', value: baniRamasi },
      { label: 'Total bani (cu ajustări)', value: totalBani, bold: true, highlight: true, separator: true },
      { label: '→ Sumă lunară (1/12)', value: baniLunar, bold: true, highlight: true },
      { label: 'Drept natură rămas', value: totalNatura, bold: true, highlight: true, separator: true },
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2 text-xs text-muted-foreground bg-accent/10 rounded-lg p-3">
        <span>📋</span>
        <span>
          Verifică corectitudinea alocării la drepturi pentru polițistul în activitate.
          Condiție: uniformă completă și regulamentară (Art. 13 alin. 3 lit. c).
        </span>
      </div>

      <CorpGradSelect corp={corp} setCorp={setCorp} grad={grad} setGrad={setGrad} />

      {/* Tip alocare */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Tip alocare la drepturi (Art. 11)</label>
        <div className="space-y-2">
          {TIPURI_ALOCARE.map(t => (
            <label
              key={t.value}
              className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                tipAlocare === t.value ? 'border-primary bg-primary/5' : 'border-input hover:border-primary/40'
              }`}
            >
              <input
                type="radio"
                name="tipAlocare"
                value={t.value}
                checked={tipAlocare === t.value}
                onChange={() => setTipAlocare(t.value)}
                className="mt-0.5"
              />
              <div>
                <span className="text-sm font-medium text-foreground">{t.label}</span>
                <p className="text-[11px] text-muted-foreground">{t.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Echipament primit – shown for mixed and numai_echipament */}
      {tipAlocare !== 'numai_bani' && (
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Echipament primit în natură (lei)
          </label>
          <input
            type="number"
            min={0}
            max={COTA_NATURA_2026}
            value={echipamentPrimit || ''}
            onChange={e => setEchipamentPrimit(Math.max(0, Number(e.target.value)))}
            placeholder="0.00"
            className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      )}

      <RestanteAnticipații
        restanteBani={restanteBani} setRestanteBani={setRestanteBani}
        restanteNatura={restanteNatura} setRestanteNatura={setRestanteNatura}
        anticipatiiBani={anticipatiiBani} setAntipatiiBani={setAntipatiiBani}
        anticipatiiNatura={anticipatiiNatura} setAntipatiiNatura={setAntipatiiNatura}
      />

      <ResultDisplay
        title="Rezultat – Verificare alocare"
        lines={lines}
        progressLabel={tipAlocare === 'echipament_si_bani' ? 'Procent utilizat din cota natură' : undefined}
        progressValue={tipAlocare === 'echipament_si_bani' ? procentNatura : undefined}
        notes={[
          `Cota anuală 2026: <strong>${formatLei(COTA_BANI_2026)}</strong> (bani) / <strong>${formatLei(COTA_NATURA_2026)}</strong> (natură).`,
          'Drepturile în bani se acordă lunar, 1/12 din valoare (Art. 14).',
          'Drepturile sunt complementare și direct proporționale (Art. 8).',
        ]}
      />
    </div>
  );
}
