import { useState, useRef, useEffect, useCallback } from 'react';
import { getFlowStep, type FlowOption } from '@/data/guidedFlow';
import { searchKnowledge, categories, type Category, getByCategory } from '@/data/knowledgeBase';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Shield } from 'lucide-react';

export interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: FlowOption[];
  categoryLinks?: Category[];
  timestamp: Date;
}

let msgIdCounter = 0;
const newId = () => `msg-${++msgIdCounter}`;

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<string>('start');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addBotMessage = useCallback((text: string, options?: FlowOption[], categoryLinks?: Category[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: newId(),
        type: 'bot',
        text,
        options,
        categoryLinks,
        timestamp: new Date(),
      }]);
    }, 600);
  }, []);

  useEffect(() => {
    const step = getFlowStep('start');
    if (step) {
      setMessages([{
        id: newId(),
        type: 'bot',
        text: step.question,
        options: step.options,
        timestamp: new Date(),
      }]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleOptionClick = (option: FlowOption) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: newId(),
      type: 'user',
      text: option.label,
      timestamp: new Date(),
    }]);

    if (option.result) {
      addBotMessage(option.result);
      // After showing result, offer to go back
      setTimeout(() => {
        addBotMessage('Dorești să verifici altceva?', [
          { label: '🔄 Înapoi la meniu', nextStep: 'start' },
          { label: '❓ Întrebare liberă', nextStep: 'free_search' },
        ]);
      }, 1200);
    } else if (option.nextStep) {
      setCurrentStep(option.nextStep);
      const step = getFlowStep(option.nextStep);
      if (step) {
        addBotMessage(step.question, step.options.length > 0 ? step.options : undefined);
      }
    }
  };

  const handleFreeSearch = (query: string) => {
    setMessages(prev => [...prev, {
      id: newId(),
      type: 'user',
      text: query,
      timestamp: new Date(),
    }]);

    const results = searchKnowledge(query);
    if (results.length > 0) {
      const responseText = results.map(r =>
        `**${r.question}** *(${r.article})*\n\n${r.answer}`
      ).join('\n\n---\n\n');
      addBotMessage(responseText);
    } else {
      addBotMessage('Nu am găsit un răspuns exact. Încearcă să reformulezi sau alege o categorie:',
        undefined,
        Object.keys(categories) as Category[]
      );
    }

    setTimeout(() => {
      addBotMessage('Dorești să verifici altceva?', [
        { label: '🔄 Înapoi la meniu', nextStep: 'start' },
        { label: '❓ Altă întrebare', nextStep: 'free_search' },
      ]);
    }, 1200);
  };

  const handleCategoryClick = (category: Category) => {
    const entries = getByCategory(category);
    setMessages(prev => [...prev, {
      id: newId(),
      type: 'user',
      text: categories[category],
      timestamp: new Date(),
    }]);

    if (entries.length > 0) {
      const responseText = entries.map(r =>
        `**${r.question}** *(${r.article})*\n\n${r.answer}`
      ).join('\n\n---\n\n');
      addBotMessage(responseText);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[85vh] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="chat-gradient px-6 py-4 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-primary-foreground">Asistent Echipament Poliție</h2>
          <p className="text-xs text-primary-foreground/70">Verifică drepturile conform Ordinului 183/2021</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs text-primary-foreground/70">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background/50">
        {messages.map(msg => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onOptionClick={handleOptionClick}
            onCategoryClick={handleCategoryClick}
          />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 animate-fade-in-up">
            <div className="w-8 h-8 rounded-full chat-gradient flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-accent" />
            </div>
            <div className="bg-chat-bot rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-muted-foreground/50 typing-dot" />
              <span className="w-2 h-2 rounded-full bg-muted-foreground/50 typing-dot" />
              <span className="w-2 h-2 rounded-full bg-muted-foreground/50 typing-dot" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleFreeSearch}
        showInput={currentStep === 'free_search' || messages.length > 2}
      />
    </div>
  );
}
