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
      <div className="absolute left-[7%] top-32 h-72 w-72 rounded-full bg-white/35 blur-3xl" />
      <div className="absolute right-[-5rem] bottom-10 h-80 w-80 rounded-full bg-mediterranean/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-6 lg:px-8">
        <div className="mb-14 grid items-end gap-10 lg:mb-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-mediterranean" />
                <span className="eyebrow text-night/42">I nostri servizi</span>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-6">
            <FadeIn delay={0.05}>
              <h2 className="max-w-4xl text-4xl font-heading leading-[0.96] text-night sm:text-5xl lg:text-6xl">
                Quattordici servizi. <span className="italic text-night/58">Una sola regia strategica.</span>
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-3">
            <FadeIn delay={0.12}>
              <p className="max-w-sm text-sm leading-[1.75] text-anthracite/65 lg:text-[15px]">
                Ogni servizio è un punto d’ingresso diretto a competenze integrate, con un unico coordinamento strategico.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
          {serviceCatalog.map((service, i) => {
            const featured = i === 0 || i === 4 || i === 9 || i === 13;
            return (
              <FadeIn key={service.title} delay={i * 0.025}>
                <Link
                  href={service.href}
                  className={`group relative flex min-h-[205px] flex-col justify-between overflow-hidden border p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(9,13,14,.12)] sm:p-6 ${featured ? 'border-night bg-night' : 'border-night/10 bg-paper/90 hover:border-night/25'}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-[3px] ${accents[i % accents.length]}`} />
                  <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full border border-current opacity-[0.055] transition-transform duration-700 group-hover:scale-125" />

                  <div className="flex items-start justify-between gap-4">
                    <span className={`font-heading italic text-2xl ${featured ? 'text-sand' : 'text-mediterranean'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={`grid h-9 w-9 place-items-center border transition-all duration-300 ${featured ? 'border-white/15 text-white/60 group-hover:bg-white group-hover:text-night' : 'border-night/12 text-night/35 group-hover:bg-night group-hover:text-white'}`}>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  <div>
                    <p className={`mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] ${featured ? '!text-white/34' : 'text-night/35'}`}>{service.area}</p>
                    <h3 className={`max-w-[17rem] text-[1.55rem] font-heading leading-[1.02] sm:text-[1.7rem] ${featured ? '!text-white' : 'text-night'}`}>{service.title}</h3>
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
