import { useState } from 'react';
import { Calculator, Info } from 'lucide-react';

const COTA_BANI_2026 = 7455;
const COTA_NATURA_2026 = 8909;

const GRADE_OFITERI = [
  'Chestor general de poliție',
  'Chestor principal de poliție',
  'Chestor de poliție',
  'Comisar-șef de poliție',
  'Comisar de poliție',
  'Subcomisar de poliție',
  'Inspector principal de poliție',
  'Inspector de poliție',
  'Subinspector de poliție',
];

const GRADE_AGENTI = [
  'Agent-șef principal de poliție',
  'Agent-șef de poliție',
  'Agent-șef adjunct de poliție',
  'Agent principal de poliție',
  'Agent de poliție',
];

function formatLei(val: number) {
  return val.toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' lei';
}

export function EquipmentCalculator() {
  const [corp, setCorp] = useState<'ofiteri' | 'agenti'>('ofiteri');
  const [grad, setGrad] = useState('');
  const [echipamentPrimit, setEchipamentPrimit] = useState<number>(0);
  const [restanteBani, setRestanteBani] = useState<number>(0);
  const [restanteNatura, setRestanteNatura] = useState<number>(0);
  const [anticipatiiBani, setAntipatiiBani] = useState<number>(0);
  const [anticipatiiNatura, setAntipatiiNatura] = useState<number>(0);
  const [lunaSelectata, setLunaSelectata] = useState<number>(12);

  const grade = corp === 'ofiteri' ? GRADE_OFITERI : GRADE_AGENTI;

  const LUNI = [
    'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
    'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
  ];

  // Proportional calculation
  const procentNatura = Math.min(100, Math.max(0, (echipamentPrimit / COTA_NATURA_2026) * 100));
  const reducereBani = (procentNatura / 100) * COTA_BANI_2026;
  const baniRamasi = COTA_BANI_2026 - reducereBani;

  // With restanțe and anticipații
  const totalBani = baniRamasi + restanteBani - anticipatiiBani;
  const totalNatura = (COTA_NATURA_2026 - echipamentPrimit) + restanteNatura - anticipatiiNatura;
  const baniLunar = totalBani / 12;

  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
      {/* Header */}
      <div className="chat-gradient px-5 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-primary-foreground">Calculator Echivalent Valoric 2026</h3>
          <p className="text-xs text-primary-foreground/60">Cota-parte anuală: {formatLei(COTA_BANI_2026)} (bani) / {formatLei(COTA_NATURA_2026)} (natură)</p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Corp & Grad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Corp</label>
            <select
              value={corp}
              onChange={e => { setCorp(e.target.value as 'ofiteri' | 'agenti'); setGrad(''); }}
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="ofiteri">Corp ofițeri</option>
              <option value="agenti">Corp agenți</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Grad profesional</label>
            <select
              value={grad}
              onChange={e => setGrad(e.target.value)}
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">— Selectează gradul —</option>
              {grade.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Echipament primit în natură */}
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
          <p className="text-xs text-muted-foreground/70">
            Valoarea totală a articolelor de echipament primite în natură în anul curent
          </p>
        </div>

        {/* Restanțe */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Restanțe (drepturi neacordate din anii anteriori)</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] text-muted-foreground">Restanțe bani (lei)</label>
              <input
                type="number"
                min={0}
                value={restanteBani || ''}
                onChange={e => setRestanteBani(Math.max(0, Number(e.target.value)))}
                placeholder="0.00"
                className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-muted-foreground">Restanțe natură (lei)</label>
              <input
                type="number"
                min={0}
                value={restanteNatura || ''}
                onChange={e => setRestanteNatura(Math.max(0, Number(e.target.value)))}
                placeholder="0.00"
                className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Anticipații */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Anticipații (drepturi primite în avans)</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] text-muted-foreground">Anticipații bani (lei)</label>
              <input
                type="number"
                min={0}
                value={anticipatiiBani || ''}
                onChange={e => setAntipatiiBani(Math.max(0, Number(e.target.value)))}
                placeholder="0.00"
                className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-muted-foreground">Anticipații natură (lei)</label>
              <input
                type="number"
                min={0}
                value={anticipatiiNatura || ''}
                onChange={e => setAntipatiiNatura(Math.max(0, Number(e.target.value)))}
                placeholder="0.00"
                className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="border-t border-border pt-4 space-y-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rezultat calcul</h4>

          {/* Proportionality display */}
          <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Echipament primit (natură)</span>
              <span className="font-medium text-foreground">{formatLei(echipamentPrimit)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Procent utilizat din cota natură</span>
              <span className="font-medium text-foreground">{procentNatura.toFixed(1)}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full gold-shimmer transition-all duration-500"
                style={{ width: `${Math.min(100, procentNatura)}%` }}
              />
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Reducere proporțională bani</span>
              <span className="font-medium text-destructive">- {formatLei(reducereBani)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Drept bani rămas (fără ajustări)</span>
              <span className="font-medium text-foreground">{formatLei(baniRamasi)}</span>
            </div>
          </div>

          {/* Final totals */}
          <div className="bg-primary/5 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total drepturi bani (cu ajustări)</span>
              <span className={`font-bold ${totalBani >= 0 ? 'text-foreground' : 'text-destructive'}`}>
                {formatLei(totalBani)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">→ Suma lunară (1/12)</span>
              <span className={`font-bold ${baniLunar >= 0 ? 'text-foreground' : 'text-destructive'}`}>
                {formatLei(baniLunar)}
              </span>
            </div>
            <div className="border-t border-border/50 pt-2 mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Drept natură rămas (cu ajustări)</span>
              <span className={`font-bold ${totalNatura >= 0 ? 'text-foreground' : 'text-destructive'}`}>
                {formatLei(totalNatura)}
              </span>
            </div>
          </div>

          {/* Info note */}
          <div className="flex gap-2 text-xs text-muted-foreground bg-secondary/30 rounded-lg p-3">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Conform Art. 8, echivalentul valoric se recalculează anual. Valorile de mai sus sunt pentru anul 2026.
              Drepturile în bani și natură sunt <strong>complementare și direct proporționale</strong>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
