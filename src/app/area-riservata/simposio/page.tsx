import { redirect } from 'next/navigation';
import { Download, LogOut } from 'lucide-react';
import { registrationStatuses, simposio } from '@/data/simposio';
import { currentStaff } from '@/lib/staff/auth';
import { listRegistrations, type RegistrationRow } from '@/lib/simposio/repository';
import { formatEventDate, formatVenue, registrationState } from '@/lib/simposio/schedule';
import { emailConfig } from '@/lib/simposio/email';
import { logout } from '../actions';
import { RegistrationsList, type StaffRow } from './RegistrationsList';

export const dynamic = 'force-dynamic';

function toStaffRow(r: RegistrationRow): StaffRow {
  return {
    id: r.id,
    createdAt: r.created_at.toISOString(),
    fullName: r.full_name,
    email: r.email,
    phone: r.phone,
    comune: r.comune,
    situation: r.situation,
    message: r.message,
    marketingConsent: r.marketing_consent,
    status: r.status,
    statusUpdatedBy: r.status_updated_by,
    confirmationStatus: r.confirmation_email_status,
    confirmationDetail: r.confirmation_email_detail,
    source: [r.utm_source, r.utm_medium, r.utm_campaign].filter(Boolean).join(' / ') || null,
    duplicateAttempts: r.duplicate_attempts,
  };
}

export default async function StaffSimposio() {
  const staff = await currentStaff();
  if (!staff) redirect('/area-riservata/');

  let rows: RegistrationRow[] = [];
  let loadError = false;
  try {
    rows = await listRegistrations(simposio.id);
  } catch {
    loadError = true;
  }

  const counts = registrationStatuses.map((s) => ({ ...s, count: rows.filter((r) => r.status === s.value).length }));
  const emailIssues = rows.filter((r) => r.confirmation_email_status !== 'sent' && r.status !== 'annullato').length;
  const mail = emailConfig();
  const state = registrationState();

  return (
    <div className="space-y-5">
      <section className="premium-panel-dark dark-surface p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="section-kicker-dark">Area riservata · Iscritti</span>
            <h1 className="mt-4 text-[clamp(2rem,5vw,3.4rem)] font-heading leading-[1] !text-white">{simposio.name}</h1>
            <p className="mt-3 text-sm !text-white/70">{formatEventDate()} · {formatVenue()} · Iscrizioni {state === 'open' ? 'aperte' : 'chiuse'}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="/area-riservata/simposio/export/" download className="inline-flex min-h-11 items-center gap-2 bg-sand px-4 text-sm font-semibold !text-night hover:bg-white"><Download className="h-4 w-4" aria-hidden="true" />Esporta CSV</a>
            <form action={logout}><button type="submit" className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-4 text-sm !text-white/80 hover:bg-white/10"><LogOut className="h-4 w-4" aria-hidden="true" />Esci</button></form>
          </div>
        </div>
        <p className="mt-4 text-xs !text-white/50">Accesso come {staff}</p>
      </section>

      {(mail.testSender || !mail.apiKey) && (
        <p className="border border-sand/60 bg-sand/15 px-4 py-3 text-sm text-night/80">
          Email ai partecipanti non attive: {!mail.apiKey ? 'chiave Resend mancante' : 'mittente di prova (dominio resend.dev)'}. Le iscrizioni vengono comunque salvate; le conferme potranno essere inviate da qui una volta configurato il mittente.
        </p>
      )}

      <dl className="grid grid-cols-2 gap-px overflow-hidden border border-night/10 bg-night/10 sm:grid-cols-3 lg:grid-cols-6">
        <div className="bg-paper p-4"><dt className="text-[11px] font-semibold uppercase tracking-[.14em] text-night/50">Totale</dt><dd className="mt-1 text-3xl font-heading text-night">{rows.length}</dd></div>
        {counts.map((c) => (
          <div key={c.value} className="bg-paper p-4"><dt className="text-[11px] font-semibold uppercase tracking-[.14em] text-night/50">{c.label}</dt><dd className="mt-1 text-3xl font-heading text-night">{c.count}</dd></div>
        ))}
        <div className="bg-paper p-4"><dt className="text-[11px] font-semibold uppercase tracking-[.14em] text-night/50">Email da recuperare</dt><dd className={`mt-1 text-3xl font-heading ${emailIssues ? 'text-logo-magenta' : 'text-night'}`}>{emailIssues}</dd></div>
      </dl>

      <section className="border border-night/10 bg-[#F6F2EA] p-4 sm:p-6">
        {loadError
          ? <p role="alert" className="text-sm text-logo-magenta">Archivio non raggiungibile. Riprova tra poco.</p>
          : <RegistrationsList rows={rows.map(toStaffRow)} />}
      </section>
    </div>
  );
}
