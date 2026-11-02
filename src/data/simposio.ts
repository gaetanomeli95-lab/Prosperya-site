/**
 * Configurazione centrale del Simposio Prosperya.
 *
 * Tutti i dettagli dell’evento vivono qui: pagina, email, area riservata e
 * metadati SEO leggono da questo file. Per aggiornare l’evento modificare
 * soltanto i campi sotto. I campi a `null` non sono ancora confermati e non
 * vengono mostrati da nessuna parte finché restano vuoti.
 */

export type RegistrationMode = 'open' | 'closed';

export interface SimposioEvent {
  /** Identificativo stabile: chiave dell’archivio iscrizioni. Non cambiarlo a iscrizioni aperte. */
  id: string;
  name: string;
  /** Data locale dell’evento (YYYY-MM-DD), interpretata in `timeZone`. */
  date: string;
  timeZone: 'Europe/Rome';
  /** Orari locali HH:MM. `null` finché non confermati: nessun orario o calendario viene generato. */
  startTime: string | null;
  endTime: string | null;
  venue: {
    name: string;
    locality: string;
    province: string;
    /** Indirizzo completo, da inserire solo quando confermato. */
    address: string | null;
  };
  /** Programma e relatori: compilare quando confermati. Le sezioni compaiono automaticamente. */
  agenda: { time: string | null; title: string; description?: string }[];
  speakers: { name: string; role: string }[];
  /**
   * Stato delle iscrizioni. `open` le accetta fino al giorno dell’evento incluso
   * (poi si chiudono automaticamente); `closed` le chiude subito.
   * Può essere forzato con la variabile d’ambiente SIMPOSIO_REGISTRATIONS=open|closed.
   */
  registrations: RegistrationMode;
  /** Se true, le iscrizioni restano aperte anche dopo la data dell’evento (scelta esplicita). */
  allowRegistrationsAfterEvent: boolean;
}

export const simposio: SimposioEvent = {
  id: 'simposio-2027-01-27',
  name: 'Simposio Prosperya',
  date: '2027-01-27',
  timeZone: 'Europe/Rome',
  startTime: null,
  endTime: null,
  venue: {
    name: 'Saracen Hotel',
    locality: 'Isola delle Femmine',
    province: 'Palermo',
    address: null,
  },
  agenda: [],
  speakers: [],
  registrations: 'open',
  allowRegistrationsAfterEvent: false,
};

export const simposioPath = '/simposio/';

export const simposioSituations = [
  { value: 'avviare', label: 'Vorrei avviare un’attività' },
  { value: 'idea', label: 'Ho già un’idea e voglio capire come svilupparla' },
  { value: 'impresa', label: 'Ho già un’impresa' },
  { value: 'esplorando', label: 'Sto esplorando le possibilità' },
] as const;

export type SimposioSituation = (typeof simposioSituations)[number]['value'];

export const registrationStatuses = [
  { value: 'iscritto', label: 'Iscritto' },
  { value: 'riconfermato', label: 'Presenza riconfermata' },
  { value: 'presente', label: 'Presente all’evento' },
  { value: 'annullato', label: 'Annullato' },
] as const;

export type RegistrationStatus = (typeof registrationStatuses)[number]['value'];
