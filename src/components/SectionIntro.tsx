'use client';

import Link from 'next/link';
import { home } from '@/data/content';
import { FadeIn } from './MotionWrapper';

const pillars = [
  {
    n: '01',
    title: 'Governance',
    text: 'Strutture, responsabilità e strumenti per decidere con controllo.',
    href: '/servizi/governance-e-controllo/',
    action: 'Esplora governance e controllo',
    color: '#1976D2',
  },
  {
    n: '02',
    title: 'Execution',
    text: 'Strategia tradotta in priorità operative, numeri e responsabilità.',
    href: '/servizi/strategia-e-crescita/',
    action: 'Scopri sviluppo e risorse',
    color: '#F2C94C',
  },
  {
    n: '03',
    title: 'Expansion',
    text: 'Crescita sostenibile tra Italia, Europa e area mediterranea.',
    href: '/internazionalizzazione/',
    action: 'Esplora l’internazionalizzazione',
    color: '#4CAF50',
  },
];

const brandDots = ['#F2C94C', '#4CAF50', '#1976D2', '#C81A69', '#FF7F2A'];

export function SectionIntro() {
  return (
    <section className="relative overflow-hidden bg-[#E4DDD1] py-20 sm:py-24 lg:py-36">
      <div className="absolute inset-0 paper-noise opacity-55" />
      <div className="absolute right-[-7rem] top-[-4rem] h-[30rem] w-[30rem] rounded-full bg-white/45 blur-3xl" />
      <div className="absolute bottom-[-11rem] left-[-9rem] h-[30rem] w-[30rem] rounded-full bg-mediterranean/[0.10] blur-3xl" />

      <div className="section-frame relative">
        <div className="overflow-hidden border border-night/10 bg-[#F0EADF] shadow-[0_28px_90px_rgba(9,13,14,.08)]">
          <div className="grid lg:grid-cols-[.33fr_.67fr]">
            <div className="relative overflow-hidden bg-[linear-gradient(155deg,#1A2D30_0%,#142326_100%)] p-7 text-white sm:p-9 lg:p-10 xl:p-12">
              <div className="absolute inset-0 prosperya-grid opacity-18" />
              <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-mediterranean/18 blur-3xl" />
              <div className="relative">
                <span className="section-kicker-dark">Il nostro approccio</span>
                <p className="mt-9 text-[10px] font-semibold uppercase tracking-[.22em] !text-white/35">Prosperya / Manifesto</p>
                <div className="mt-8 flex gap-2">
                  {brandDots.map((color) => <span key={color} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />)}
                </div>
                <span className="mt-12 block font-heading text-[9rem] italic leading-none !text-white/[0.08] lg:text-[12rem]">P</span>
              </div>
            </div>

            <div className="p-7 sm:p-9 lg:p-12 xl:p-14">
              <FadeIn>
                <h2 className="max-w-5xl text-[clamp(3rem,6.2vw,7rem)] font-heading leading-[0.9] tracking-[-.05em] text-night">
                  {home.intro.title}
                </h2>
              </FadeIn>

              <div className="mt-10 grid gap-8 border-t border-night/15 pt-8 lg:grid-cols-[1.18fr_.62fr] lg:gap-16 lg:pt-10">
                <FadeIn delay={0.08}>
                  <p className="max-w-3xl text-[clamp(1.15rem,2vw,1.8rem)] leading-[1.52] tracking-[-.015em] text-anthracite/88">
                    {home.intro.text}
                  </p>
                </FadeIn>

                <FadeIn delay={0.12}>
                  <div className="relative border-l-2 border-mediterranean/60 pl-6 lg:pl-8">
                    <p className="max-w-md text-sm leading-[1.85] text-night/68 lg:text-[15px]">
                      Una regia unica permette di leggere insieme struttura, numeri, persone e mercati. Il valore non è nel singolo intervento, ma nella coerenza tra le decisioni.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12">
          <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.06}>
                <Link
                  href={pillar.href}
                  aria-label={`${pillar.action}: ${pillar.title}`}
                  className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden border border-night/12 bg-[#F7F2E9] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-night/22 hover:shadow-[0_24px_70px_rgba(9,13,14,.10)] sm:min-h-[285px] sm:p-7 lg:min-h-[315px] lg:p-8"
                >
                  <div className="absolute left-0 top-0 h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${pillar.color}, transparent 72%)` }} />
                  <span className="pointer-events-none absolute -right-2 -top-3 font-heading text-[7rem] italic leading-none text-night/[0.04] transition-all duration-700 group-hover:text-night/[0.07] lg:text-[8.5rem]">{pillar.n}</span>

                  <div className="relative flex items-center justify-between gap-5">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full shadow-[0_0_0_5px_rgba(9,13,14,.035)]" style={{ backgroundColor: pillar.color }} />
                      <span className="editorial-index text-3xl text-mediterranean lg:text-4xl">{pillar.n}</span>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-night/15 text-sm text-night/45 transition-all duration-300 group-hover:border-night group-hover:bg-night group-hover:text-white">↗</span>
                  </div>

                  <div className="relative mt-12 sm:mt-14">
                    <h3 className="text-[2.15rem] font-heading leading-[.95] text-night sm:text-[2.5rem] lg:text-[3rem]">{pillar.title}</h3>
                    <p className="mt-5 max-w-sm text-sm leading-[1.8] text-anthracite/68 lg:text-[15px]">{pillar.text}</p>
                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-night/10 pt-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-night/52 transition-colors group-hover:text-night sm:text-[11px]">{pillar.action}</span>
                      <span className="text-night/35 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
