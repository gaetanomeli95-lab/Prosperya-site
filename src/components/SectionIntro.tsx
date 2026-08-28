'use client';

import { home } from '@/data/content';
import { FadeIn } from './MotionWrapper';

export function SectionIntro() {
  const pillars = [
    ['01', 'Governance', 'Strutture, responsabilità e strumenti per decidere con controllo.'],
    ['02', 'Execution', 'Strategia tradotta in priorità operative, numeri e responsabilità.'],
    ['03', 'Expansion', 'Crescita sostenibile tra Italia, Europa e area mediterranea.'],
  ];

  return (
    <section className="relative overflow-hidden bg-[#EEE9DF] py-24 lg:py-36">
      <div className="absolute left-[-10rem] top-24 h-96 w-96 rounded-full bg-white/60 blur-3xl" />
      <div className="absolute right-[-6rem] bottom-10 h-80 w-80 rounded-full bg-mediterranean/8 blur-3xl" />

      <div className="relative max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-3">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-mediterranean" />
                <span className="eyebrow text-night/45">Il nostro approccio</span>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5">
            <FadeIn delay={0.05}>
              <h2 className="max-w-xl text-4xl sm:text-5xl lg:text-6xl font-heading leading-[0.98] tracking-tight text-night">
                {home.intro.title}
              </h2>
            </FadeIn>
          </div>

          <div className="lg:col-span-4 lg:pt-2">
            <FadeIn delay={0.12}>
              <div className="border-l border-night/15 pl-6 lg:pl-8">
                <p className="text-base lg:text-lg leading-[1.8] text-anthracite/76">
                  {home.intro.text}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="mt-18 lg:mt-24 grid lg:grid-cols-3 gap-5 lg:gap-6">
          {pillars.map(([n, title, text], i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <article className={`group relative min-h-[300px] overflow-hidden border p-7 lg:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-float ${i === 1 ? 'bg-night text-white border-night' : 'bg-paper/90 border-night/10'}`}>
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-current opacity-[0.08]" />
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-current opacity-[0.08]" />
                <div className="flex items-center justify-between">
                  <span className={`font-heading italic text-3xl ${i === 1 ? 'text-sand' : 'text-mediterranean'}`}>{n}</span>
                  <span className={`text-[10px] uppercase tracking-[0.24em] ${i === 1 ? 'text-white/40' : 'text-night/35'}`}>Prosperya</span>
                </div>
                <div className="mt-24 lg:mt-28">
                  <h3 className={`text-3xl font-heading ${i === 1 ? '!text-white' : 'text-night'}`}>{title}</h3>
                  <p className={`mt-4 max-w-sm text-sm leading-relaxed ${i === 1 ? '!text-white/68' : 'text-anthracite/66'}`}>{text}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
