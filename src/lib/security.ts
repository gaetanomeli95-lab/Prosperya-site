import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

export function serverSecret(): string | null {
  const secret = process.env.AREA_RISERVATA_SECRET;
  if (secret && secret.length >= 32) return secret;
  // In mancanza di un segreto dedicato, lo ricava dalla stringa di connessione al database
  // (contiene la password, è solo lato server). Se la password viene ruotata, le sessioni vengono chiuse.
  const dbUrl = process.env.SIMPOSIO_DATABASE_URL || process.env.DATABASE_URL;
  if (dbUrl && dbUrl.length >= 32) {
    return createHmac('sha256', 'prosperya-area-riservata-v1').update(dbUrl).digest('base64url');
  }
  return null;
}

export function hmac(label: string, value: string): string {
  // Senza segreto configurato l’impronta resta comunque non in chiaro, ma meno robusta.
  const key = serverSecret() ?? 'prosperya-fallback-key';
  return createHmac('sha256', key).update(`${label}:${value}`).digest('base64url');
}

export function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/** IP del client come impronta anonima (mai salvato in chiaro). Su Vercel l’header è impostato dalla piattaforma. */
export function clientFingerprint(headers: Headers): string {
  const ip = headers.get('x-real-ip') || headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'sconosciuto';
  return hmac('ip', ip).slice(0, 32);
}
