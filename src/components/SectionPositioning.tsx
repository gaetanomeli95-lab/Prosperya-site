'use client';

import { home } from '@/data/content';
import { FadeIn } from './MotionWrapper';

export function SectionPositioning() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#0A0F10] text-white">
      <div className="absolute inset-0 prosperya-grid opacity-20" />
      <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 hairline-light" />

      <div className="section-frame relative py-8 sm:py-10 lg:py-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {home.positioning.map((item, i) => (
            <FadeIn key={item} delay={i * 0.05}>
              <div className={`group relative min-h-[170px] py-7 sm:px-6 lg:min-h-[210px] lg:px-7 lg:py-9 ${i > 0 ? 'sm:border-l sm:border-white/10' : ''} ${i > 1 ? 'border-t border-white/10 sm:border-t-0' : i === 1 ? 'border-t border-white/10 sm:border-t-0' : ''}`}>
                <div className="flex items-start justify-between gap-6">
                  <span className="editorial-index text-3xl text-sand/80 lg:text-4xl">0{i + 1}</span>
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-500 group-hover:scale-150 group-hover:bg-sand" />
                </div>

                <p className="mt-12 max-w-[18rem] text-[15px] font-medium leading-[1.65] !text-white/80 lg:mt-14 lg:text-base">
                  {item}
                </p>

                <div className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-sand/70 transition-transform duration-500 group-hover:scale-x-100 lg:inset-x-7" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
