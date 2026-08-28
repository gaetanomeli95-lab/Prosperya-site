'use client';

import { operations } from '@/data/services';
import { FadeIn } from './MotionWrapper';

export function SectionOperations() {
  return (
    <section className="relative overflow-hidden bg-[#F1ECE4] py-24 lg:py-32">
      <div className="absolute bottom-[-5rem] left-[-7rem] h-72 w-72 rounded-full bg-mediterranean/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-6 lg:px-8">
        <div className="mb-14 grid items-end gap-8 lg:mb-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <FadeIn>
              <span className="eyebrow text-night/50">Corporate & extraordinary</span>
              <h2 className="mt-5 text-4xl font-heading leading-[0.98] text-night sm:text-5xl lg:text-6xl">
                Operazioni straordinarie e soluzioni su misura
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <FadeIn delay={0.1}>
              <p className="text-sm leading-relaxed text-anthracite/70 lg:text-[15px]">
                Gestiamo con precisione pratiche delicate come NewCo (start-up), affitto di ramo d’azienda, spin-off, joint venture, capitale e agreement. Curiamo la stesura di patti parasociali, statuti e atti costitutivi.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {operations.map((op, i) => {
            const dark = i === 0 || i === 3;
            return (
              <FadeIn key={op} delay={i * 0.035}>
                <div className={`group relative flex min-h-[170px] flex-col justify-between overflow-hidden border p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft ${dark ? 'dark-surface border-night bg-night' : 'border-night/10 bg-paper hover:border-night/20'}`}>
                  <div className={`absolute inset-x-0 top-0 h-[2px] ${i % 2 === 0 ? 'bg-logo-magenta' : 'bg-mediterranean-light'}`} />
                  <span className={`font-heading italic text-xl ${dark ? 'text-sand' : 'text-mediterranean'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`max-w-[15rem] text-sm font-medium leading-snug ${dark ? '!text-white/80' : 'text-night/80'}`}>{op}</span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
