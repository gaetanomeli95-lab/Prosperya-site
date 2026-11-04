'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarDays, CheckCircle2, Loader2, Mail, MapPin, MessageCircle } from 'lucide-react';
import { simposio, simposioSituations } from '@/data/simposio';
import { trackEvent } from '@/lib/analytics';
import { attributionKeys, limits, validateRegistration, type Attribution, type FieldErrors, type RegistrationInput } from '@/lib/simposio/validation';

interface Props {
  eventId: string;
  dateLabel: string;
  venueLabel: string;
  mapsHref: string;
  contact: { phone: string; whatsappHref: string; email: string; emailHref: string };
  /** False quando l’archivio non è configurato: il modulo non finge di funzionare. */
  available: boolean;
}

const ATTRIBUTION_KEY = 'prosperya-simposio-attribution';

const emptyForm: Omit<RegistrationInput, 'situation'> & { situation: string } = {
  fullName: '',
  email: '',
  phone: '',
  comune: '',
  situation: '',
  message: '',
  marketingConsent: false,
};

type Status = 'idle' | 'sending' | 'success' | 'error';
type FieldName = keyof typeof emptyForm;

const fieldOrder: FieldName[] = ['fullName', 'email', 'phone', 'comune', 'situation', 'message'];

function readAttribution(): Attribution {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Attribution = {};
    for (const key of attributionKeys) {
      const value = params.get(key);
      if (value) fromUrl[key] = value.slice(0, 48);
    }
    if (Object.keys(fromUrl).length > 0) {
      window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) ?? '{}') as Attribution;
  } catch {
    return {};
  }
}

export function RegistrationForm({ eventId, dateLabel, venueLabel, mapsHref, contact, available }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [emailDelivery, setEmailDelivery] = useState<'sent' | 'delayed'>('sent');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const inFlight = useRef(false);
  const started = useRef(false);
  const attribution = useRef<Attribution>({});
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    attribution.current = readAttribution();
    trackEvent('simposio_view', { event_id: eventId, utm_source: attribution.current.utm_source });
  }, [eventId]);

  useEffect(() => {
    if (status === 'success') confirmationRef.current?.focus();
  }, [status]);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackEvent('simposio_form_start', { event_id: eventId });
  };

  const update = (name: FieldName, value: string | boolean) => {
    markStarted();
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const focusFirstError = (fieldErrors: FieldErrors) => {
    const first = fieldOrder.find((name) => fieldErrors[name as keyof FieldErrors]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Protezione da doppio clic / doppio invio: una sola richiesta alla volta.
    if (inFlight.current || !available) return;

    const { errors: clientErrors } = validateRegistration(form);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus('error');
      setMessage('Controlla i campi evidenziati.');
      focusFirstError(clientErrors);
      return;
    }

    inFlight.current = true;
    setStatus('sending');
    setMessage('');
    setErrors({});

    try {
      const response = await fetch('/api/simposio/iscrizione/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website, attribution: attribution.current }),
      });
      const data = await response.json().catch(() => ({})) as { ok?: boolean; emailDelivery?: 'sent' | 'delayed'; message?: string; errors?: FieldErrors };

      if (response.ok && data.ok) {
        setSubmittedEmail(form.email.trim());
        setEmailDelivery(data.emailDelivery === 'delayed' ? 'delayed' : 'sent');
        setStatus('success');
        setForm(emptyForm);
        trackEvent('simposio_registration_saved', { event_id: eventId, utm_source: attribution.current.utm_source });
        return;
      }

      setStatus('error');
      setMessage(data.message || 'Non siamo riusciti a completare l’iscrizione. Riprova tra poco.');
      if (data.errors) {
        setErrors(data.errors);
        focusFirstError(data.errors);
      } else {
        alertRef.current?.focus();
      }
    } catch {
      setStatus('error');
      setMessage('Connessione assente o instabile. I dati sono ancora nel modulo: riprova tra poco.');
      alertRef.current?.focus();
    } finally {
      inFlight.current = false;
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-logo-green/25 bg-white p-6 sm:p-8" role="status" aria-live="polite">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-logo-green" aria-hidden="true" />
          <h3 ref={confirmationRef} tabIndex={-1} className="text-2xl font-heading text-night outline-none sm:text-3xl">Iscrizione ricevuta</h3>
        </div>
        <p className="mt-4 text-[15px] leading-[1.75] text-anthracite/80">La tua iscrizione al Simposio Prosperya è registrata. Ti aspettiamo.</p>

        <dl className="mt-6 grid gap-3 border-y border-night/10 py-5 text-sm">
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-mediterranean" aria-hidden="true" />
            <div><dt className="sr-only">Data</dt><dd className="font-semibold text-night">{dateLabel}</dd></div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mediterranean" aria-hidden="true" />
            <div><dt className="sr-only">Luogo</dt><dd><a href={mapsHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-night underline decoration-night/20 underline-offset-4 hover:decoration-mediterranean">{venueLabel}</a></dd></div>
          </div>
        </dl>

        <p className="mt-5 text-sm leading-[1.75] text-anthracite/80">
          {emailDelivery === 'sent' ? (
            <>Abbiamo inviato un’email di riepilogo a <strong className="break-all text-night">{submittedEmail}</strong>. Se non la trovi, controlla anche nella cartella spam o promozioni.</>
          ) : (
            <>L’email di riepilogo per <strong className="break-all text-night">{submittedEmail}</strong> potrebbe arrivare con qualche ritardo. <strong className="text-night">La tua iscrizione è comunque registrata: non serve ripeterla.</strong></>
          )}
        </p>
        <p className="mt-3 text-sm leading-[1.75] text-anthracite/80">{simposio.startTime ? `Inizio alle ore ${simposio.startTime}. Il programma ti verrà comunicato via email appena definito.` : 'Orario e programma ti verranno comunicati via email appena definiti.'}</p>

        <div className="mt-6 border-t border-night/10 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-night/50">Hai bisogno di aiuto?</p>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-night/80 hover:text-night"><MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />{contact.phone} · WhatsApp</a>
            <a href={contact.emailHref} className="inline-flex min-h-11 min-w-0 items-center gap-2 text-night/80 hover:text-night"><Mail className="h-4 w-4 shrink-0 text-mediterranean" aria-hidden="true" /><span className="truncate">{contact.email}</span></a>
          </div>
        </div>
      </div>
    );
  }

  const describedBy = (name: FieldName, hint?: string) => [hint, errors[name as keyof FieldErrors] ? `${name}-error` : null].filter(Boolean).join(' ') || undefined;
  const fieldError = (name: FieldName) => errors[name as keyof FieldErrors] && (
    <p id={`${name}-error`} className="mt-2 text-[13px] font-medium text-logo-magenta">{errors[name as keyof FieldErrors]}</p>
  );
  const inputClass = (name: FieldName) => `premium-input simposio-input ${errors[name as keyof FieldErrors] ? '!border-logo-magenta/60 !bg-logo-magenta/[0.03]' : ''}`;
  const sending = status === 'sending';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="relative space-y-5" aria-describedby="simposio-form-intro">
      <p id="simposio-form-intro" className="text-sm leading-[1.7] text-anthracite/70">I campi con <span aria-hidden="true">*</span><span className="sr-only">asterisco</span> sono obbligatori. Bastano meno di un minuto.</p>

      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="simposio-website">Sito web</label>
        <input id="simposio-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div>
        <label htmlFor="simposio-fullName" className="premium-label">Nome e cognome *</label>
        <input id="simposio-fullName" name="fullName" type="text" autoComplete="name" autoCapitalize="words" required maxLength={limits.fullName}
          value={form.fullName} onChange={(e) => update('fullName', e.target.value)} onFocus={markStarted}
          aria-invalid={Boolean(errors.fullName)} aria-describedby={describedBy('fullName')} className={inputClass('fullName')} />
        {fieldError('fullName')}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="simposio-email" className="premium-label">Email *</label>
          <input id="simposio-email" name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} required maxLength={limits.email}
            value={form.email} onChange={(e) => update('email', e.target.value)} onFocus={markStarted}
            aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email', 'simposio-email-hint')} className={inputClass('email')} />
          <p id="simposio-email-hint" className="mt-2 text-xs leading-[1.6] text-anthracite/60">Qui riceverai il riepilogo dell’iscrizione.</p>
          {fieldError('email')}
        </div>
        <div>
          <label htmlFor="simposio-phone" className="premium-label">Cellulare *</label>
          <input id="simposio-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={limits.phone}
            value={form.phone} onChange={(e) => update('phone', e.target.value)} onFocus={markStarted}
            aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy('phone', 'simposio-phone-hint')} className={inputClass('phone')} />
          <p id="simposio-phone-hint" className="mt-2 text-xs leading-[1.6] text-anthracite/60">Solo per comunicazioni organizzative sul simposio.</p>
          {fieldError('phone')}
        </div>
      </div>

      <fieldset className="space-y-5 border-t border-night/10 pt-5">
        <legend className="sr-only">Informazioni facoltative</legend>
        <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-night/45" aria-hidden="true">Facoltativo</p>

        <div>
          <label htmlFor="simposio-comune" className="premium-label">Comune di provenienza</label>
          <input id="simposio-comune" name="comune" type="text" autoComplete="address-level2" autoCapitalize="words" maxLength={limits.comune}
            value={form.comune} onChange={(e) => update('comune', e.target.value)}
            aria-invalid={Boolean(errors.comune)} aria-describedby={describedBy('comune')} className={inputClass('comune')} />
          {fieldError('comune')}
        </div>

        <div>
          <label htmlFor="simposio-situation" className="premium-label">La tua situazione attuale</label>
          <select id="simposio-situation" name="situation" value={form.situation} onChange={(e) => update('situation', e.target.value)}
            aria-invalid={Boolean(errors.situation)} aria-describedby={describedBy('situation')} className={`${inputClass('situation')} simposio-select`}>
            <option value="">Seleziona, se vuoi</option>
            {simposioSituations.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          {fieldError('situation')}
        </div>

        <div>
          <label htmlFor="simposio-message" className="premium-label">La tua idea o una domanda da approfondire</label>
          <textarea id="simposio-message" name="message" rows={3} maxLength={limits.message}
            value={form.message} onChange={(e) => update('message', e.target.value)}
            aria-invalid={Boolean(errors.message)} aria-describedby={describedBy('message', 'simposio-message-hint')} className={`${inputClass('message')} resize-y`} />
          <p id="simposio-message-hint" className="mt-2 text-xs leading-[1.6] text-anthracite/60">Anche solo una riga. Ci aiuta a capire quali temi interessano di più ai partecipanti.</p>
          {fieldError('message')}
        </div>

        <div className="flex items-start gap-3">
          <input id="simposio-marketing" name="marketingConsent" type="checkbox" checked={form.marketingConsent} onChange={(e) => update('marketingConsent', e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-mediterranean" />
          <label htmlFor="simposio-marketing" className="text-[13px] leading-[1.6] text-anthracite/75">
            Desidero ricevere da Prosperya informazioni su futuri eventi e iniziative. Facoltativo: non è necessario per iscriversi e puoi revocarlo in qualsiasi momento.
          </label>
        </div>
      </fieldset>

      <div ref={alertRef} tabIndex={-1} className="outline-none" role="alert" aria-live="assertive">
        {status === 'error' && message && (
          <p className="border border-logo-magenta/25 bg-logo-magenta/[0.05] px-4 py-3 text-sm leading-[1.6] text-[#9C1452]">{message}</p>
        )}
      </div>

      {!available && (
        <p className="border border-sand/60 bg-sand/15 px-4 py-3 text-sm leading-[1.6] text-night/80">
          Le iscrizioni online sono in fase di attivazione. Nel frattempo puoi iscriverti scrivendo a <a href={contact.emailHref} className="font-semibold underline">{contact.email}</a> o su WhatsApp al {contact.phone}.
        </p>
      )}

      <button type="submit" disabled={sending || !available} aria-disabled={sending || !available}
        className="premium-button-dark group w-full justify-between text-[15px] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[280px]">
        <span>{sending ? 'Invio in corso…' : 'Iscriviti al simposio'}</span>
        {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
      </button>

      <p className="text-xs leading-[1.7] text-anthracite/60">
        I dati servono a gestire la tua iscrizione e le comunicazioni organizzative sull’evento. Dettagli nell’<Link href="/privacy-policy/#simposio" className="font-semibold text-mediterranean underline-offset-2 hover:underline">informativa privacy</Link>.
      </p>
    </form>
  );
}
