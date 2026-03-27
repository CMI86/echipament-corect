import { ChatWidget } from '@/components/ChatWidget';
import { EquipmentCalculator } from '@/components/EquipmentCalculator';
import { Shield, BookOpen, Scale } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="chat-gradient py-6 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/15 mb-4">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl text-primary-foreground mb-2">
            Asistent Drepturi de Echipament
          </h1>
          <p className="text-sm text-primary-foreground/70 max-w-lg mx-auto">
            Verifică alocarea la drepturi și plata echipamentului conform Ordinului MAI nr. 183/2021
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-primary-foreground/50">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Regulament actualizat 2026
            </span>
            <span className="flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" />
              Consolidare 25.03.2026
            </span>
          </div>
        </div>
      </header>

      {/* Tab Switcher */}
      <div className="max-w-3xl mx-auto px-4 -mt-2 mb-3 flex gap-2">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'chat'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
          }`}
        >
          💬 Asistent Chat
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'calculator'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
          }`}
        >
          🧮 Calculator Valoric
        </button>
      </div>

      {/* Content Area */}
      <main className="max-w-3xl mx-auto px-4 pb-8">
        {activeTab === 'chat' ? <ChatWidget /> : <EquipmentCalculator />}
      </main>

      {/* Disclaimer */}
      <footer className="text-center pb-6 px-4">
        <p className="text-xs text-muted-foreground max-w-lg mx-auto">
          ⚠️ Acest instrument oferă informații orientative bazate pe regulamentul în vigoare. 
          Pentru decizii oficiale, consultați structura logistică a unității dvs.
        </p>
      </footer>
    </div>
  );
};

export default Index;
