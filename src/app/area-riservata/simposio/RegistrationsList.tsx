'use client';

import { useActionState, useMemo, useState } from 'react';
import { registrationStatuses, simposioSituations, type RegistrationStatus } from '@/data/simposio';
import { changeStatus, resendConfirmation, type RowActionState } from '../actions';

export interface StaffRow {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  comune: string | null;
  situation: string | null;
  message: string | null;
  marketingConsent: boolean;
  status: RegistrationStatus;
  statusUpdatedBy: string | null;
  confirmationStatus: string;
  confirmationDetail: string | null;
  source: string | null;
  duplicateAttempts: number;
}

const emailLabels: Record<string, string> = {
  pending: 'In attesa',
  sending: 'In invio',
  sent: 'Inviata',
  failed: 'Non riuscita',
  skipped: 'Non inviata',
};

const statusStyles: Record<RegistrationStatus, string> = {
  iscritto: 'border-mediterranean/30 bg-mediterranean/[0.07] text-mediterranean',
  riconfermato: 'border-logo-blue/30 bg-logo-blue/[0.07] text-logo-blue',
  presente: 'border-logo-green/35 bg-logo-green/[0.08] text-[#2E7D32]',
  annullato: 'border-night/20 bg-night/[0.05] text-night/60',
};

const dateFormat = new Intl.DateTimeFormat('it-IT', { timeZone: 'Europe/Rome', dateStyle: 'short', timeStyle: 'short' });

function StatusForm({ row }: { row: StaffRow }) {
  const [state, action, pending] = useActionState<RowActionState, FormData>(changeStatus, {});
  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="id" value={row.id} />
      <label className="sr-only" htmlFor={`status-${row.id}`}>Stato di {row.fullName}</label>
      <select id={`status-${row.id}`} name="status" defaultValue={row.status} className="premium-input simposio-select !w-auto !py-2 text-sm">
        {registrationStatuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
      <button type="submit" disabled={pending} className="min-h-10 border border-night/20 px-3 text-xs font-semibold uppercase tracking-[.1em] text-night hover:bg-night hover:text-white disabled:opacity-50">Salva</button>
      <span role="status" className={`text-xs ${state.error ? 'text-logo-magenta' : 'text-[#2E7D32]'}`}>{state.error ?? state.ok ?? ''}</span>
    </form>
  );
}

function ResendForm({ row }: { row: StaffRow }) {
  const [state, action, pending] = useActionState<RowActionState, FormData>(resendConfirmation, {});
  return (
    <form action={action} onSubmit={(e) => { if (row.confirmationStatus === 'sent' && !window.confirm(`Reinviare la conferma a ${row.email}?`)) e.preventDefault(); }} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="id" value={row.id} />
      <button type="submit" disabled={pending || row.status === 'annullato'} className="min-h-9 text-xs font-semibold text-mediterranean underline-offset-2 hover:underline disabled:opacity-40">
        {pending ? 'Invio…' : row.confirmationStatus === 'sent' ? 'Reinvia conferma' : 'Invia conferma'}
      </button>
      <span role="status" className={`text-xs ${state.error ? 'text-logo-magenta' : 'text-[#2E7D32]'}`}>{state.error ?? state.ok ?? ''}</span>
    </form>
  );
}

export function RegistrationsList({ rows }: { rows: StaffRow[] }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'' | RegistrationStatus>('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => (!status || r.status === status) && (!q || [r.fullName, r.email, r.phone, r.comune ?? ''].some((v) => v.toLowerCase().includes(q))));
  }, [rows, query, status]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="staff-search" className="premium-label">Cerca</label>
          <input id="staff-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nome, email, telefono, comune" className="premium-input simposio-input" />
        </div>
        <div>
          <label htmlFor="staff-filter" className="premium-label">Stato</label>
          <select id="staff-filter" value={status} onChange={(e) => setStatus(e.target.value as '' | RegistrationStatus)} className="premium-input simposio-input simposio-select sm:min-w-[220px]">
            <option value="">Tutti</option>
            {registrationStatuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-anthracite/65" aria-live="polite">{filtered.length} di {rows.length} iscrizioni</p>

      {rows.length === 0 && <p className="mt-6 border border-dashed border-night/20 p-6 text-sm text-anthracite/70">Ancora nessuna iscrizione.</p>}

      <ul className="mt-4 space-y-3">
        {filtered.map((r) => (
          <li key={r.id} className="border border-night/10 bg-paper p-4 sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[1.3fr_1.2fr_1fr]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-body text-base font-semibold text-night">{r.fullName}</h2>
                  <span className={`border px-2 py-0.5 text-[11px] font-semibold ${statusStyles[r.status]}`}>{registrationStatuses.find((s) => s.value === r.status)?.label}</span>
                </div>
                <p className="mt-1 text-xs text-anthracite/60">Iscritto il {dateFormat.format(new Date(r.createdAt))}{r.duplicateAttempts > 0 ? ` · ${r.duplicateAttempts} tentativi ripetuti` : ''}</p>
                <p className="mt-2 break-all text-sm"><a href={`mailto:${r.email}`} className="text-mediterranean hover:underline">{r.email}</a></p>
                <p className="text-sm"><a href={`tel:${r.phone}`} className="text-night/80 hover:underline">{r.phone}</a></p>
              </div>
              <div className="min-w-0 text-sm text-anthracite/80">
                <p><span className="text-anthracite/55">Comune:</span> {r.comune || '—'}</p>
                <p><span className="text-anthracite/55">Situazione:</span> {simposioSituations.find((s) => s.value === r.situation)?.label ?? '—'}</p>
                <p><span className="text-anthracite/55">Fonte:</span> {r.source || '—'}</p>
                <p><span className="text-anthracite/55">Info su futuri eventi:</span> {r.marketingConsent ? 'Sì' : 'No'}</p>
                {r.message && <p className="mt-2 whitespace-pre-line border-l-2 border-sand pl-3 text-[13px] text-anthracite/75">{r.message}</p>}
              </div>
              <div className="space-y-2 text-sm">
                <StatusForm row={r} />
                <p className="text-xs text-anthracite/60">{r.statusUpdatedBy ? `Ultima modifica: ${r.statusUpdatedBy}` : ''}</p>
                <p className="text-xs">
                  <span className="text-anthracite/55">Email di conferma:</span>{' '}
                  <span className={r.confirmationStatus === 'sent' ? 'text-[#2E7D32]' : r.confirmationStatus === 'failed' ? 'text-logo-magenta' : 'text-night/70'}>{emailLabels[r.confirmationStatus] ?? r.confirmationStatus}</span>
                  {r.confirmationStatus !== 'sent' && r.confirmationDetail ? <span className="text-anthracite/55"> ({r.confirmationDetail.replace(/_/g, ' ')})</span> : null}
                </p>
                <ResendForm row={r} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
