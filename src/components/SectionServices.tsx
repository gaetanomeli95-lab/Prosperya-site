'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { serviceCatalog } from '@/data/services';
import { FadeIn } from './MotionWrapper';

const accents = ['bg-logo-magenta', 'bg-logo-blue', 'bg-logo-yellow', 'bg-logo-green', 'bg-logo-orange', 'bg-mediterranean-light'];

export function SectionServices() {
  return (
    <section id="servizi" className="relative overflow-hidden bg-[#D9D2C6] py-20 sm:py-24 lg:py-40">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#EEE9DF] via-[#E7E1D7] to-transparent" />
      <div className="absolute left-[4%] top-36 hidden h-80 w-80 rounded-full bg-white/35 blur-3xl md:block" />
      <div className="absolute right-[-7rem] bottom-16 hidden h-[26rem] w-[26rem] rounded-full bg-mediterranean/[0.08] blur-3xl md:block" />
      <div className="absolute inset-0 paper-noise opacity-30" />

      <div className="section-frame relative">
        <div className="grid gap-8 border-b border-night/15 pb-10 sm:gap-10 sm:pb-12 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-14">
          <div className="lg:col-span-3">
            <FadeIn><span className="section-kicker">I nostri servizi</span></FadeIn>
          </div>

          <div className="lg:col-span-6">
            <FadeIn delay={0.05}>
              <h2 className="max-w-4xl text-[clamp(2.75rem,11vw,6.1rem)] font-heading leading-[0.9] tracking-[-.045em] text-night sm:text-[clamp(3rem,7vw,6.1rem)]">
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

        <div className="mt-8 grid grid-cols-1 gap-2.5 sm:mt-10 sm:grid-cols-2 sm:gap-3 lg:grid-cols-12 lg:auto-rows-[minmax(215px,auto)] lg:gap-4">
          {serviceCatalog.map((service, i) => {
            const dark = i === 0 || i === 5 || i === 10 || i === 13;
            const featured = i === 0 || i === 6 || i === 13;
            const tall = i === 4 || i === 9;
            const spanClass = featured ? 'lg:col-span-6' : tall ? 'lg:col-span-3 lg:row-span-2' : 'lg:col-span-3';

            return (
              <FadeIn key={service.title} delay={i * 0.02} className={spanClass}>
                <Link
                  href={service.href}
                  className={`group relative flex h-full min-h-[205px] flex-col justify-between overflow-hidden border p-5 transition-[transform,box-shadow,border-color,background-color] duration-500 sm:min-h-[220px] sm:p-6 lg:min-h-0 lg:p-7 ${dark ? 'dark-surface border-night bg-night' : 'border-night/10 bg-paper/90 hover:border-night/20 hover:bg-paper'} lg:hover:-translate-y-1 lg:hover:shadow-[0_28px_80px_rgba(9,13,14,.13)]`}
                >
                  <div className={`absolute inset-x-0 top-0 h-[2px] ${accents[i % accents.length]}`} />
                  <div className={`pointer-events-none absolute -right-8 -top-10 font-heading text-[6.8rem] italic leading-none transition-colors duration-700 sm:-right-10 sm:-top-12 sm:text-[7.5rem] ${dark ? 'text-white/[0.03] lg:group-hover:text-white/[0.055]' : 'text-night/[0.03] lg:group-hover:text-night/[0.055]'} ${featured ? 'lg:text-[10rem]' : ''}`}>0{i + 1}</div>

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`editorial-index text-xl sm:text-2xl lg:text-3xl ${dark ? 'text-sand' : 'text-mediterranean'}`}>{String(i + 1).padStart(2, '0')}</span>
                      {featured && <span className={`hidden h-px w-12 sm:block ${dark ? 'bg-white/20' : 'bg-night/15'}`} />}
                    </div>
                    <span className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-300 sm:h-10 sm:w-10 ${dark ? 'border-white/18 !text-white/58 lg:group-hover:bg-white lg:group-hover:!text-night' : 'border-night/12 text-night/35 lg:group-hover:bg-night lg:group-hover:!text-white'}`}>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 lg:group-hover:-translate-y-0.5 lg:group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
                    </span>
                  </div>

                  <div className={`relative mt-10 sm:mt-12 ${featured ? 'sm:grid sm:grid-cols-[1fr_.65fr] sm:items-end sm:gap-8' : ''}`}>
                    <div>
                      <p className={`mb-2.5 text-[8px] font-semibold uppercase tracking-[.21em] sm:mb-3 sm:text-[9px] ${dark ? '!text-white/42' : 'text-night/38'}`}>{service.area}</p>
                      <h3 className={`${featured ? 'text-[2rem] sm:text-[2.7rem] lg:text-[3.15rem]' : 'text-[1.55rem] sm:text-[1.9rem]'} max-w-[24rem] font-heading leading-[.96] ${dark ? '!text-white' : 'text-night'}`}>{service.title}</h3>
                    </div>

                    <div className={featured ? 'mt-5 sm:mt-0' : 'mt-4 sm:mt-5'}>
                      <p className={`text-[10px] leading-[1.65] sm:text-[11px] ${dark ? '!text-white/50' : 'text-night/47'}`}>
                        {featured ? 'Approfondisci l’area e scopri come Prosperya struttura l’intervento.' : 'Esplora il servizio'}
                      </p>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 h-[2px] w-0 ${accents[i % accents.length]} transition-all duration-700 lg:group-hover:w-full`} />
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
