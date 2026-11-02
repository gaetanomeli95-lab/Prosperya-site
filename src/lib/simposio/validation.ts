import { simposioSituations, type SimposioSituation } from '@/data/simposio';

/** Regole condivise da modulo (feedback immediato) e server (fonte di verità). */

export const limits = {
  fullName: 120,
  email: 254,
  phone: 25,
  comune: 80,
  message: 1000,
} as const;

export interface RegistrationInput {
  fullName: string;
  email: string;
  phone: string;
  comune: string;
  situation: SimposioSituation | '';
  message: string;
  marketingConsent: boolean;
}

export type FieldErrors = Partial<Record<keyof RegistrationInput, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneAllowed = /^[+\d][\d\s().-]*$/;

function text(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  // Spazi normalizzati e caratteri di controllo rimossi.
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/[ \t]+/g, ' ').trim().slice(0, max + 1);
}

export function normalizePhone(phone: string): string {
  const compact = phone.replace(/[\s().-]/g, '');
  if (compact.startsWith('00')) return `+${compact.slice(2)}`;
  if (compact.startsWith('+')) return compact;
  // Numeri italiani senza prefisso internazionale.
  return compact.startsWith('3') || compact.startsWith('0') ? `+39${compact}` : compact;
}

export function validateRegistration(raw: Record<string, unknown>): { data: RegistrationInput; errors: FieldErrors } {
  const fullName = text(raw.fullName, limits.fullName);
  const email = text(raw.email, limits.email).toLowerCase();
  const phone = text(raw.phone, limits.phone);
  const comune = text(raw.comune, limits.comune);
  const message = typeof raw.message === 'string'
    ? raw.message.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, limits.message + 1)
    : '';
  const situationValue = typeof raw.situation === 'string' ? raw.situation : '';
  const situation = simposioSituations.some((s) => s.value === situationValue) ? (situationValue as SimposioSituation) : '';

  const errors: FieldErrors = {};

  if (fullName.length < 3 || !/\p{L}{2,}/u.test(fullName)) errors.fullName = 'Inserisci nome e cognome.';
  else if (fullName.length > limits.fullName) errors.fullName = `Usa al massimo ${limits.fullName} caratteri.`;

  if (!email) errors.email = 'Inserisci il tuo indirizzo email.';
  else if (email.length > limits.email || !emailPattern.test(email)) errors.email = 'Controlla l’indirizzo email, ad esempio nome@esempio.it.';

  const digits = phone.replace(/\D/g, '');
  if (!phone) errors.phone = 'Inserisci il numero di cellulare.';
  else if (!phoneAllowed.test(phone) || digits.length < 8 || digits.length > 15) errors.phone = 'Controlla il numero, ad esempio 333 123 4567.';

  if (comune.length > limits.comune) errors.comune = `Usa al massimo ${limits.comune} caratteri.`;
  if (situationValue && !situation) errors.situation = 'Scegli una delle opzioni proposte.';
  if (message.length > limits.message) errors.message = `Usa al massimo ${limits.message} caratteri.`;

  return {
    data: {
      fullName,
      email,
      phone: errors.phone ? phone : normalizePhone(phone),
      comune,
      situation,
      message,
      marketingConsent: raw.marketingConsent === true,
    },
    errors,
  };
}

/** Parametri di provenienza ammessi: valori brevi e privi di dati personali. */
export const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
export type Attribution = Partial<Record<(typeof attributionKeys)[number], string>>;

export function sanitizeAttribution(raw: unknown): Attribution {
  if (!raw || typeof raw !== 'object') return {};
  const result: Attribution = {};
  for (const key of attributionKeys) {
    const value = (raw as Record<string, unknown>)[key];
    if (typeof value !== 'string') continue;
    const clean = value.trim().toLowerCase();
    // Solo slug brevi: esclude email, numeri di telefono e URL.
    if (/^[a-z0-9][a-z0-9._-]{0,47}$/.test(clean) && !/\d{6,}/.test(clean)) result[key] = clean;
  }
  return result;
}
