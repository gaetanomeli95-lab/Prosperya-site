'use client';

import { home } from '@/data/content';
import { FadeIn } from './MotionWrapper';

const accents = ['bg-logo-yellow', 'bg-logo-green', 'bg-logo-blue', 'bg-logo-magenta'];

export function SectionPositioning() {
  return (
    <section className="relative overflow-hidden border-y border-white/12 bg-[#1E2D30] text-white">
      <div className="absolute inset-0 prosperya-grid opacity-15" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand/45 to-transparent" />
      <div className="absolute right-[-10rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-mediterranean/15 blur-3xl" />

      <div className="section-frame relative py-9 sm:py-12 lg:py-0">
        <div className="relative grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[56px] hidden h-px bg-gradient-to-r from-transparent via-white/18 to-transparent lg:block" />

          {home.positioning.map((item, i) => (
            <FadeIn key={item} delay={i * 0.05}>
              <article className={`group relative min-h-[170px] overflow-hidden px-1 py-6 sm:min-h-[205px] sm:px-6 sm:py-7 lg:min-h-[230px] lg:px-8 lg:py-10 ${i > 0 ? 'sm:border-l sm:border-white/12' : ''} ${i > 1 ? 'border-t border-white/12 sm:border-t-0' : i === 1 ? 'border-t border-white/12 sm:border-t-0' : ''}`}>
                <span className="pointer-events-none absolute -right-3 -top-4 font-heading text-[7rem] italic leading-none text-white/[0.035] transition-all duration-700 group-hover:text-white/[0.06] lg:text-[8rem]">0{i + 1}</span>

                <div className="relative flex items-center gap-4">
                  <span className={`h-2.5 w-2.5 rounded-full ${accents[i]} shadow-[0_0_0_5px_rgba(255,255,255,.045)] transition-transform duration-500 group-hover:scale-125`} />
                  <span className="editorial-index text-3xl text-sand/90 lg:text-4xl">0{i + 1}</span>
                </div>

                <div className="relative mt-8 border-t border-white/14 pt-5 sm:mt-10 lg:mt-12 lg:pt-6">
                  <p className="max-w-[18rem] text-[15px] font-medium leading-[1.65] !text-white/90 lg:text-base">{item}</p>
                </div>

                <div className={`absolute bottom-0 left-0 h-[3px] w-0 ${accents[i]} transition-all duration-700 group-hover:w-full`} />
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
