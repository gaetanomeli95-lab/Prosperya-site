import { NextResponse } from 'next/server';
import { company } from '@/data/company';
import { simposio } from '@/data/simposio';
import { clientFingerprint } from '@/lib/security';
import { isStorageConfigured } from '@/lib/simposio/db';
import { hitRateLimit } from '@/lib/simposio/repository';
import { registrationState } from '@/lib/simposio/schedule';
import { register } from '@/lib/simposio/service';
import { sanitizeAttribution, validateRegistration } from '@/lib/simposio/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 8 * 1024;
const contactHint = `Puoi scriverci a ${company.emailPubblica} o su WhatsApp al ${company.telefono}.`;

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return json({ code: 'bad_request', message: 'Richiesta non valida.' }, 415);

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return json({ code: 'bad_request', message: 'Richiesta troppo grande.' }, 413);

  let raw: Record<string, unknown>;
  try {
    const textBody = await request.text();
    if (textBody.length > MAX_BODY_BYTES) return json({ code: 'bad_request', message: 'Richiesta troppo grande.' }, 413);
    const parsed: unknown = JSON.parse(textBody);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid');
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ code: 'bad_request', message: 'Richiesta non valida.' }, 400);
  }

  // Campo trappola per i bot: compilato solo da programmi automatici. Nessun salvataggio.
  if (typeof raw.website === 'string' && raw.website.trim() !== '') {
    return json({ ok: true, emailDelivery: 'sent' }, 200);
  }

  const state = registrationState();
  if (state !== 'open') {
    return json({ code: 'closed', message: `Le iscrizioni al ${simposio.name} sono chiuse. ${contactHint}` }, 409);
  }

  const { data, errors } = validateRegistration(raw);
  if (Object.keys(errors).length > 0) {
    return json({ code: 'invalid', message: 'Controlla i campi evidenziati.', errors }, 422);
  }

  if (!isStorageConfigured()) {
    return json({ code: 'unavailable', message: `Le iscrizioni online non sono ancora attive. ${contactHint}` }, 503);
  }

  try {
    const fingerprint = clientFingerprint(request.headers);
    const [perTenMinutes, perDay] = await Promise.all([
      hitRateLimit(`iscrizione:${fingerprint}:10m`, 600),
      hitRateLimit(`iscrizione:${fingerprint}:1d`, 86400),
    ]);
    // Soglie larghe: reti mobili e Wi-Fi condivisi possono raggruppare molte persone sullo stesso IP.
    if (perTenMinutes > 20 || perDay > 120) {
      return json({ code: 'rate_limited', message: `Troppe richieste ravvicinate da questa connessione. Riprova tra qualche minuto. ${contactHint}` }, 429);
    }

    const result = await register(data, sanitizeAttribution(raw.attribution));
    return json({ ok: true, emailDelivery: result.emailDelivery }, 200);
  } catch {
    // Nessun dettaglio tecnico né dati personali nei log o nella risposta.
    console.error('[simposio] archivio non raggiungibile durante l’iscrizione');
    return json({ code: 'storage_error', message: `Non siamo riusciti a registrare l’iscrizione. I dati che hai inserito sono ancora nel modulo: riprova tra poco. ${contactHint}` }, 503);
  }
}
