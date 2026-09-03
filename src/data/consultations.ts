export const consultationConfig = {
  price: 50,
  vatLabel: 'IVA inclusa',
  durationMinutes: 60,
  durationLabel: '1 ora',
  availableDays: 'Martedì pomeriggio',
  availableHours: '15:30 · 16:30 · 17:30',
  weeklyCapacity: '3 consulenze a settimana',
  bookingUrl: 'https://cal.com/prosperya-zawnam/60min',
  creditNote: 'In caso di conferimento dell’incarico, i €50 saranno scalati dal compenso complessivo della consulenza.',
};

export const startupConsultationConfig = {
  durationMinutes: 60,
  durationLabel: '1 ora',
  availableDays: 'Mercoledì pomeriggio',
  availableHours: '15:30 · 16:30 · 17:30',
  weeklyCapacity: '3 consulenze a settimana',
  bookingUrl: 'https://cal.com/prosperya-zawnam/consulenza-startup-gratuita',
};

export const paidConsultationSlugs = ['finanza-agevolata'] as const;

export function isPaidConsultationSlug(slug: string) {
  return paidConsultationSlugs.some((paidSlug) => paidSlug === slug);
}
