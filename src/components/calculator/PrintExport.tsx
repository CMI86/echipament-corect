import { Printer, Download } from 'lucide-react';

interface Props {
  targetId: string;
  titlu: string;
}

export function PrintExport({ targetId, titlu }: Props) {
  const handlePrint = () => {
    const content = document.getElementById(targetId);
    if (!content) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${titlu}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #1a1a2e; }
          h2 { color: #1a1a2e; border-bottom: 2px solid #c8a45a; padding-bottom: 8px; }
          .result-section { margin: 16px 0; padding: 12px; background: #f5f5f5; border-radius: 8px; }
          .line { display: flex; justify-content: space-between; padding: 4px 0; font-size: 14px; }
          .line.bold { font-weight: bold; }
          .note { font-size: 12px; color: #666; margin-top: 12px; padding: 8px; background: #fafafa; border-left: 3px solid #c8a45a; }
          .footer { margin-top: 24px; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 8px; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <h2>📋 ${titlu}</h2>
        <p style="font-size: 12px; color: #666;">Data generării: ${new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        ${content.innerHTML}
        <div class="footer">
          Generat de Asistentul Drepturi de Echipament • Ordinul MAI nr. 183/2021 • Cote 2026<br/>
          ⚠️ Document orientativ. Pentru decizii oficiale, consultați structura logistică.
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleExport = () => {
    const content = document.getElementById(targetId);
    if (!content) return;

    const text = extractTextContent(content);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calcul-echipament-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2 pt-2">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        <Printer className="w-4 h-4" />
        Printează
      </button>
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background text-foreground text-sm font-medium hover:bg-secondary transition-colors"
      >
        <Download className="w-4 h-4" />
        Exportă TXT
      </button>
    </div>
  );
}

function extractTextContent(el: HTMLElement): string {
  const header = `CALCULATOR DREPTURI ECHIPAMENT - ${new Date().toLocaleDateString('ro-RO')}\n${'='.repeat(50)}\n\n`;
  
  const lines: string[] = [];
  const elements = el.querySelectorAll('[class*="flex justify-between"], p, h4, span');
  
  elements.forEach(item => {
    const text = item.textContent?.trim();
    if (text && text.length > 2 && !lines.includes(text)) {
      lines.push(text);
    }
  });

  return header + lines.join('\n') + '\n\n---\n⚠️ Document orientativ. Ordinul MAI nr. 183/2021.';
}
