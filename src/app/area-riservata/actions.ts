'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { registrationStatuses, simposio, type RegistrationStatus } from '@/data/simposio';
import { clientFingerprint, hmac } from '@/lib/security';
import { currentStaff, endSession, isStaffAuthConfigured, staffUsers, startSession, verifyCredentials } from '@/lib/staff/auth';
import { isStorageConfigured } from '@/lib/simposio/db';
import { getRegistration, hitRateLimit, updateStatus } from '@/lib/simposio/repository';
import { deliverConfirmation } from '@/lib/simposio/service';

export interface LoginState {
  error?: string;
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isStaffAuthConfigured() || !isStorageConfigured()) {
    return { error: 'Area riservata non ancora configurata. Vedi docs/simposio.md.' };
  }
  const user = String(formData.get('user') ?? '').trim().toLowerCase().slice(0, 254);
  const password = String(formData.get('password') ?? '').slice(0, 256);

  try {
    const fingerprint = clientFingerprint(await headers());
    const [perIp, perUser] = await Promise.all([
      hitRateLimit(`login:ip:${fingerprint}`, 900),
      hitRateLimit(`login:user:${hmac('user', user).slice(0, 24)}`, 900),
    ]);
    if (perIp > 10 || perUser > 5) return { error: 'Troppi tentativi. Riprova tra 15 minuti.' };
  } catch {
    return { error: 'Servizio temporaneamente non disponibile. Riprova tra poco.' };
  }

  if (!user || !password || !(await verifyCredentials(user, password))) {
    // Diagnostica senza dati personali: utente presente nell’elenco, numero di utenti, inizio del salt.
    const stored = staffUsers().get(user);
    console.warn('[area-riservata] accesso rifiutato', {
      utenteInElenco: Boolean(stored),
      utentiConfigurati: staffUsers().size,
      saltPrefisso: stored?.split('$')[1]?.slice(0, 4) ?? null,
      lunghezzaPassword: password.length,
    });
    return { error: 'Credenziali non valide.' };
  }

  await startSession(user);
  redirect('/area-riservata/simposio/');
}

export async function logout() {
  await endSession();
  redirect('/area-riservata/');
}

async function requireStaff(): Promise<string> {
  const staff = await currentStaff();
  if (!staff) redirect('/area-riservata/');
  return staff;
}

export interface RowActionState {
  ok?: string;
  error?: string;
}

export async function changeStatus(_prev: RowActionState, formData: FormData): Promise<RowActionState> {
  const staff = await requireStaff();
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '') as RegistrationStatus;
  if (!/^[0-9a-f-]{36}$/.test(id) || !registrationStatuses.some((s) => s.value === status)) return { error: 'Richiesta non valida.' };
  try {
    const updated = await updateStatus(simposio.id, id, status, staff);
    if (!updated) return { error: 'Iscrizione non trovata.' };
  } catch {
    return { error: 'Archivio non raggiungibile.' };
  }
  revalidatePath('/area-riservata/simposio/');
  return { ok: 'Stato aggiornato.' };
}

/** Recupero controllato: reinvio manuale della conferma, una richiesta alla volta. */
export async function resendConfirmation(_prev: RowActionState, formData: FormData): Promise<RowActionState> {
  await requireStaff();
  const id = String(formData.get('id') ?? '');
  if (!/^[0-9a-f-]{36}$/.test(id)) return { error: 'Richiesta non valida.' };
  try {
    const row = await getRegistration(simposio.id, id);
    if (!row) return { error: 'Iscrizione non trovata.' };
    if (row.status === 'annullato') return { error: 'Iscrizione annullata: nessun invio.' };
    const outcome = await deliverConfirmation(row.id, row.full_name, row.email, { includeSent: true });
    revalidatePath('/area-riservata/simposio/');
    if (!outcome) return { error: 'Invio già in corso.' };
    if (outcome.status === 'sent') return { ok: 'Email inviata.' };
    return { error: outcome.status === 'skipped' ? `Non inviata: ${outcome.detail.replace(/_/g, ' ')}.` : 'Invio non riuscito.' };
  } catch {
    return { error: 'Archivio non raggiungibile.' };
  }
}
