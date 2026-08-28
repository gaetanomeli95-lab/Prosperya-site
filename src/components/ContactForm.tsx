'use client';

import { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

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

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    area: '',
    message: '',
    privacy: false,
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setForm({ name: '', company: '', email: '', phone: '', area: '', message: '', privacy: false });
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Si è verificato un errore. Riprova più tardi.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Si è verificato un errore tecnico. Riprova più tardi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="premium-label">Nome e cognome *</label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="premium-input" placeholder="Nome e cognome" />
        </div>
        <div>
          <label htmlFor="company" className="premium-label">Azienda</label>
          <input id="company" name="company" type="text" value={form.company} onChange={handleChange} className="premium-input" placeholder="Ragione sociale" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="premium-label">Email *</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="premium-input" placeholder="nome@azienda.it" />
        </div>
        <div>
          <label htmlFor="phone" className="premium-label">Telefono</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="premium-input" placeholder="+39 ..." />
        </div>
      </div>

      <div>
        <label htmlFor="area" className="premium-label">Area di interesse</label>
        <select id="area" name="area" value={form.area} onChange={handleChange} className="premium-input appearance-none">
          <option value="">Seleziona un’area</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="premium-label">Contesto e obiettivo *</label>
        <textarea id="message" name="message" rows={6} required value={form.message} onChange={handleChange} className="premium-input resize-y" placeholder="Descrivi brevemente la situazione, l’obiettivo e le eventuali urgenze." />
      </div>

      <div className="flex items-start gap-3 border-t border-night/10 pt-5">
        <input id="privacy" name="privacy" type="checkbox" required checked={form.privacy} onChange={handleChange} className="mt-0.5 h-4 w-4 border-night/20 text-mediterranean focus:ring-mediterranean" />
        <label htmlFor="privacy" className="text-xs leading-relaxed text-anthracite/65">
          Ho letto e accetto la <a href="/privacy-policy/" className="font-semibold text-mediterranean hover:underline">Privacy Policy</a> *.
        </label>
      </div>

      {status === 'success' && (
        <div className="flex items-start gap-3 border border-logo-green/20 bg-logo-green/5 px-4 py-4 text-sm text-night" role="status" aria-live="polite">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-logo-green" />
          <span>Richiesta inviata con successo. Ti ricontatteremo al più presto.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="border border-logo-magenta/20 bg-logo-magenta/5 px-4 py-4 text-sm text-logo-magenta" role="alert" aria-live="assertive">{errorMsg}</div>
      )}

      <button type="submit" disabled={status === 'sending'} className="premium-button-dark group w-full justify-between sm:w-auto sm:min-w-[220px] disabled:opacity-60">
        {status === 'sending' ? 'Invio in corso...' : 'Invia richiesta'}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
