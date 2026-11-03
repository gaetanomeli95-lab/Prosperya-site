import 'server-only';
import { sql } from './db';
import type { RegistrationStatus } from '@/data/simposio';
import type { Attribution, RegistrationInput } from './validation';

export type DeliveryStatus = 'pending' | 'sending' | 'sent' | 'failed' | 'skipped';

export interface RegistrationRow {
  id: string;
  event_id: string;
  created_at: Date;
  full_name: string;
  email: string;
  phone: string;
  comune: string | null;
  situation: string | null;
  message: string | null;
  marketing_consent: boolean;
  status: RegistrationStatus;
  status_updated_at: Date | null;
  status_updated_by: string | null;
  confirmation_email_status: DeliveryStatus;
  confirmation_email_detail: string | null;
  confirmation_email_attempts: number;
  confirmation_email_sent_at: Date | null;
  internal_notification_status: DeliveryStatus;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  duplicate_attempts: number;
}

export interface SaveResult {
  id: string;
  inserted: boolean;
  fullName: string;
  email: string;
  confirmationStatus: DeliveryStatus;
}

/**
 * Inserisce l’iscrizione in modo atomico. Se esiste già un’iscrizione con la stessa
 * email per lo stesso evento, NON modifica i dati: registra solo il tentativo ripetuto.
 * Il vincolo unico rende sicuri anche due invii contemporanei.
 */
export async function saveRegistration(
  eventId: string,
  input: RegistrationInput,
  attribution: Attribution,
  privacyNoticeVersion: string,
): Promise<SaveResult> {
  const rows = await sql()<{ id: string; inserted: boolean; full_name: string; email: string; confirmation_email_status: DeliveryStatus }[]>`
    insert into simposio_registrations (
      event_id, full_name, email, phone, comune, situation, message,
      marketing_consent, marketing_consent_at, privacy_notice_version,
      utm_source, utm_medium, utm_campaign, utm_content
    ) values (
      ${eventId}, ${input.fullName}, ${input.email}, ${input.phone},
      ${input.comune || null}, ${input.situation || null}, ${input.message || null},
      ${input.marketingConsent}, ${input.marketingConsent ? new Date() : null}, ${privacyNoticeVersion},
      ${attribution.utm_source ?? null}, ${attribution.utm_medium ?? null},
      ${attribution.utm_campaign ?? null}, ${attribution.utm_content ?? null}
    )
    on conflict (event_id, email) do update set
      duplicate_attempts = simposio_registrations.duplicate_attempts + 1,
      last_duplicate_at = now()
    returning id, (xmax = 0) as inserted, full_name, email, confirmation_email_status
  `;
  const row = rows[0];
  return {
    id: row.id,
    inserted: row.inserted,
    fullName: row.full_name,
    email: row.email,
    confirmationStatus: row.confirmation_email_status,
  };
}

/**
 * Prenota l’invio della conferma: solo una richiesta alla volta può ottenerla,
 * così doppi clic o reinvii non generano email duplicate.
 * Una prenotazione rimasta in sospeso oltre 5 minuti (funzione interrotta) è recuperabile.
 */
export async function claimConfirmationEmail(id: string, options: { includeSent?: boolean } = {}): Promise<boolean> {
  const allowed = options.includeSent ? ['pending', 'failed', 'skipped', 'sent'] : ['pending', 'failed', 'skipped'];
  const db = sql();
  const rows = await db`
    update simposio_registrations set
      confirmation_email_status = 'sending',
      confirmation_email_claimed_at = now(),
      confirmation_email_attempts = confirmation_email_attempts + 1
    where id = ${id}
      and (
        confirmation_email_status in ${db(allowed)}
        or (confirmation_email_status = 'sending' and confirmation_email_claimed_at < now() - interval '5 minutes')
      )
    returning id
  `;
  return rows.length > 0;
}

export async function recordConfirmationEmail(id: string, status: Exclude<DeliveryStatus, 'pending' | 'sending'>, detail: string | null) {
  await sql()`
    update simposio_registrations set
      confirmation_email_status = ${status},
      confirmation_email_detail = ${detail},
      confirmation_email_sent_at = ${status === 'sent' ? new Date() : null}
    where id = ${id}
  `;
}

export async function recordInternalNotification(id: string, status: Exclude<DeliveryStatus, 'pending' | 'sending'>, detail: string | null) {
  await sql()`
    update simposio_registrations set
      internal_notification_status = ${status},
      internal_notification_detail = ${detail}
    where id = ${id}
  `;
}

/** Al massimo un avviso “sei già iscritto” ogni 6 ore per iscrizione. */
export async function claimDuplicateNotice(id: string): Promise<boolean> {
  const rows = await sql()`
    update simposio_registrations set duplicate_notice_at = now()
    where id = ${id}
      and (duplicate_notice_at is null or duplicate_notice_at < now() - interval '6 hours')
    returning id
  `;
  return rows.length > 0;
}

export async function listRegistrations(eventId: string): Promise<RegistrationRow[]> {
  return sql()<RegistrationRow[]>`
    select id, event_id, created_at, full_name, email, phone, comune, situation, message,
      marketing_consent, status, status_updated_at, status_updated_by,
      confirmation_email_status, confirmation_email_detail, confirmation_email_attempts,
      confirmation_email_sent_at, internal_notification_status,
      utm_source, utm_medium, utm_campaign, utm_content, duplicate_attempts
    from simposio_registrations
    where event_id = ${eventId}
    order by created_at desc
  `;
}

export async function getRegistration(eventId: string, id: string): Promise<RegistrationRow | null> {
  const rows = await sql()<RegistrationRow[]>`
    select * from simposio_registrations where event_id = ${eventId} and id = ${id}
  `;
  return rows[0] ?? null;
}

export async function updateStatus(eventId: string, id: string, status: RegistrationStatus, staff: string): Promise<boolean> {
  const rows = await sql()`
    update simposio_registrations set
      status = ${status}, status_updated_at = now(), status_updated_by = ${staff}
    where event_id = ${eventId} and id = ${id}
    returning id
  `;
  return rows.length > 0;
}

/**
 * Contatore a finestra fissa. Restituisce il numero di richieste nella finestra corrente,
 * incluse quella attuale. Le finestre scadute vengono ripulite occasionalmente.
 */
export async function hitRateLimit(bucket: string, windowSeconds: number): Promise<number> {
  const db = sql();
  const rows = await db<{ hits: number }[]>`
    insert into simposio_rate_limits (bucket, window_start, hits)
    values (${bucket}, to_timestamp(floor(extract(epoch from now()) / ${windowSeconds}) * ${windowSeconds}), 1)
    on conflict (bucket, window_start) do update set hits = simposio_rate_limits.hits + 1
    returning hits
  `;
  if (Math.random() < 0.02) {
    await db`delete from simposio_rate_limits where window_start < now() - interval '2 days'`;
  }
  return rows[0].hits;
}

/**
 * Applica il periodo di conservazione: cancella le iscrizioni senza consenso facoltativo e,
 * per chi l’ha dato, conserva solo nome, email e consenso. Idempotente.
 */
export async function purgeRegistrationData(eventId: string): Promise<{ deleted: number; minimized: number }> {
  const db = sql();
  const deleted = await db`delete from simposio_registrations where event_id = ${eventId} and marketing_consent = false`;
  const minimized = await db`
    update simposio_registrations
    set phone = '', comune = null, situation = null, message = null,
        utm_source = null, utm_medium = null, utm_campaign = null, utm_content = null,
        confirmation_email_detail = null, internal_notification_detail = null
    where event_id = ${eventId} and phone <> ''
  `;
  return { deleted: deleted.count, minimized: minimized.count };
}
