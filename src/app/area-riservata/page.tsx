import { redirect } from 'next/navigation';
import { currentStaff } from '@/lib/staff/auth';
import { LoginForm } from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function AreaRiservataLogin() {
  if (await currentStaff()) redirect('/area-riservata/simposio/');

  return (
    <section className="mx-auto max-w-md border border-night/10 bg-paper p-6 shadow-soft sm:p-9">
      <span className="section-kicker">Area riservata</span>
      <h1 className="mt-5 text-4xl font-heading">Accesso personale</h1>
      <p className="mt-3 text-sm leading-[1.7] text-anthracite/70">Riservato agli incaricati Prosperya per la gestione degli iscritti agli eventi.</p>
      <div className="mt-7"><LoginForm /></div>
    </section>
  );
}
