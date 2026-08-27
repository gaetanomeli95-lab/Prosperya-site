'use client';

import { home } from '@/data/content';
import { FadeIn } from './MotionWrapper';

export function SectionIntro() {
  return (
    <section className="py-20 lg:py-28 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-night leading-tight">
                {home.intro.title}
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <FadeIn delay={0.15}>
              <p className="text-lg lg:text-xl text-anthracite leading-relaxed">
                {home.intro.text}
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
