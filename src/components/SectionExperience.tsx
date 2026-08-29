'use client';

import { home } from '@/data/content';
import { FadeIn } from './MotionWrapper';

const items = ['Esperienza', 'Controllo', 'Internazionalità', 'Dinamismo'];

export function SectionExperience() {
  return (
    <section className="relative overflow-hidden bg-[#E7E0D6] py-24 lg:py-36">
      <div className="absolute inset-0 paper-noise opacity-60" />
      <div className="section-frame relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeIn>
              <span className="section-kicker">Il team</span>
              <h2 className="mt-7 max-w-2xl text-[clamp(3rem,5.5vw,6.2rem)] font-heading leading-[0.92] tracking-[-.04em] text-night">{home.experience.title}</h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-7 lg:pt-14">
            <FadeIn delay={0.08}>
              <p className="max-w-3xl text-[clamp(1.2rem,2vw,1.65rem)] leading-[1.6] text-anthracite/80">{home.experience.text}</p>
            </FadeIn>
          </div>
        </div>

        <div className="mt-20 grid border-y border-night/15 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {items.map((item, i) => (
            <FadeIn key={item} delay={i * 0.05}>
              <div className={`group relative min-h-[185px] py-7 sm:px-6 lg:min-h-[225px] lg:px-7 lg:py-9 ${i > 0 ? 'sm:border-l sm:border-night/10' : ''} ${i > 1 ? 'border-t border-night/10 lg:border-t-0' : i === 1 ? 'border-t border-night/10 sm:border-t-0' : ''}`}>
                <span className="editorial-index text-3xl text-mediterranean lg:text-4xl">0{i + 1}</span>
                <div className="absolute right-4 top-8 h-2 w-2 rounded-full bg-night/10 transition-all duration-500 group-hover:scale-150 group-hover:bg-mediterranean sm:right-6 lg:right-7" />
                <p className="mt-16 text-[clamp(1.45rem,2.2vw,2.25rem)] font-heading leading-none text-night lg:mt-20">{item}</p>
                <div className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-mediterranean transition-transform duration-500 group-hover:scale-x-100 sm:left-6 sm:right-6 lg:left-7 lg:right-7" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
