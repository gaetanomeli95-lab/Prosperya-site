import 'server-only';
import { scrypt as scryptCallback, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';
import { cookies } from 'next/headers';
import { hmac, safeEqual, serverSecret } from '@/lib/security';

/**
 * Accesso del personale all’area riservata.
 *
 * Gli incaricati sono definiti nella variabile AREA_RISERVATA_UTENTI nel formato
 *   nome@prosperya.it=scrypt$<salt>$<hash>;altro@prosperya.it=scrypt$<salt>$<hash>
 * (hash generati con `npm run staff:hash`). Nessuna password è salvata in chiaro.
 * Rimuovere un utente dalla variabile revoca subito il suo accesso.
 */

const scrypt = promisify(scryptCallback) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

export const SESSION_COOKIE = 'prosperya_staff';
export const SESSION_PATH = '/area-riservata';
const SESSION_HOURS = 8;

export function staffUsers(): Map<string, string> {
  const users = new Map<string, string>();
  for (const entry of (process.env.AREA_RISERVATA_UTENTI ?? '').split(';')) {
    const index = entry.indexOf('=');
    if (index < 1) continue;
    const user = entry.slice(0, index).trim().toLowerCase();
    const hash = entry.slice(index + 1).trim();
    if (user && hash.startsWith('scrypt$')) users.set(user, hash);
  }
  return users;
}

export function isStaffAuthConfigured(): boolean {
  return Boolean(serverSecret()) && staffUsers().size > 0;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 32);
  return `scrypt$${salt.toString('base64url')}$${hash.toString('base64url')}`;
}

// Hash fittizio: anche per utenti inesistenti si esegue scrypt, così i tempi non rivelano chi esiste.
const dummyHash = 'scrypt$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

export async function verifyCredentials(user: string, password: string): Promise<boolean> {
  const stored = staffUsers().get(user.trim().toLowerCase());
  const [, saltText, hashText] = (stored ?? dummyHash).split('$');
  const expected = Buffer.from(hashText ?? '', 'base64url');
  const actual = await scrypt(password, Buffer.from(saltText ?? '', 'base64url'), 32);
  return Boolean(stored) && expected.length === actual.length && safeEqual(expected.toString('base64url'), actual.toString('base64url'));
}

function sign(payload: string): string {
  return hmac('staff-session', payload);
}

export function createSessionToken(user: string, now = Date.now()): string {
  const payload = Buffer.from(JSON.stringify({ u: user, exp: now + SESSION_HOURS * 3600_000 })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function readSessionToken(token: string | undefined, now = Date.now()): string | null {
  if (!token || !serverSecret()) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { u?: unknown; exp?: unknown };
    if (typeof data.u !== 'string' || typeof data.exp !== 'number' || data.exp < now) return null;
    return staffUsers().has(data.u) ? data.u : null;
  } catch {
    return null;
  }
}

export async function currentStaff(): Promise<string | null> {
  const store = await cookies();
  return readSessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function startSession(user: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(user.toLowerCase()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: SESSION_PATH,
    maxAge: SESSION_HOURS * 3600,
  });
}

export async function endSession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, '', { httpOnly: true, sameSite: 'strict', path: SESSION_PATH, maxAge: 0 });
}
