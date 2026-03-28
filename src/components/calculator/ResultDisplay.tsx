import { Info } from 'lucide-react';
import { formatLei } from './constants';

interface ResultLine {
  label: string;
  value: number;
  highlight?: boolean;
  negative?: boolean;
  bold?: boolean;
  separator?: boolean;
}

interface Props {
  title: string;
  lines: ResultLine[];
  notes?: string[];
  progressLabel?: string;
  progressValue?: number;
}

export function ResultDisplay({ title, lines, notes, progressLabel, progressValue }: Props) {
  return (
    <div className="border-t border-border pt-4 space-y-3">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h4>

      {progressLabel && progressValue !== undefined && (
        <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{progressLabel}</span>
            <span className="font-medium text-foreground">{progressValue.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full gold-shimmer transition-all duration-500"
              style={{ width: `${Math.min(100, progressValue)}%` }}
            />
          </div>
        </div>
      )}

      <div className="bg-primary/5 rounded-xl p-4 space-y-2">
        {lines.map((line, i) => (
          <div key={i}>
            {line.separator && <div className="border-t border-border/50 pt-2 mt-2" />}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{line.label}</span>
              <span className={`${line.bold ? 'font-bold' : 'font-medium'} ${
                line.negative ? 'text-destructive' : 
                line.highlight ? (line.value >= 0 ? 'text-foreground' : 'text-destructive') :
                'text-foreground'
              }`}>
                {line.negative ? '- ' : ''}{formatLei(Math.abs(line.value))}
              </span>
            </div>
          </div>
        ))}
      </div>

      {notes && notes.length > 0 && (
        <div className="flex gap-2 text-xs text-muted-foreground bg-secondary/30 rounded-lg p-3">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="space-y-1">
            {notes.map((note, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: note }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
