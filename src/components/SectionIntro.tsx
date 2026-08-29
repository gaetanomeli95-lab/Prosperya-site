'use client';

import { home } from '@/data/content';
import { FadeIn } from './MotionWrapper';

const pillars = [
  ['01', 'Governance', 'Strutture, responsabilità e strumenti per decidere con controllo.'],
  ['02', 'Execution', 'Strategia tradotta in priorità operative, numeri e responsabilità.'],
  ['03', 'Expansion', 'Crescita sostenibile tra Italia, Europa e area mediterranea.'],
];

export function SectionIntro() {
  return (
    <section className="relative overflow-hidden bg-[#EEE9DF] py-24 lg:py-36">
      <div className="absolute inset-0 paper-noise opacity-70" />
      <div className="absolute right-[-8rem] top-[-4rem] h-[28rem] w-[28rem] rounded-full bg-white/45 blur-3xl" />

      <div className="section-frame relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-3">
            <FadeIn>
              <span className="section-kicker">Il nostro approccio</span>
            </FadeIn>
          </div>

          <div className="lg:col-span-9">
            <FadeIn delay={0.05}>
              <h2 className="max-w-5xl text-[clamp(3rem,6vw,6.8rem)] font-heading leading-[0.9] tracking-[-.045em] text-night">
                {home.intro.title}
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-10 grid gap-8 border-t border-night/15 pt-8 lg:grid-cols-[1fr_.72fr] lg:items-start lg:gap-16">
                <p className="max-w-3xl text-[clamp(1.15rem,2vw,1.7rem)] leading-[1.55] text-anthracite/80">
                  {home.intro.text}
                </p>
                <p className="max-w-md text-sm leading-[1.8] text-night/55 lg:justify-self-end">
                  Una regia unica permette di leggere insieme struttura, numeri, persone e mercati. Il valore non è nel singolo intervento, ma nella coerenza tra le decisioni.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="mt-20 border-y border-night/15 lg:mt-28">
          {pillars.map(([n, title, text], i) => (
            <FadeIn key={title} delay={i * 0.06}>
              <article className="group grid gap-5 border-b border-night/10 py-7 last:border-b-0 sm:grid-cols-[72px_1fr] lg:grid-cols-[110px_1.1fr_1fr_auto] lg:items-center lg:py-9">
                <span className="editorial-index text-3xl text-mediterranean lg:text-4xl">{n}</span>
                <h3 className="text-3xl font-heading leading-none text-night sm:text-4xl lg:text-5xl">{title}</h3>
                <p className="max-w-xl text-sm leading-[1.75] text-anthracite/65 sm:col-start-2 lg:col-start-auto lg:text-[15px]">{text}</p>
                <span className="hidden h-10 w-10 place-items-center rounded-full border border-night/15 text-night/30 transition-all duration-500 group-hover:border-night group-hover:bg-night group-hover:text-white lg:grid">↗</span>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
