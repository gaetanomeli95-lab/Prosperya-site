'use client';

const CONSENT_KEY = 'prosperya-cookie-consent-v1';

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Evento GA4 solo con consenso ai cookie statistici. Gli eventi vengono accodati
 * nel dataLayer e inviati quando gtag è caricato. Mai dati personali nei parametri.
 */
export function trackEvent(name: string, params: Params = {}) {
  try {
    if (window.localStorage.getItem(CONSENT_KEY) !== 'all') return;
    window.dataLayer = window.dataLayer || [];
    // gtag accoda oggetti `arguments`: si replica lo stesso formato.
    function gtag() {
      window.dataLayer!.push(arguments);
    }
    (gtag as (...args: unknown[]) => void)('event', name, params);
  } catch {
    // Analytics non deve mai interferire con il modulo.
  }
}
