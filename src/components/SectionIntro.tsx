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
  },
  {
    n: '02',
    title: 'Execution',
    text: 'Strategia tradotta in priorità operative, numeri e responsabilità.',
    href: '/servizi/strategia-e-crescita/',
    action: 'Scopri sviluppo e risorse',
  },
  {
    n: '03',
    title: 'Expansion',
    text: 'Crescita sostenibile tra Italia, Europa e area mediterranea.',
    href: '/internazionalizzazione/',
    action: 'Esplora l’internazionalizzazione',
  },
];

const accentBars = ['bg-logo-blue', 'bg-logo-yellow', 'bg-logo-green'];

export function SectionIntro() {
  return (
    <section className="relative overflow-hidden bg-[#EEE9DF] py-20 sm:py-24 lg:py-40">
      <div className="absolute inset-0 paper-noise opacity-60" />
      <div className="absolute right-[-7rem] top-[-4rem] h-[30rem] w-[30rem] rounded-full bg-white/55 blur-3xl" />
      <div className="absolute bottom-[-11rem] left-[-9rem] h-[30rem] w-[30rem] rounded-full bg-mediterranean/[0.07] blur-3xl" />

      <div className="section-frame relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <FadeIn>
              <div className="lg:sticky lg:top-32">
                <span className="section-kicker">Il nostro approccio</span>
                <div className="mt-8 hidden max-w-[150px] lg:block">
                  <div className="h-px bg-night/15" />
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[.2em] text-night/35">Prosperya / Manifesto</p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-9">
            <FadeIn delay={0.04}>
              <div className="relative">
                <span className="pointer-events-none absolute -left-3 -top-16 hidden font-heading text-[11rem] italic leading-none text-night/[0.025] xl:block">P</span>
                <h2 className="relative max-w-5xl text-[clamp(3rem,6.6vw,7.4rem)] font-heading leading-[0.9] tracking-[-.05em] text-night">
                  {home.intro.title}
                </h2>
              </div>
            </FadeIn>

            <div className="mt-10 grid gap-8 border-t border-night/15 pt-8 sm:mt-12 sm:pt-9 lg:grid-cols-[1.18fr_.62fr] lg:gap-20 lg:pt-10">
              <FadeIn delay={0.08}>
                <p className="max-w-3xl text-[clamp(1.15rem,2.15vw,1.9rem)] leading-[1.5] tracking-[-.015em] text-anthracite/85">
                  {home.intro.text}
                </p>
              </FadeIn>

              <FadeIn delay={0.12}>
                <div className="relative border-l border-night/15 pl-6 lg:pl-8">
                  <span className="absolute left-[-1px] top-0 h-16 w-px bg-mediterranean" />
                  <p className="max-w-md text-sm leading-[1.85] text-night/60 lg:text-[15px]">
                    Una regia unica permette di leggere insieme struttura, numeri, persone e mercati. Il valore non è nel singolo intervento, ma nella coerenza tra le decisioni.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-28">
          <div className="grid gap-3 lg:grid-cols-3 lg:gap-0 lg:border-y lg:border-night/15">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.06}>
                <Link
                  href={pillar.href}
                  aria-label={`${pillar.action}: ${pillar.title}`}
                  className={`group relative flex min-h-[250px] flex-col justify-between overflow-hidden border border-night/10 bg-paper/65 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-paper hover:shadow-[0_24px_70px_rgba(9,13,14,.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mediterranean focus-visible:ring-offset-2 active:translate-y-0 sm:min-h-[275px] sm:p-7 lg:min-h-[320px] lg:border-y-0 lg:border-r-0 lg:bg-transparent lg:p-8 lg:shadow-none lg:hover:translate-y-0 ${i > 0 ? 'lg:border-l lg:border-night/15' : ''}`}
                >
                  <div className={`absolute left-0 top-0 h-1 w-16 ${accentBars[i]} transition-all duration-500 group-hover:w-full group-focus-visible:w-full`} />
                  <span className="pointer-events-none absolute -right-2 -top-3 font-heading text-[7rem] italic leading-none text-night/[0.035] transition-all duration-700 group-hover:text-night/[0.055] lg:text-[8.5rem]">{pillar.n}</span>

                  <div className="relative flex items-center justify-between gap-5">
                    <span className="editorial-index text-3xl text-mediterranean lg:text-4xl">{pillar.n}</span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-night/15 text-sm text-night/45 transition-all duration-300 group-hover:border-night group-hover:bg-night group-hover:text-white group-focus-visible:border-night group-focus-visible:bg-night group-focus-visible:text-white">↗</span>
                  </div>

                  <div className="relative mt-12 sm:mt-14">
                    <h3 className="text-[2.15rem] font-heading leading-[.95] text-night sm:text-[2.5rem] lg:text-[3rem]">{pillar.title}</h3>
                    <p className="mt-5 max-w-sm text-sm leading-[1.8] text-anthracite/65 lg:text-[15px]">{pillar.text}</p>
                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-night/10 pt-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-night/50 transition-colors group-hover:text-night group-focus-visible:text-night sm:text-[11px]">{pillar.action}</span>
                      <span className="text-night/35 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span>
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
