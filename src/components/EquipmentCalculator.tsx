import { useState } from 'react';
import { Calculator, ClipboardCheck, ArrowRightLeft, UserPlus, GraduationCap } from 'lucide-react';
import { VerificareAlocare } from './calculator/VerificareAlocare';
import { MutareUnitate } from './calculator/MutareUnitate';
import { PrimaIncadrare } from './calculator/PrimaIncadrare';
import { PrintExport } from './calculator/PrintExport';
import { COTA_BANI_2026, COTA_NATURA_2026, formatLei } from './calculator/constants';

type Operatiune = 'verificare' | 'incadrare' | 'mutare' | 'prima_incadrare';

const OPERATIUNI = [
  {
    value: 'verificare' as Operatiune,
    label: 'Verificare alocare',
    shortLabel: 'Verificare',
    icon: ClipboardCheck,
    desc: 'Polițist în activitate',
  },
  {
    value: 'incadrare' as Operatiune,
    label: 'Încadrare altă unitate',
    shortLabel: 'Încadrare',
    icon: ArrowRightLeft,
    desc: 'De la altă structură',
  },
  {
    value: 'mutare' as Operatiune,
    label: 'Mutare la altă unitate',
    shortLabel: 'Mutare',
    icon: ArrowRightLeft,
    desc: 'Între unități de poliție',
  },
  {
    value: 'prima_incadrare' as Operatiune,
    label: 'Prima încadrare',
    shortLabel: 'Prima încadrare',
    icon: GraduationCap,
    desc: 'Absolvent / sursă externă',
  },
];

const TITLU_MAP: Record<Operatiune, string> = {
  verificare: 'Verificare alocare la drepturi',
  incadrare: 'Încadrare la altă unitate (Art. 23)',
  mutare: 'Mutare la altă unitate (Art. 22, 32)',
  prima_incadrare: 'Prima încadrare (Art. 24-25)',
};

export function EquipmentCalculator() {
  const [operatiune, setOperatiune] = useState<Operatiune>('verificare');

  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
      {/* Header */}
      <div className="chat-gradient px-5 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-primary-foreground">Calculator Drepturi Echipament 2026</h3>
          <p className="text-xs text-primary-foreground/60">
            Cota anuală: {formatLei(COTA_BANI_2026)} (bani) / {formatLei(COTA_NATURA_2026)} (natură)
          </p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Operation selector */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Selectează operațiunea</label>
          <div className="grid grid-cols-2 gap-2">
            {OPERATIUNI.map(op => {
              const Icon = op.icon;
              return (
                <button
                  key={op.value}
                  onClick={() => setOperatiune(op.value)}
                  className={`flex items-start gap-2 rounded-xl border p-3 text-left transition-all ${
                    operatiune === op.value
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-input hover:border-primary/40 hover:bg-secondary/30'
                  }`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${
                    operatiune === op.value ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <div>
                    <span className={`text-xs font-medium ${
                      operatiune === op.value ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {op.shortLabel}
                    </span>
                    <p className="text-[10px] text-muted-foreground/70">{op.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculator content */}
        <div id="calculator-result">
          {operatiune === 'verificare' && <VerificareAlocare />}
          {operatiune === 'incadrare' && <MutareUnitate isMutare={false} />}
          {operatiune === 'mutare' && <MutareUnitate isMutare={true} />}
          {operatiune === 'prima_incadrare' && <PrimaIncadrare />}
        </div>

        {/* Print/Export */}
        <PrintExport targetId="calculator-result" titlu={TITLU_MAP[operatiune]} />
      </div>
    </div>
  );
}
