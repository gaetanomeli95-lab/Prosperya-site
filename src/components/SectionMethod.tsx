'use client';

import { methodSteps } from '@/data/services';
import { FadeIn } from './MotionWrapper';

export function SectionMethod() {
  return (
    <section className="bg-paper py-24 lg:py-36">
      <div className="max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <FadeIn>
              <span className="eyebrow text-night/42">Metodo Prosperya</span>
              <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-heading leading-[0.98] text-night">
                Dalla diagnosi all’esecuzione.
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-anthracite/68">
                Non consegniamo solo documenti. Affianchiamo l’azienda nell’esecuzione, misurando ogni passaggio.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-night/14">
              {methodSteps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.07}>
                  <div className="grid sm:grid-cols-[72px_220px_1fr] gap-4 sm:gap-8 py-7 lg:py-9 border-b border-night/12 items-start group">
                    <span className="font-heading italic text-2xl text-mediterranean/75">0{i + 1}</span>
                    <h3 className="text-xl lg:text-2xl font-heading text-night group-hover:text-mediterranean transition-colors">{step.title}</h3>
                    <p className="text-sm lg:text-[15px] leading-relaxed text-anthracite/65">{step.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
