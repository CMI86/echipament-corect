import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  showInput: boolean;
}

export function ChatInput({ onSend, showInput }: ChatInputProps) {
  const [value, setValue] = useState('');

  if (!showInput) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-border bg-card shrink-0">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Scrie întrebarea ta aici..."
          className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="w-10 h-10 rounded-xl chat-gradient flex items-center justify-center text-accent disabled:opacity-40 transition-opacity hover:opacity-90"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Bazat pe Ordinul 183/2021, consolidat la 25.03.2026
      </p>
    </form>
  );
}
