'use client';

import { operations } from '@/data/services';
import { FadeIn } from './MotionWrapper';

export function SectionOperations() {
  return (
    <section className="py-16 lg:py-20 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-night leading-tight mb-10">
            Operazioni straordinarie
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {operations.map((op, i) => (
            <FadeIn key={op} delay={i * 0.05}>
              <div className="flex items-start gap-3 py-3 border-b border-stone-warm">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-logo-orange flex-shrink-0" />
                <span className="text-sm lg:text-base text-anthracite">{op}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
