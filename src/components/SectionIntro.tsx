'use client';

import { home } from '@/data/content';
import { FadeIn } from './MotionWrapper';

const pillars = [
  ['01', 'Governance', 'Strutture, responsabilità e strumenti per decidere con controllo.'],
  ['02', 'Execution', 'Strategia tradotta in priorità operative, numeri e responsabilità.'],
  ['03', 'Expansion', 'Crescita sostenibile tra Italia, Europa e area mediterranea.'],
];

const accentBars = ['bg-logo-blue', 'bg-logo-yellow', 'bg-logo-green'];

export function SectionIntro() {
  return (
    <section className="relative overflow-hidden bg-[#EEE9DF] py-24 lg:py-40">
      <div className="absolute inset-0 paper-noise opacity-60" />
      <div className="absolute right-[-7rem] top-[-4rem] h-[30rem] w-[30rem] rounded-full bg-white/55 blur-3xl" />
      <div className="absolute bottom-[-11rem] left-[-9rem] h-[30rem] w-[30rem] rounded-full bg-mediterranean/[0.07] blur-3xl" />

      <div className="section-frame relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <FadeIn>
              <div className="sticky top-32">
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
                <h2 className="relative max-w-5xl text-[clamp(3.3rem,6.6vw,7.4rem)] font-heading leading-[0.88] tracking-[-.05em] text-night">
                  {home.intro.title}
                </h2>
              </div>
            </FadeIn>

            <div className="mt-12 grid gap-8 border-t border-night/15 pt-9 lg:grid-cols-[1.18fr_.62fr] lg:gap-20 lg:pt-10">
              <FadeIn delay={0.08}>
                <p className="max-w-3xl text-[clamp(1.2rem,2.15vw,1.9rem)] leading-[1.48] tracking-[-.015em] text-anthracite/85">
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

        <div className="mt-20 lg:mt-28">
          <div className="grid gap-3 lg:grid-cols-3 lg:gap-0 lg:border-y lg:border-night/15">
            {pillars.map(([n, title, text], i) => (
              <FadeIn key={title} delay={i * 0.06}>
                <article className={`group relative flex min-h-[275px] flex-col justify-between overflow-hidden border border-night/10 bg-paper/55 p-6 transition-all duration-500 hover:bg-paper hover:shadow-[0_24px_70px_rgba(9,13,14,.08)] sm:p-7 lg:min-h-[320px] lg:border-y-0 lg:border-r-0 lg:bg-transparent lg:p-8 lg:shadow-none ${i > 0 ? 'lg:border-l lg:border-night/15' : ''}`}>
                  <div className={`absolute left-0 top-0 h-1 w-16 ${accentBars[i]} transition-all duration-500 group-hover:w-full`} />
                  <span className="pointer-events-none absolute -right-2 -top-3 font-heading text-[7rem] italic leading-none text-night/[0.035] transition-all duration-700 group-hover:text-night/[0.055] lg:text-[8.5rem]">{n}</span>

                  <div className="relative flex items-center justify-between gap-5">
                    <span className="editorial-index text-3xl text-mediterranean lg:text-4xl">{n}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-night/15 text-sm text-night/35 transition-all duration-300 group-hover:border-night group-hover:bg-night group-hover:text-white">↗</span>
                  </div>

                  <div className="relative mt-14">
                    <h3 className="text-[2.15rem] font-heading leading-[.95] text-night sm:text-[2.5rem] lg:text-[3rem]">{title}</h3>
                    <p className="mt-5 max-w-sm text-sm leading-[1.8] text-anthracite/65 lg:text-[15px]">{text}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
