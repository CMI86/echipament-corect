import { Info } from 'lucide-react';

interface Props {
  restanteBani: number;
  setRestanteBani: (v: number) => void;
  restanteNatura: number;
  setRestanteNatura: (v: number) => void;
  anticipatiiBani: number;
  setAntipatiiBani: (v: number) => void;
  anticipatiiNatura: number;
  setAntipatiiNatura: (v: number) => void;
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] text-muted-foreground">{label}</label>
      <input
        type="number"
        min={0}
        value={value || ''}
        onChange={e => onChange(Math.max(0, Number(e.target.value)))}
        placeholder="0.00"
        className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

export function RestanteAnticipații(props: Props) {
  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Restanțe – drepturi neacordate din anii anteriori (Art. 28)</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <NumberInput label="Restanțe bani (lei)" value={props.restanteBani} onChange={props.setRestanteBani} />
          <NumberInput label="Restanțe natură (lei)" value={props.restanteNatura} onChange={props.setRestanteNatura} />
        </div>
        <p className="text-[10px] text-muted-foreground/60">
          Restanțe din ultimii 3 ani. După 31.12.2025, restanțele în natură se pot acorda și bănesc (Art. 28 alin. 3).
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Anticipații – drepturi primite în avans (Art. 29-30)</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <NumberInput label="Anticipații bani (lei)" value={props.anticipatiiBani} onChange={props.setAntipatiiBani} />
          <NumberInput label="Anticipații natură (lei)" value={props.anticipatiiNatura} onChange={props.setAntipatiiNatura} />
        </div>
        <p className="text-[10px] text-muted-foreground/60">
          Valoarea articolelor acordate peste cota anuală. Acordarea cu anticipație a contravalorii este strict interzisă (Art. 29 alin. 2).
        </p>
      </div>
    </>
  );
}
