import { Shield } from 'lucide-react';
import type { Message } from './ChatWidget';
import type { FlowOption } from '@/data/guidedFlow';
import type { Category } from '@/data/knowledgeBase';
import { categories } from '@/data/knowledgeBase';

interface ChatMessageProps {
  message: Message;
  onOptionClick: (option: FlowOption) => void;
  onCategoryClick: (category: Category) => void;
}

// Simple markdown-like rendering
function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    if (line === '---') {
      elements.push(<hr key={i} className="my-3 border-border/50" />);
      return;
    }

    // Process inline formatting
    let processed = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    if (line.trim() === '') {
      elements.push(<br key={i} />);
    } else {
      elements.push(
        <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: processed }} />
      );
    }
  });

  return elements;
}

export function ChatMessage({ message, onOptionClick, onCategoryClick }: ChatMessageProps) {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex gap-2 animate-fade-in-up ${isBot ? '' : 'justify-end'}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full chat-gradient flex items-center justify-center shrink-0 mt-1">
          <Shield className="w-4 h-4 text-accent" />
        </div>
      )}

      <div className={`max-w-[85%] ${isBot ? '' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isBot
              ? 'bg-chat-bot text-chat-bot-foreground rounded-bl-md'
              : 'bg-chat-user text-chat-user-foreground rounded-br-md'
          }`}
        >
          {renderMarkdown(message.text)}
        </div>

        {/* Options */}
        {message.options && message.options.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => onOptionClick(option)}
                className="text-sm px-3 py-2 rounded-xl border border-chat-option-border text-chat-option-foreground bg-chat-option hover:bg-chat-option-hover hover:text-chat-option-hover-foreground transition-all duration-200 text-left shadow-sm hover:shadow-md"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Category links */}
        {message.categoryLinks && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.categoryLinks.map(cat => (
              <button
                key={cat}
                onClick={() => onCategoryClick(cat)}
                className="text-xs px-3 py-1.5 rounded-lg border border-chat-option-border text-chat-option-foreground bg-chat-option hover:bg-chat-option-hover hover:text-chat-option-hover-foreground transition-all duration-200"
              >
                {categories[cat]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
