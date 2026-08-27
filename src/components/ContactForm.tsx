'use client';

import { useState } from 'react';
import { company } from '@/data/company';

const areas = [
  'Governance e controllo',
  'Strategia e crescita',
  'Startup e nuove imprese',
  'Internazionalizzazione',
  'Crisi e risanamento',
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
    } catch (err) {
      setStatus('error');
      setErrorMsg('Si è verificato un errore tecnico. Riprova più tardi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-night mb-2">
            Nome e cognome <span className="text-logo-magenta">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-sm border border-stone-warm bg-white px-4 py-3 text-sm text-anthracite focus:border-mediterranean focus:outline-none focus:ring-1 focus:ring-mediterranean"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-night mb-2">
            Azienda
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            className="w-full rounded-sm border border-stone-warm bg-white px-4 py-3 text-sm text-anthracite focus:border-mediterranean focus:outline-none focus:ring-1 focus:ring-mediterranean"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-night mb-2">
            Email <span className="text-logo-magenta">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-sm border border-stone-warm bg-white px-4 py-3 text-sm text-anthracite focus:border-mediterranean focus:outline-none focus:ring-1 focus:ring-mediterranean"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-night mb-2">
            Telefono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-sm border border-stone-warm bg-white px-4 py-3 text-sm text-anthracite focus:border-mediterranean focus:outline-none focus:ring-1 focus:ring-mediterranean"
          />
        </div>
      </div>

      <div>
        <label htmlFor="area" className="block text-sm font-medium text-night mb-2">
          Area di interesse
        </label>
        <select
          id="area"
          name="area"
          value={form.area}
          onChange={handleChange}
          className="w-full rounded-sm border border-stone-warm bg-white px-4 py-3 text-sm text-anthracite focus:border-mediterranean focus:outline-none focus:ring-1 focus:ring-mediterranean"
        >
          <option value="">Seleziona un’area</option>
          {areas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-night mb-2">
          Messaggio <span className="text-logo-magenta">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-sm border border-stone-warm bg-white px-4 py-3 text-sm text-anthracite focus:border-mediterranean focus:outline-none focus:ring-1 focus:ring-mediterranean"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          required
          checked={form.privacy}
          onChange={handleChange}
          className="mt-1 w-4 h-4 rounded border-stone-warm text-mediterranean focus:ring-mediterranean"
        />
        <label htmlFor="privacy" className="text-sm text-anthracite/90">
          Ho letto e accetto la{' '}
          <a href="/privacy-policy/" className="text-mediterranean hover:underline">
            Privacy Policy
          </a>{' '}
          *.
        </label>
      </div>

      {status === 'success' && (
        <div className="rounded-sm bg-logo-green/10 text-logo-green px-4 py-3 text-sm" role="status" aria-live="polite">
          Messaggio inviato con successo. Ti ricontatteremo al più presto.
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-sm bg-logo-magenta/10 text-logo-magenta px-4 py-3 text-sm" role="alert" aria-live="assertive">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center rounded-sm bg-mediterranean px-8 py-3.5 text-base font-medium text-white hover:bg-mediterranean-light transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-logo-yellow focus:ring-offset-2 focus:ring-offset-warm-ivory"
      >
        {status === 'sending' ? 'Invio in corso...' : 'Invia richiesta'}
      </button>
    </form>
  );
}
