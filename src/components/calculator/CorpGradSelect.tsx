import { Corp, getGrade } from './constants';

interface Props {
  corp: Corp;
  setCorp: (c: Corp) => void;
  grad: string;
  setGrad: (g: string) => void;
}

export function CorpGradSelect({ corp, setCorp, grad, setGrad }: Props) {
  const grade = getGrade(corp);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Corp</label>
        <select
          value={corp}
          onChange={e => { setCorp(e.target.value as Corp); setGrad(''); }}
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
  );
}
