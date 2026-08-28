'use client';

import { home } from '@/data/content';
import { FadeIn } from './MotionWrapper';

export function SectionExperience() {
  const items = ['Esperienza', 'Controllo', 'Internazionalità', 'Dinamismo'];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#E8E2D8]">
      <div className="absolute right-[-8rem] top-8 h-96 w-96 rounded-full bg-white/40 blur-3xl" />
      <div className="max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <FadeIn>
              <span className="eyebrow text-night/42">Il team</span>
              <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-heading text-night leading-[0.98]">
                {home.experience.title}
              </h2>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn delay={0.12}>
              <div className="bg-paper border border-night/10 p-7 lg:p-10 shadow-soft">
                <p className="text-lg lg:text-xl text-anthracite leading-relaxed">
                  {home.experience.text}
                </p>
                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {items.map((item, i) => (
                    <div key={item} className={`min-h-[120px] border p-4 flex flex-col justify-between ${i === 2 ? 'bg-night border-night' : 'bg-[#F1ECE4] border-night/10'}`}>
                      <span className={`font-heading italic text-xl ${i === 2 ? 'text-sand' : 'text-mediterranean'}`}>0{i + 1}</span>
                      <span className={`text-xs font-semibold uppercase tracking-[0.12em] ${i === 2 ? '!text-white/85' : 'text-night/75'}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
