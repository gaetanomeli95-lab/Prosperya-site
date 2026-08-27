'use client';

import { methodSteps } from '@/data/services';
import { FadeIn } from './MotionWrapper';

export function SectionMethod() {
  return (
    <section className="py-20 lg:py-28 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-night leading-tight mb-5">
              Metodo Prosperya
            </h2>
            <p className="text-lg text-anthracite/90 leading-relaxed">
              Non consegniamo solo documenti. Affianchiamo l’azienda nell’esecuzione, misurando ogni passaggio.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {methodSteps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.1}>
              <div className="relative p-6 lg:p-8 bg-white border border-stone-warm rounded-sm h-full">
                <span className="absolute -top-3 left-6 inline-flex items-center justify-center w-8 h-8 rounded-full bg-night text-white text-sm font-semibold">
                  {i + 1}
                </span>
                <h3 className="text-lg lg:text-xl font-heading text-night mb-3 mt-2">{step.title}</h3>
                <p className="text-sm text-anthracite/80 leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
