import { registrationStatuses, simposio, simposioSituations } from '@/data/simposio';
import { currentStaff } from '@/lib/staff/auth';
import { listRegistrations } from '@/lib/simposio/repository';
import { todayInTimeZone } from '@/lib/simposio/schedule';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'no-store, private', 'X-Robots-Tag': 'noindex' };

/** Cella CSV sicura: virgolette raddoppiate e neutralizzazione delle formule per Excel/Sheets. */
function cell(value: string | number | boolean | null | undefined): string {
  let text = value === null || value === undefined ? '' : String(value);
  // I numeri di telefono normalizzati (+39…) sono solo cifre: restano leggibili.
  if (/^[=+\-@\t\r]/.test(text) && !/^\+\d{6,15}$/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

const dateTime = new Intl.DateTimeFormat('it-IT', { timeZone: 'Europe/Rome', dateStyle: 'short', timeStyle: 'short' });

export async function GET() {
  const staff = await currentStaff();
  if (!staff) return new Response('Accesso non autorizzato', { status: 401, headers: noStore });

  let rows;
  try {
    rows = await listRegistrations(simposio.id);
  } catch {
    return new Response('Archivio non raggiungibile', { status: 503, headers: noStore });
  }

  const header = ['Data iscrizione', 'Nome e cognome', 'Email', 'Cellulare', 'Comune', 'Situazione', 'Messaggio', 'Stato', 'Email di conferma', 'Info futuri eventi', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'Tentativi ripetuti'];
  const lines = rows.map((r) => [
    dateTime.format(r.created_at),
    r.full_name,
    r.email,
    r.phone,
    r.comune,
    simposioSituations.find((s) => s.value === r.situation)?.label ?? '',
    r.message,
    registrationStatuses.find((s) => s.value === r.status)?.label ?? r.status,
    r.confirmation_email_status,
    r.marketing_consent ? 'sì' : 'no',
    r.utm_source,
    r.utm_medium,
    r.utm_campaign,
    r.utm_content,
    r.duplicate_attempts,
  ].map(cell).join(';'));

  // BOM + separatore “;” per l’apertura corretta in Excel con impostazioni italiane.
  const body = `﻿${[header.map(cell).join(';'), ...lines].join('\r\n')}\r\n`;
  const filename = `${simposio.id}-iscritti-${todayInTimeZone(simposio.timeZone)}.csv`;

  return new Response(body, {
    status: 200,
    headers: { ...noStore, 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${filename}"` },
  });
}
