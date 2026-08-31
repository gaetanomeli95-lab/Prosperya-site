'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { home } from '@/data/content';
import { MapNetwork } from './MapNetwork';
import { FadeIn } from './MotionWrapper';

const regions = [
  ['01', 'Europa occidentale', 'Italia · Paesi Bassi · Francia · Germania · Spagna'],
  ['02', 'Europa orientale', 'Romania · Bulgaria'],
  ['03', 'Mediterraneo', 'Tunisia · Area magrebina'],
];

export function SectionInternational() {
  return (
    <section className="relative overflow-hidden bg-[#1A292C] py-20 text-white sm:py-24 lg:py-36">
      <div className="absolute inset-0 prosperya-grid opacity-20" />
      <div className="absolute right-[-12rem] top-[-8rem] h-[38rem] w-[38rem] rounded-full bg-mediterranean/15 blur-3xl" />

      <div className="section-frame relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <FadeIn>
              <span className="section-kicker-dark">Cross-border advisory</span>
              <h2 className="mt-7 max-w-2xl text-[clamp(2.8rem,5.5vw,6.4rem)] font-heading leading-[0.94] tracking-[-.04em] !text-white">{home.international.title}</h2>
              <p className="mt-7 max-w-lg text-base leading-[1.8] !text-white/72 lg:text-lg">{home.international.text}</p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="mt-10 border-y border-white/15">
                {regions.map(([n, label, places]) => (
                  <div key={label} className="group grid grid-cols-[42px_1fr] gap-4 border-b border-white/15 py-5 last:border-b-0">
                    <span className="editorial-index text-xl text-sand/80">{n}</span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[.18em] !text-white/55">{label}</p>
                      <p className="mt-2 text-sm leading-relaxed !text-white/82">{places}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/internazionalizzazione/" className="group mt-8 inline-flex min-h-11 items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] !text-white/80 transition-colors hover:!text-white">
                Esplora il network
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition-all group-hover:border-sand group-hover:bg-sand group-hover:!text-night"><ArrowUpRight className="h-3.5 w-3.5" /></span>
              </Link>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <FadeIn delay={0.12}>
              <div className="relative overflow-hidden border-y border-white/15 bg-white/[0.035] px-0 py-5 shadow-[0_30px_100px_rgba(0,0,0,.14)] sm:border sm:bg-white/[0.055] sm:p-7 lg:p-10">
                <div className="absolute inset-x-0 top-0 h-px hairline-light" />
                <div className="mb-3 flex items-end justify-between gap-4 px-1 sm:mb-7 sm:px-0">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[.22em] !text-white/50">Operating network</p>
                    <p className="mt-2 font-heading text-2xl !text-white sm:text-3xl">Sicilia come hub</p>
                  </div>
                  <span className="hidden text-[9px] font-semibold uppercase tracking-[.18em] !text-sand/80 sm:block">Europe · Mediterranean</span>
                </div>
                <MapNetwork />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
