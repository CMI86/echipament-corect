export const COTA_BANI_2026 = 7455;
export const COTA_NATURA_2026 = 8909;

export const GRADE_OFITERI = [
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

export const GRADE_AGENTI = [
  'Agent-șef principal de poliție',
  'Agent-șef de poliție',
  'Agent-șef adjunct de poliție',
  'Agent principal de poliție',
  'Agent de poliție',
];

export const LUNI = [
  'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
  'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
];

export const TIPURI_ALOCARE = [
  { value: 'numai_echipament', label: 'Numai echipament', desc: 'Art. 11 pct. 3 – Primește echipament integral din cotă' },
  { value: 'echipament_si_bani', label: 'Echipament + diferență în bani', desc: 'Art. 11 pct. 4 – Completare uniformă și diferența valorică în bani' },
  { value: 'numai_bani', label: 'Numai bani', desc: 'Art. 11 pct. 5 – Cu condiția deținerii uniformei complete' },
] as const;

export type TipAlocare = typeof TIPURI_ALOCARE[number]['value'];
export type Corp = 'ofiteri' | 'agenti';

export function formatLei(val: number) {
  return val.toLocaleString('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' lei';
}

export function getGrade(corp: Corp) {
  return corp === 'ofiteri' ? GRADE_OFITERI : GRADE_AGENTI;
}
