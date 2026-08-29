'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const areas = [
  'Governance e controllo',
  'Sviluppo e risorse',
  'Start Up',
  'Creazione NewCo',
  'Internazionalizzazione',
  'Ristrutturazione debiti',
  'Finanza agevolata',
  'Altro',
];

const companySizes = [
  'Professionista / microimpresa',
  '1–10 persone',
  '11–50 persone',
  '51–250 persone',
  'Oltre 250 persone',
  'Nuova iniziativa / società da costituire',
];

const urgencies = [
  'Sto raccogliendo informazioni',
  'Entro 3 mesi',
  'Entro 30 giorni',
  'Situazione urgente',
];

const initialForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  area: '',
  companySize: '',
  urgency: '',
  message: '',
  website: '',
  privacy: false,
};

export function ContactForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const progress = useMemo(() => `${Math.round((step / 3) * 100)}%`, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const canContinue = () => {
    if (step === 1) return Boolean(form.company && form.companySize);
    if (step === 2) return Boolean(form.area && form.urgency && form.message.trim().length >= 20);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      if (canContinue()) setStep((current) => current + 1);
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Si è verificato un errore. Riprova più tardi.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Si è verificato un errore tecnico. Riprova più tardi.');
    }
  };

  if (status === 'success') {
    return (
      <div className="border-y border-night/10 py-10 sm:py-12" role="status" aria-live="polite">
        <CheckCircle2 className="h-7 w-7 text-logo-green" />
        <p className="mt-5 eyebrow text-night/40">Richiesta ricevuta</p>
        <h3 className="mt-3 max-w-xl text-3xl font-heading leading-[1] text-night sm:text-4xl">Il contesto è stato inviato correttamente.</h3>
        <p className="mt-5 max-w-xl text-sm leading-[1.8] text-anthracite/65">Prosperya potrà valutare la richiesta partendo già da area, dimensione aziendale, urgenza e obiettivo indicato.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <div className="flex items-center justify-between gap-4 text-[9px] font-semibold uppercase tracking-[.18em] text-night/35">
          <span>Inquadramento iniziale</span>
          <span>0{step} / 03</span>
        </div>
        <div className="mt-3 h-px bg-night/10">
          <div className="h-px bg-mediterranean transition-[width] duration-500" style={{ width: progress }} />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <p className="eyebrow text-night/35">01 · L’impresa</p>
            <h3 className="mt-3 text-3xl font-heading leading-none text-night sm:text-4xl">Partiamo dalla struttura.</h3>
          </div>

          <div>
            <label htmlFor="company" className="premium-label">Azienda / progetto *</label>
            <input id="company" name="company" type="text" required value={form.company} onChange={handleChange} className="premium-input" placeholder="Ragione sociale o nome del progetto" />
          </div>

          <div>
            <label htmlFor="companySize" className="premium-label">Dimensione *</label>
            <select id="companySize" name="companySize" required value={form.companySize} onChange={handleChange} className="premium-input appearance-none">
              <option value="">Seleziona la dimensione</option>
              {companySizes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="eyebrow text-night/35">02 · La priorità</p>
            <h3 className="mt-3 text-3xl font-heading leading-none text-night sm:text-4xl">Cosa richiede attenzione adesso?</h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="area" className="premium-label">Area di interesse *</label>
              <select id="area" name="area" required value={form.area} onChange={handleChange} className="premium-input appearance-none">
                <option value="">Seleziona un’area</option>
                {areas.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="urgency" className="premium-label">Tempistica *</label>
              <select id="urgency" name="urgency" required value={form.urgency} onChange={handleChange} className="premium-input appearance-none">
                <option value="">Seleziona una tempistica</option>
                {urgencies.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="premium-label">Contesto e obiettivo *</label>
            <textarea id="message" name="message" rows={6} required minLength={20} value={form.message} onChange={handleChange} className="premium-input resize-y" placeholder="Descrivi brevemente la situazione, ciò che vuoi ottenere e gli eventuali vincoli." />
            <p className="mt-2 text-[10px] leading-relaxed text-night/35">Bastano poche righe, ma servono elementi concreti per inquadrare correttamente la richiesta.</p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <p className="eyebrow text-night/35">03 · Il contatto</p>
            <h3 className="mt-3 text-3xl font-heading leading-none text-night sm:text-4xl">Chi possiamo ricontattare?</h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="premium-label">Nome e cognome *</label>
              <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="premium-input" placeholder="Nome e cognome" />
            </div>
            <div>
              <label htmlFor="email" className="premium-label">Email *</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="premium-input" placeholder="nome@azienda.it" />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="premium-label">Telefono</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="premium-input" placeholder="+39 ..." />
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Sito web</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
          </div>

          <div className="flex items-start gap-3 border-t border-night/10 pt-5">
            <input id="privacy" name="privacy" type="checkbox" required checked={form.privacy} onChange={handleChange} className="mt-0.5 h-4 w-4 border-night/20 text-mediterranean focus:ring-mediterranean" />
            <label htmlFor="privacy" className="text-xs leading-relaxed text-anthracite/65">
              Ho letto e accetto la <a href="/privacy-policy/" className="font-semibold text-mediterranean hover:underline">Privacy Policy</a> *.
            </label>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="border border-logo-magenta/20 bg-logo-magenta/5 px-4 py-4 text-sm text-logo-magenta" role="alert" aria-live="assertive">{errorMsg}</div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-night/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 1 ? (
          <button type="button" onClick={() => setStep((current) => current - 1)} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-night/45 transition-colors hover:text-night">
            <ArrowLeft className="h-4 w-4" /> Indietro
          </button>
        ) : <span />}

        <button type="submit" disabled={status === 'sending' || (step < 3 && !canContinue())} className="premium-button-dark group justify-between sm:min-w-[220px] disabled:cursor-not-allowed disabled:opacity-35">
          {status === 'sending' ? 'Invio in corso...' : step < 3 ? 'Continua' : 'Invia il contesto'}
          {step < 3 ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
        </button>
      </div>
    </form>
  );
}
