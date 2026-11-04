import { simposio } from '@/data/simposio';
import { isStorageConfigured } from '@/lib/simposio/db';
import { purgeRegistrationData } from '@/lib/simposio/repository';
import { isRetentionExpired } from '@/lib/simposio/schedule';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'no-store' };

/**
 * Applica il periodo di conservazione delle iscrizioni (vedi `retentionDaysAfterEvent`).
 * Chiamata ogni giorno dal cron di Vercel (vercel.json). Prima della scadenza non fa nulla,
 * quindi può essere invocata da chiunque senza effetti: non restituisce dati.
 */
export async function GET() {
  if (!isStorageConfigured() || !isRetentionExpired()) return Response.json({ ok: true, purged: false }, { headers: noStore });
  try {
    await purgeRegistrationData(simposio.id);
    return Response.json({ ok: true, purged: true }, { headers: noStore });
  } catch {
    console.error('[simposio] pulizia dati non riuscita');
    return Response.json({ ok: false }, { status: 503, headers: noStore });
  }
}
