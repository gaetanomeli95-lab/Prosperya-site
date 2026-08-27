'use client';

import { home } from '@/data/content';
import { FadeIn } from './MotionWrapper';

export function SectionExperience() {
  return (
    <section className="py-20 lg:py-28 bg-stone-warm/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <FadeIn>
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-night leading-tight">
                {home.experience.title}
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="lg:col-span-7">
              <p className="text-lg lg:text-xl text-anthracite leading-relaxed">
                {home.experience.text}
              </p>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {['Esperienza', 'Controllo', 'Internazionalità', 'Dinamismo'].map((item) => (
                  <div key={item} className="border-l-2 border-mediterranean pl-4">
                    <span className="text-sm font-semibold text-night">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
