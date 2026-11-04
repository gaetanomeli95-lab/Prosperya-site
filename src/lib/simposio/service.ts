import 'server-only';
import { simposio } from '@/data/simposio';
import {
  claimConfirmationEmail,
  claimDuplicateNotice,
  recordConfirmationEmail,
  recordInternalNotification,
  saveRegistration,
} from './repository';
import { confirmationEmail, duplicateNoticeEmail, internalNotificationEmail, sendInternalEmail, sendParticipantEmail } from './email';
import type { Attribution, RegistrationInput } from './validation';

/** Versione dell’informativa mostrata al momento dell’iscrizione: aggiornarla quando cambia il testo. */
export const PRIVACY_NOTICE_VERSION = '2026-11-03';

export type EmailDelivery = 'sent' | 'delayed';

/**
 * Invia (o reinvia) la conferma al partecipante e ne registra l’esito.
 * Restituisce null se un’altra richiesta sta già inviando la stessa email.
 */
export async function deliverConfirmation(id: string, fullName: string, email: string, options: { includeSent?: boolean } = {}) {
  if (!(await claimConfirmationEmail(id, options))) return null;
  const outcome = await sendParticipantEmail(email, confirmationEmail(fullName));
  await recordConfirmationEmail(id, outcome.status, outcome.detail);
  return outcome;
}

/**
 * 1. Salva l’iscrizione (o riconosce quella esistente) nell’archivio persistente.
 * 2. Solo dopo, prova a inviare le email e ne registra l’esito.
 * Un errore email non annulla mai un’iscrizione salvata.
 */
export async function register(input: RegistrationInput, attribution: Attribution): Promise<{ emailDelivery: EmailDelivery }> {
  const saved = await saveRegistration(simposio.id, input, attribution, PRIVACY_NOTICE_VERSION);

  try {
    if (saved.inserted) {
      const [confirmation, internal] = await Promise.all([
        deliverConfirmation(saved.id, saved.fullName, saved.email),
        sendInternalEmail(internalNotificationEmail({
          fullName: saved.fullName,
          comune: input.comune,
          situation: input.situation,
          source: [attribution.utm_source, attribution.utm_medium].filter(Boolean).join(' / ') || null,
        })),
      ]);
      await recordInternalNotification(saved.id, internal.status, internal.detail);
      return { emailDelivery: confirmation?.status === 'sent' ? 'sent' : 'delayed' };
    }

    // Iscrizione già presente: nessun dato viene letto o modificato dalla richiesta pubblica.
    // Se la conferma non era partita la si ritenta; altrimenti si avvisa il titolare dell’indirizzo.
    if (saved.confirmationStatus !== 'sent') {
      const retry = await deliverConfirmation(saved.id, saved.fullName, saved.email);
      return { emailDelivery: retry?.status === 'sent' ? 'sent' : 'delayed' };
    }
    if (await claimDuplicateNotice(saved.id)) {
      await sendParticipantEmail(saved.email, duplicateNoticeEmail(saved.fullName));
    }
    return { emailDelivery: 'sent' };
  } catch {
    // L’iscrizione è già salvata: l’esito email resta registrato come da recuperare.
    return { emailDelivery: 'delayed' };
  }
}
