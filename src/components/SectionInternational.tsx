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
    <section className="relative overflow-hidden bg-[#1D3638] py-20 text-white sm:py-24 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#1B3033_0%,#214346_48%,#245A5B_100%)]" />
      <div className="absolute inset-0 prosperya-grid opacity-[0.18]" />
      <div className="absolute left-[-14rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#4D7F77]/22 blur-[115px]" />
      <div className="absolute right-[-10rem] top-[-6rem] h-[40rem] w-[40rem] rounded-full bg-mediterranean/28 blur-[120px]" />
      <div className="absolute bottom-[-12rem] left-[34%] h-[30rem] w-[30rem] rounded-full bg-[#6E9692]/14 blur-[110px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-mediterranean/40 via-sand/30 to-transparent" />

      <div className="section-frame relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <FadeIn>
              <span className="section-kicker-dark">Cross-border advisory</span>
              <h2 className="mt-7 max-w-2xl text-[clamp(2.8rem,5.5vw,6.4rem)] font-heading leading-[0.94] tracking-[-.04em] !text-white">{home.international.title}</h2>
              <p className="mt-7 max-w-lg text-base leading-[1.8] !text-white/74 lg:text-lg">{home.international.text}</p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="mt-10 border-y border-white/18 bg-black/[0.035] backdrop-blur-[2px]">
                {regions.map(([n, label, places]) => (
                  <div key={label} className="group grid grid-cols-[42px_1fr] gap-4 border-b border-white/15 py-5 last:border-b-0">
                    <span className="editorial-index text-xl text-sand/85 transition-colors group-hover:text-sand">{n}</span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[.18em] !text-white/58">{label}</p>
                      <p className="mt-2 text-sm leading-relaxed !text-white/84">{places}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/internazionalizzazione/" className="group mt-8 inline-flex min-h-11 items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] !text-white/82 transition-colors hover:!text-white">
                Esplora il network
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/22 bg-white/[0.02] transition-all group-hover:border-sand group-hover:bg-sand group-hover:!text-night"><ArrowUpRight className="h-3.5 w-3.5" /></span>
              </Link>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <FadeIn delay={0.12}>
              <div className="relative overflow-hidden border-y border-white/18 bg-[linear-gradient(145deg,rgba(92,149,144,.14),rgba(255,255,255,.045))] px-0 py-5 shadow-[0_34px_110px_rgba(4,18,19,.22)] backdrop-blur-[10px] sm:border sm:p-7 lg:p-10">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-sand/60 via-white/20 to-mediterranean/55" />
                <div className="absolute right-[-5rem] top-[-5rem] h-40 w-40 rounded-full bg-mediterranean/18 blur-3xl" />
                <div className="mb-3 flex items-end justify-between gap-4 px-1 sm:mb-7 sm:px-0">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[.22em] !text-white/52">Operating network</p>
                    <p className="mt-2 font-heading text-2xl !text-white sm:text-3xl">Sicilia come hub</p>
                  </div>
                  <span className="hidden text-[9px] font-semibold uppercase tracking-[.18em] !text-sand/85 sm:block">Europe · Mediterranean</span>
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
