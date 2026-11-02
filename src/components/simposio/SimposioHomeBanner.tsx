import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { simposio, simposioPath } from '@/data/simposio';
import { formatEventDateShort, registrationState } from '@/lib/simposio/schedule';

/** Accesso al simposio dalla home: discreto, sotto l’hero, nascosto a evento concluso. */
export function SimposioHomeBanner() {
  const state = registrationState();
  if (state === 'ended') return null;

  return (
    <section aria-label={simposio.name} className="relative bg-[#ECE7DE]">
      <div className="section-frame py-5 sm:py-6">
        <Link href={simposioPath} className="group grid gap-4 border border-night/10 bg-paper px-5 py-5 shadow-soft transition-colors hover:border-mediterranean/40 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7 lg:px-9">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-mediterranean">Evento gratuito{state === 'open' ? ' · Iscrizioni aperte' : ''}</p>
            <p className="mt-2 text-[clamp(1.45rem,3.4vw,2.1rem)] font-heading leading-[1.1] text-night">
              {simposio.name}: <span className="italic text-night/70">dall’idea all’impresa.</span>
            </p>
            <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-anthracite/72">
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-mediterranean" aria-hidden="true" />{formatEventDateShort()}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-mediterranean" aria-hidden="true" />{simposio.venue.name}, {simposio.venue.locality}</span>
            </p>
          </div>
          <span className="inline-flex min-h-12 items-center justify-between gap-3 bg-night px-5 text-sm font-semibold text-white transition-colors group-hover:bg-mediterranean sm:min-w-[220px]">
            {state === 'open' ? 'Scopri e iscriviti' : 'Scopri il simposio'} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
