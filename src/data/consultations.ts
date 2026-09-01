export const consultationConfig = {
  price: 50,
  vatLabel: 'IVA inclusa',
  durationMinutes: 60,
  durationLabel: 'Minimo 1 ora',
  availableDays: 'Martedì e mercoledì pomeriggio',
  availableHours: '15:30 · 16:30 · 17:30 · 18:30',
  weeklyCapacity: '4 consulenze per sessione · 8 consulenze a settimana',
  creditNote: 'In caso di conferimento dell’incarico, i €50 saranno scalati dal compenso complessivo della consulenza.',
};

export const paidConsultationSlugs = ['finanza-agevolata'] as const;

export function isPaidConsultationSlug(slug: string) {
  return paidConsultationSlugs.some((paidSlug) => paidSlug === slug);
}
