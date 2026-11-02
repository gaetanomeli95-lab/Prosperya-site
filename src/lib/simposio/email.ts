import 'server-only';
import { Resend } from 'resend';
import { company, site } from '@/data/company';
import { simposio, simposioPath, simposioSituations } from '@/data/simposio';
import { formatEventDate, formatEventDateShort, formatEventTime, formatVenue, venueMapsHref } from './schedule';

export type SendOutcome =
  | { status: 'sent'; detail: string | null }
  | { status: 'failed'; detail: string }
  | { status: 'skipped'; detail: string };

interface EmailConfig {
  apiKey: string | null;
  from: string | null;
  replyTo: string;
  internalTo: string | null;
  testSender: boolean;
  allowTestSender: boolean;
}

export function emailConfig(): EmailConfig {
  const from = process.env.SIMPOSIO_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || null;
  return {
    apiKey: process.env.RESEND_API_KEY || null,
    from,
    replyTo: process.env.SIMPOSIO_REPLY_TO || company.emailPubblica,
    internalTo: process.env.SIMPOSIO_NOTIFICATION_EMAIL || process.env.CONTACT_EMAIL || null,
    // Il mittente di prova di Resend consegna solo al proprietario dell’account: non è produzione.
    testSender: !from || /@resend\.dev>?\s*$/i.test(from),
    allowTestSender: process.env.SIMPOSIO_ALLOW_TEST_SENDER === 'true',
  };
}

const SEND_TIMEOUT_MS = 8000;

async function send(message: { to: string; subject: string; html: string; text: string; replyTo?: string; tag: string }): Promise<SendOutcome> {
  const config = emailConfig();
  if (!config.apiKey || !config.from) return { status: 'skipped', detail: 'email_non_configurata' };

  const resend = new Resend(config.apiKey);
  try {
    const result = await Promise.race([
      resend.emails.send({
        from: config.from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        reply_to: message.replyTo,
        tags: [{ name: 'categoria', value: message.tag }],
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), SEND_TIMEOUT_MS)),
    ]);
    if (result.error) return { status: 'failed', detail: `provider:${result.error.name}`.slice(0, 120) };
    return { status: 'sent', detail: result.data?.id ?? null };
  } catch (error) {
    return { status: 'failed', detail: error instanceof Error && error.message === 'timeout' ? 'timeout' : 'errore_di_rete' };
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

function firstName(fullName: string): string {
  return fullName.split(' ')[0] || fullName;
}

const colors = { night: '#172326', paper: '#FBFAF7', ivory: '#F3F0E9', sand: '#C9B991', text: '#2A3031', muted: '#5F6869', teal: '#315F67' };

function layout(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="it">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${colors.ivory};font-family:Helvetica,Arial,sans-serif;color:${colors.text};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${colors.ivory};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${colors.paper};border:1px solid #DDD7CD;">
<tr><td style="background:${colors.night};padding:22px 24px;">
<img src="${site.url}/brand/prosperya-logo.png" width="44" height="44" alt="" style="display:inline-block;vertical-align:middle;border:0;">
<span style="display:inline-block;vertical-align:middle;margin-left:12px;color:#ffffff;font-size:14px;font-weight:bold;letter-spacing:3px;">PROSPERYA</span>
</td></tr>
<tr><td style="height:3px;background:${colors.sand};font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:28px 24px 8px;font-size:15px;line-height:1.6;">${bodyHtml}</td></tr>
<tr><td style="padding:20px 24px 26px;border-top:1px solid #E6E1D8;font-size:12px;line-height:1.6;color:${colors.muted};">
${escapeHtml(company.ragioneSociale)} · ${escapeHtml(company.sedeLegale)}, ${escapeHtml(company.cap)} ${escapeHtml(company.comune)}<br>
Assistenza: ${escapeHtml(company.telefono)} (anche WhatsApp) · <a href="mailto:${company.emailPubblica}" style="color:${colors.teal};">${escapeHtml(company.emailPubblica)}</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function detailsTable(rows: [string, string][]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0;border-top:1px solid #E6E1D8;">
${rows.map(([k, v]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #E6E1D8;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:${colors.muted};width:34%;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:10px 0;border-bottom:1px solid #E6E1D8;font-size:15px;vertical-align:top;">${v}</td></tr>`).join('\n')}
</table>`;
}

function eventRows(): { html: [string, string][]; text: string[] } {
  const time = formatEventTime();
  const timeText = time ?? 'in via di definizione: lo riceverai via email';
  return {
    html: [
      ['Evento', escapeHtml(simposio.name)],
      ['Data', escapeHtml(formatEventDate())],
      ['Orario', escapeHtml(timeText)],
      ['Luogo', `<a href="${venueMapsHref()}" style="color:${colors.teal};">${escapeHtml(formatVenue())}</a>`],
      ['Partecipazione', 'Gratuita'],
    ],
    text: [
      `Evento: ${simposio.name}`,
      `Data: ${formatEventDate()}`,
      `Orario: ${timeText}`,
      `Luogo: ${formatVenue()}`,
      'Partecipazione: gratuita',
    ],
  };
}

export function confirmationEmail(fullName: string) {
  const name = firstName(fullName);
  const rows = eventRows();
  const subject = `Iscrizione confermata · ${simposio.name}, ${formatEventDateShort()}`;
  const html = layout(subject, `
<p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:${colors.teal};font-weight:bold;">Iscrizione ricevuta</p>
<h1 style="margin:0 0 16px;font-family:Georgia,serif;font-weight:normal;font-size:26px;line-height:1.2;color:${colors.night};">Grazie ${escapeHtml(name)}, ti aspettiamo.</h1>
<p style="margin:0;">La tua iscrizione al ${escapeHtml(simposio.name)} è registrata. Ecco il riepilogo:</p>
${detailsTable(rows.html)}
<p style="margin:0 0 12px;"><strong>Cosa succede ora.</strong> Ti scriveremo per comunicarti orario e programma appena saranno definiti. Nei giorni precedenti all’evento potremmo contattarti per riconfermare la tua presenza.</p>
<p style="margin:0 0 12px;">Se non potrai partecipare, rispondi a questa email o scrivici: ci aiuti a organizzare al meglio l’accoglienza.</p>
<p style="margin:0 0 20px;font-size:13px;color:${colors.muted};">La partecipazione al simposio non comporta l’accesso a finanziamenti o agevolazioni: ogni misura ha requisiti propri, da verificare caso per caso.</p>
<p style="margin:0 0 8px;"><a href="${site.url}${simposioPath}" style="display:inline-block;background:${colors.night};color:#ffffff;text-decoration:none;padding:12px 18px;font-size:14px;font-weight:bold;">Rivedi la pagina del simposio</a></p>
`);
  const text = [
    `Grazie ${name}, ti aspettiamo.`,
    '',
    `La tua iscrizione al ${simposio.name} è registrata.`,
    '',
    ...rows.text,
    '',
    'Cosa succede ora: ti scriveremo per comunicarti orario e programma appena saranno definiti. Nei giorni precedenti all’evento potremmo contattarti per riconfermare la tua presenza.',
    '',
    'Se non potrai partecipare, rispondi a questa email o scrivici.',
    '',
    'La partecipazione al simposio non comporta l’accesso a finanziamenti o agevolazioni: ogni misura ha requisiti propri.',
    '',
    `Pagina del simposio: ${site.url}${simposioPath}`,
    '',
    '—',
    company.ragioneSociale,
    `Assistenza: ${company.telefono} (anche WhatsApp) · ${company.emailPubblica}`,
  ].join('\n');
  return { subject, html, text };
}

export function duplicateNoticeEmail(fullName: string) {
  const name = firstName(fullName);
  const rows = eventRows();
  const subject = `Iscrizione già registrata · ${simposio.name}`;
  const html = layout(subject, `
<h1 style="margin:0 0 16px;font-family:Georgia,serif;font-weight:normal;font-size:24px;line-height:1.2;color:${colors.night};">Ciao ${escapeHtml(name)}, la tua iscrizione è già registrata.</h1>
<p style="margin:0;">Abbiamo ricevuto una nuova richiesta di iscrizione con questo indirizzo email. Non serve fare altro: la tua iscrizione resta valida con i dati inseriti la prima volta.</p>
${detailsTable(rows.html)}
<p style="margin:0 0 20px;">Se vuoi modificare i tuoi dati o annullare l’iscrizione, rispondi a questa email.</p>
`);
  const text = [
    `Ciao ${name}, la tua iscrizione è già registrata.`,
    '',
    'Abbiamo ricevuto una nuova richiesta di iscrizione con questo indirizzo email. Non serve fare altro: la tua iscrizione resta valida con i dati inseriti la prima volta.',
    '',
    ...rows.text,
    '',
    'Se vuoi modificare i tuoi dati o annullare l’iscrizione, rispondi a questa email.',
    '',
    '—',
    company.ragioneSociale,
    `Assistenza: ${company.telefono} (anche WhatsApp) · ${company.emailPubblica}`,
  ].join('\n');
  return { subject, html, text };
}

/** Notifica interna: dati minimi, il dettaglio completo resta nell’area riservata. */
export function internalNotificationEmail(r: { fullName: string; comune: string; situation: string; source: string | null }) {
  const situation = simposioSituations.find((s) => s.value === r.situation)?.label ?? 'Non indicata';
  const adminUrl = `${site.url}/area-riservata/simposio/`;
  const subject = `Nuova iscrizione · ${simposio.name}`;
  const html = layout(subject, `
<h1 style="margin:0 0 16px;font-family:Georgia,serif;font-weight:normal;font-size:22px;color:${colors.night};">Nuova iscrizione al simposio</h1>
${detailsTable([
    ['Nome', escapeHtml(r.fullName)],
    ['Comune', escapeHtml(r.comune || '—')],
    ['Situazione', escapeHtml(situation)],
    ['Provenienza', escapeHtml(r.source || '—')],
  ])}
<p style="margin:0 0 20px;"><a href="${adminUrl}" style="color:${colors.teal};">Apri l’elenco iscritti nell’area riservata</a></p>
`);
  const text = [
    'Nuova iscrizione al simposio',
    `Nome: ${r.fullName}`,
    `Comune: ${r.comune || '—'}`,
    `Situazione: ${situation}`,
    `Provenienza: ${r.source || '—'}`,
    '',
    `Elenco iscritti: ${adminUrl}`,
  ].join('\n');
  return { subject, html, text };
}

export async function sendParticipantEmail(to: string, email: { subject: string; html: string; text: string }): Promise<SendOutcome> {
  const config = emailConfig();
  if (config.testSender && !config.allowTestSender) return { status: 'skipped', detail: 'mittente_di_prova' };
  return send({ ...email, to, replyTo: config.replyTo, tag: 'simposio-partecipante' });
}

export async function sendInternalEmail(email: { subject: string; html: string; text: string }): Promise<SendOutcome> {
  const config = emailConfig();
  if (!config.internalTo) return { status: 'skipped', detail: 'destinatario_interno_mancante' };
  return send({ ...email, to: config.internalTo, tag: 'simposio-interno' });
}
