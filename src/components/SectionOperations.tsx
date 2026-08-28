'use client';

import { operations } from '@/data/services';
import { FadeIn } from './MotionWrapper';

export function SectionOperations() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#F1ECE4]">
      <div className="absolute left-[-7rem] bottom-[-5rem] h-72 w-72 rounded-full bg-mediterranean/8 blur-3xl" />
      <div className="relative max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 lg:mb-18">
          <div className="lg:col-span-6">
            <FadeIn>
              <span className="eyebrow text-night/42">Corporate & extraordinary</span>
              <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-heading text-night leading-[0.98]">
                Operazioni straordinarie e soluzioni su misura
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <FadeIn delay={0.1}>
              <p className="text-sm lg:text-[15px] leading-relaxed text-anthracite/65">
                Gestiamo con precisione pratiche delicate come NewCo (start-up), affitto di ramo d’azienda, spin-off, joint venture, capitale e agreement. Curiamo la stesura di patti parasociali, statuti e atti costitutivi.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {operations.map((op, i) => (
            <FadeIn key={op} delay={i * 0.035}>
              <div className={`group min-h-[150px] border p-5 flex flex-col justify-between transition-all duration-400 hover:-translate-y-1 hover:shadow-soft ${i === 0 || i === 3 ? 'bg-night border-night' : 'bg-paper border-night/10 hover:border-night/20'}`}>
                <span className={`font-heading italic text-xl ${i === 0 || i === 3 ? 'text-sand' : 'text-mediterranean'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className={`text-sm leading-snug font-medium ${i === 0 || i === 3 ? '!text-white/88' : 'text-night/80'}`}>{op}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
