'use client';

import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import { home } from '@/data/content';
import { company } from '@/data/company';
import { FadeIn } from './MotionWrapper';

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function SectionCta() {
  const whatsappHref = `${company.whatsappHref}?text=${encodeURIComponent('Ciao Prosperya, vorrei ricevere informazioni sui vostri servizi.')}`;

  return (
    <section className="relative overflow-hidden bg-[#D8D1C5] py-16 sm:py-20 lg:py-28">
      <div className="absolute inset-0 paper-noise opacity-55" />
      <div className="section-frame relative">
        <FadeIn>
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#213236_0%,#172326_100%)] px-6 py-10 text-white shadow-[0_35px_120px_rgba(9,13,14,.18)] sm:px-9 sm:py-14 lg:px-12 lg:py-16 xl:px-14">
            <div className="absolute inset-0 prosperya-grid opacity-18" />
            <div className="absolute right-[-10rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-mediterranean/15 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px hairline-light" />

            <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-end">
              <div className="lg:col-span-8">
                <span className="section-kicker-dark">Private advisory</span>
                <h2 className="mt-7 max-w-5xl text-[clamp(2.8rem,6.2vw,7rem)] font-heading leading-[0.92] tracking-[-.045em] !text-white">{home.finalCta.title}</h2>
                <p className="mt-7 max-w-2xl text-sm leading-[1.8] !text-white/72 sm:text-base">{home.finalCta.text}</p>
              </div>

              <div className="lg:col-span-4">
                <Link href="/contatti/" className="group flex min-h-14 items-center justify-between border border-sand/50 bg-sand/[0.10] px-5 text-sm font-semibold !text-white transition-all duration-300 hover:border-sand hover:bg-sand hover:!text-night">
                  {home.finalCta.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <div className="mt-6 border-y border-white/15">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="group flex min-h-12 items-center justify-between gap-4 py-4 text-sm !text-white/72 transition-colors hover:!text-white">
                    <span className="flex items-center gap-3"><WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />{company.telefono}</span>
                    <span className="flex items-center gap-2">
                      <span className="hidden text-[9px] font-semibold uppercase tracking-[.14em] !text-white/40 sm:inline">WhatsApp</span>
                      <ArrowUpRight className="h-4 w-4 opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                  <a href={company.gmailComposeHref} target="_blank" rel="noopener noreferrer" className="group flex min-h-12 items-center justify-between gap-4 border-t border-white/15 py-4 text-sm !text-white/72 transition-colors hover:!text-white">
                    <span className="flex min-w-0 items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-sand" /><span className="truncate">{company.emailPubblica}</span></span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
