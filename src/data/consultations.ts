export const consultationConfig = {
  price: 50,
  vatLabel: 'IVA inclusa',
  availableDays: 'Martedì e mercoledì',
  availableHours: '15:30–18:00',
  creditNote: 'In caso di conferimento dell’incarico, i €50 saranno scalati dal compenso complessivo della consulenza.',
};

export const paidConsultationSlugs = ['startup', 'finanza-agevolata'] as const;

export function isPaidConsultationSlug(slug: string) {
  return paidConsultationSlugs.some((paidSlug) => paidSlug === slug);
}
