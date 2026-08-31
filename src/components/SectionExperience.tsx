'use client';

import { home } from '@/data/content';
import { FadeIn } from './MotionWrapper';

const items = ['Esperienza', 'Controllo', 'Internazionalità', 'Dinamismo'];
const dots = ['bg-logo-yellow', 'bg-logo-blue', 'bg-logo-green', 'bg-logo-magenta'];

export function SectionExperience() {
  return (
    <section className="relative overflow-hidden bg-[#DDD5C8] py-24 lg:py-36">
      <div className="absolute inset-0 paper-noise opacity-50" />
      <div className="absolute right-[-8rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-white/38 blur-3xl" />
      <div className="section-frame relative">
        <div className="grid overflow-hidden border border-night/10 bg-[#EEE8DE] shadow-[0_24px_80px_rgba(9,13,14,.07)] lg:grid-cols-12">
          <div className="relative overflow-hidden bg-[#1C3134] p-7 text-white sm:p-9 lg:col-span-5 lg:p-12">
            <div className="absolute inset-0 prosperya-grid opacity-16" />
            <div className="relative">
              <FadeIn>
                <span className="section-kicker-dark">Il team</span>
                <h2 className="mt-7 max-w-2xl text-[clamp(3rem,5.5vw,6.2rem)] font-heading leading-[0.92] tracking-[-.04em] !text-white">{home.experience.title}</h2>
              </FadeIn>
            </div>
          </div>
          <div className="p-7 sm:p-9 lg:col-span-7 lg:flex lg:items-center lg:p-12">
            <FadeIn delay={0.08}>
              <p className="max-w-3xl text-[clamp(1.2rem,2vw,1.65rem)] leading-[1.6] text-anthracite/82">{home.experience.text}</p>
            </FadeIn>
          </div>
        </div>

        <div className="mt-8 grid overflow-hidden border border-night/12 bg-[#F3EEE6] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <FadeIn key={item} delay={i * 0.05}>
              <div className={`group relative min-h-[185px] p-6 lg:min-h-[225px] lg:p-8 ${i > 0 ? 'sm:border-l sm:border-night/10' : ''} ${i > 1 ? 'border-t border-night/10 lg:border-t-0' : i === 1 ? 'border-t border-night/10 sm:border-t-0' : ''}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="editorial-index text-3xl text-mediterranean lg:text-4xl">0{i + 1}</span>
                  <span className={`h-3 w-3 rounded-full ${dots[i]} shadow-[0_0_0_5px_rgba(9,13,14,.035)] transition-transform duration-500 group-hover:scale-125`} />
                </div>
                <p className="mt-14 text-[clamp(1.45rem,2.2vw,2.25rem)] font-heading leading-none text-night lg:mt-20">{item}</p>
                <div className={`absolute bottom-0 left-0 h-[3px] w-0 ${dots[i]} transition-all duration-700 group-hover:w-full`} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
