'use client';

import { home } from '@/data/content';
import { FadeIn } from './MotionWrapper';

export function SectionIntro() {
  return (
    <section className="bg-paper py-24 lg:py-36">
      <div className="max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-3">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-mediterranean" />
                <span className="eyebrow text-night/42">Il nostro approccio</span>
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
              <p className="text-base lg:text-lg leading-[1.8] text-anthracite/76">
                {home.intro.text}
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="mt-20 lg:mt-28 border-t border-night/12 pt-8 grid sm:grid-cols-3 gap-8">
          {[
            ['01', 'Governance', 'Strutture, responsabilità e strumenti per decidere con controllo.'],
            ['02', 'Execution', 'Strategia tradotta in priorità operative, numeri e responsabilità.'],
            ['03', 'Expansion', 'Crescita sostenibile tra Italia, Europa e area mediterranea.'],
          ].map(([n, title, text], i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <div className="group max-w-sm">
                <span className="font-heading italic text-2xl text-mediterranean/80">{n}</span>
                <h3 className="mt-4 text-2xl font-heading text-night">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-anthracite/65">{text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
