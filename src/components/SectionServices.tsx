'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { serviceCatalog } from '@/data/services';
import { FadeIn } from './MotionWrapper';

const accents = ['bg-logo-magenta', 'bg-logo-blue', 'bg-logo-yellow', 'bg-logo-green', 'bg-logo-orange', 'bg-mediterranean-light'];

export function SectionServices() {
  return (
    <section id="servizi" className="relative overflow-hidden bg-[#DCD6CB] py-24 lg:py-36">
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#EEE9DF] to-transparent" />
      <div className="absolute left-[7%] top-32 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
      <div className="absolute right-[-5rem] bottom-10 h-80 w-80 rounded-full bg-mediterranean/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-6 lg:px-8">
        <div className="mb-14 grid items-end gap-10 lg:mb-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-mediterranean" />
                <span className="eyebrow text-night/50">I nostri servizi</span>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-6">
            <FadeIn delay={0.05}>
              <h2 className="max-w-4xl text-4xl font-heading leading-[0.96] text-night sm:text-5xl lg:text-6xl">
                Quattordici servizi. <span className="italic text-night/60">Una sola regia strategica.</span>
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-3">
            <FadeIn delay={0.12}>
              <p className="max-w-sm text-sm leading-[1.75] text-anthracite/70 lg:text-[15px]">
                Ogni servizio è un punto d’ingresso diretto a competenze integrate, con un unico coordinamento strategico.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
          {serviceCatalog.map((service, i) => {
            const dark = i === 0 || i === 5 || i === 10 || i === 13;
            const wide = i === 0 || i === 7 || i === 13;
            const tall = i === 4 || i === 9;

            return (
              <FadeIn key={service.title} delay={i * 0.025} className={wide ? 'xl:col-span-2' : ''}>
                <Link
                  href={service.href}
                  className={`group relative flex h-full min-h-[205px] flex-col justify-between overflow-hidden border p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_75px_rgba(9,13,14,.14)] sm:p-6 ${tall ? 'xl:min-h-[290px]' : ''} ${dark ? 'dark-surface border-night bg-night' : 'border-night/10 bg-paper/95 hover:border-night/20'}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-[3px] ${accents[i % accents.length]}`} />
                  <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full border transition-transform duration-700 group-hover:scale-125 ${dark ? 'border-white/10' : 'border-night/10'}`} />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`font-heading italic text-2xl ${dark ? 'text-sand' : 'text-mediterranean'}`}>{String(i + 1).padStart(2, '0')}</span>
                      {wide && <span className={`hidden h-px w-10 sm:block ${dark ? 'bg-white/20' : 'bg-night/10'}`} />}
                    </div>
                    <span className={`grid h-10 w-10 place-items-center border transition-all duration-300 ${dark ? 'border-white/20 !text-white/70 group-hover:bg-white group-hover:!text-night' : 'border-night/10 text-night/40 group-hover:bg-night group-hover:!text-white'}`}>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  <div className={wide ? 'sm:grid sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8' : ''}>
                    <div>
                      <p className={`mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] ${dark ? '!text-white/50' : 'text-night/40'}`}>{service.area}</p>
                      <h3 className={`max-w-[23rem] text-[1.55rem] font-heading leading-[1.02] sm:text-[1.8rem] ${dark ? '!text-white' : 'text-night'}`}>{service.title}</h3>
                    </div>
                    {wide && (
                      <p className={`mt-5 max-w-[15rem] text-[11px] leading-[1.6] sm:mt-0 ${dark ? '!text-white/60' : 'text-night/50'}`}>
                        Approfondisci l’area e scopri come Prosperya struttura l’intervento.
                      </p>
                    )}
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
