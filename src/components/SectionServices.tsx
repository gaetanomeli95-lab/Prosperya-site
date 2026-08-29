'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { serviceCatalog } from '@/data/services';
import { FadeIn } from './MotionWrapper';

const accents = ['bg-logo-magenta', 'bg-logo-blue', 'bg-logo-yellow', 'bg-logo-green', 'bg-logo-orange', 'bg-mediterranean-light'];

export function SectionServices() {
  return (
    <section id="servizi" className="relative overflow-hidden bg-[#D9D2C6] py-24 lg:py-40">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#EEE9DF] via-[#E7E1D7] to-transparent" />
      <div className="absolute left-[4%] top-36 h-80 w-80 rounded-full bg-white/35 blur-3xl" />
      <div className="absolute right-[-7rem] bottom-16 h-[26rem] w-[26rem] rounded-full bg-mediterranean/[0.08] blur-3xl" />
      <div className="absolute inset-0 paper-noise opacity-35" />

      <div className="section-frame relative">
        <div className="grid gap-10 border-b border-night/15 pb-12 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-14">
          <div className="lg:col-span-3">
            <FadeIn>
              <span className="section-kicker">I nostri servizi</span>
            </FadeIn>
          </div>

          <div className="lg:col-span-6">
            <FadeIn delay={0.05}>
              <h2 className="max-w-4xl text-[clamp(3rem,5.4vw,6.1rem)] font-heading leading-[0.9] tracking-[-.045em] text-night">
                Quattordici servizi. <span className="italic text-night/55">Una sola regia strategica.</span>
              </h2>
            </FadeIn>
          </div>

          <div className="lg:col-span-3">
            <FadeIn delay={0.1}>
              <p className="max-w-sm text-sm leading-[1.8] text-anthracite/65 lg:text-[15px]">
                Ogni servizio è un punto d’ingresso diretto a competenze integrate, con un unico coordinamento strategico.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(215px,auto)] lg:gap-4">
          {serviceCatalog.map((service, i) => {
            const dark = i === 0 || i === 5 || i === 10 || i === 13;
            const featured = i === 0 || i === 6 || i === 13;
            const tall = i === 4 || i === 9;
            const spanClass = featured
              ? 'lg:col-span-6'
              : tall
                ? 'lg:col-span-3 lg:row-span-2'
                : 'lg:col-span-3';

            return (
              <FadeIn key={service.title} delay={i * 0.02} className={spanClass}>
                <Link
                  href={service.href}
                  className={`group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden border p-5 transition-all duration-500 sm:p-6 lg:min-h-0 lg:p-7 ${dark ? 'dark-surface border-night bg-night' : 'border-night/10 bg-paper/90 hover:bg-paper'} hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(9,13,14,.13)]`}
                >
                  <div className={`absolute inset-x-0 top-0 h-[3px] ${accents[i % accents.length]}`} />
                  <div className={`pointer-events-none absolute -right-10 -top-12 font-heading text-[7.5rem] italic leading-none transition-all duration-700 ${dark ? 'text-white/[0.035] group-hover:text-white/[0.06]' : 'text-night/[0.035] group-hover:text-night/[0.06]'} ${featured ? 'lg:text-[10rem]' : ''}`}>0{i + 1}</div>

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`editorial-index text-2xl ${dark ? 'text-sand' : 'text-mediterranean'} lg:text-3xl`}>{String(i + 1).padStart(2, '0')}</span>
                      {featured && <span className={`hidden h-px w-12 sm:block ${dark ? 'bg-white/20' : 'bg-night/15'}`} />}
                    </div>
                    <span className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 ${dark ? 'border-white/20 !text-white/65 group-hover:bg-white group-hover:!text-night' : 'border-night/15 text-night/40 group-hover:bg-night group-hover:!text-white'}`}>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  <div className={`relative mt-12 ${featured ? 'sm:grid sm:grid-cols-[1fr_.65fr] sm:items-end sm:gap-8' : ''}`}>
                    <div>
                      <p className={`mb-3 text-[9px] font-semibold uppercase tracking-[.22em] ${dark ? '!text-white/45' : 'text-night/40'}`}>{service.area}</p>
                      <h3 className={`${featured ? 'text-[2.15rem] sm:text-[2.7rem] lg:text-[3.15rem]' : 'text-[1.7rem] sm:text-[1.9rem]'} max-w-[24rem] font-heading leading-[.96] ${dark ? '!text-white' : 'text-night'}`}>{service.title}</h3>
                    </div>

                    <div className={featured ? 'mt-6 sm:mt-0' : 'mt-5'}>
                      <p className={`text-[11px] leading-[1.7] ${dark ? '!text-white/55' : 'text-night/50'}`}>
                        {featured ? 'Approfondisci l’area e scopri come Prosperya struttura l’intervento.' : 'Esplora il servizio'}
                      </p>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 h-[3px] w-0 ${accents[i % accents.length]} transition-all duration-700 group-hover:w-full`} />
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
