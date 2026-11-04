import { simposio, type SimposioEvent } from '@/data/simposio';

/** Data odierna (YYYY-MM-DD) nel fuso dell’evento, indipendente dal fuso del server. */
export function todayInTimeZone(timeZone: string, now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

/**
 * Una data locale YYYY-MM-DD come istante a mezzogiorno UTC: formattarla in
 * Europe/Rome restituisce sempre lo stesso giorno di calendario.
 */
function calendarDate(date: string): Date {
  return new Date(`${date}T12:00:00Z`);
}

export function formatEventDate(event: SimposioEvent = simposio): string {
  return new Intl.DateTimeFormat('it-IT', {
    timeZone: event.timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(calendarDate(event.date));
}

/** "27 gennaio 2027" */
export function formatEventDateShort(event: SimposioEvent = simposio): string {
  return new Intl.DateTimeFormat('it-IT', {
    timeZone: event.timeZone,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(calendarDate(event.date));
}

/** Orario solo se confermato in configurazione, altrimenti null. */
export function formatEventTime(event: SimposioEvent = simposio): string | null {
  if (!event.startTime) return null;
  return event.endTime ? `dalle ${event.startTime} alle ${event.endTime}` : `dalle ${event.startTime}`;
}

export function formatVenue(event: SimposioEvent = simposio): string {
  const address = event.venue.address ? `${event.venue.address}, ` : '';
  return `${event.venue.name}, ${address}${event.venue.locality} (${event.venue.province})`;
}

export function venueMapsHref(event: SimposioEvent = simposio): string {
  const query = [event.venue.name, event.venue.address, event.venue.locality].filter(Boolean).join(' ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Ultimo giorno (YYYY-MM-DD) in cui i dati delle iscrizioni sono conservati per intero. */
export function retentionEndDate(event: SimposioEvent = simposio): string {
  const end = calendarDate(event.date);
  end.setUTCDate(end.getUTCDate() + event.retentionDaysAfterEvent);
  return end.toISOString().slice(0, 10);
}

export function isRetentionExpired(event: SimposioEvent = simposio, now: Date = new Date()): boolean {
  return todayInTimeZone(event.timeZone, now) > retentionEndDate(event);
}

export type RegistrationState = 'open' | 'closed' | 'ended';

export function registrationState(event: SimposioEvent = simposio, now: Date = new Date()): RegistrationState {
  const override = process.env.SIMPOSIO_REGISTRATIONS;
  const mode = override === 'open' || override === 'closed' ? override : event.registrations;
  if (mode === 'closed') return 'closed';
  if (!event.allowRegistrationsAfterEvent && todayInTimeZone(event.timeZone, now) > event.date) return 'ended';
  return 'open';
}
