'use client';

import { methodSteps } from '@/data/services';
import { FadeIn } from './MotionWrapper';

export function SectionMethod() {
  return (
    <section className="relative overflow-hidden bg-[#0B1011] py-24 lg:py-36 text-white">
      <div className="absolute left-[-8rem] top-20 h-80 w-80 rounded-full bg-mediterranean/10 blur-3xl" />
      <div className="absolute right-[-6rem] bottom-0 h-72 w-72 rounded-full bg-sand/8 blur-3xl" />
      <div className="relative max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <FadeIn>
              <span className="eyebrow !text-white/38">Metodo Prosperya</span>
              <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-heading leading-[0.98] !text-white">
                Dalla diagnosi all’esecuzione.
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed !text-white/58">
                Non consegniamo solo documenti. Affianchiamo l’azienda nell’esecuzione, misurando ogni passaggio.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4 lg:gap-5">
            {methodSteps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.07}>
                <article className="group relative min-h-[240px] border border-white/10 bg-white/[0.035] p-6 lg:p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <span className="font-heading italic text-3xl text-sand">0{i + 1}</span>
                    <span className="h-2 w-2 rounded-full bg-white/20 group-hover:bg-sand transition-colors" />
                  </div>
                  <div className="mt-16">
                    <h3 className="text-xl lg:text-2xl font-heading !text-white">{step.title}</h3>
                    <p className="mt-4 text-sm lg:text-[15px] leading-relaxed !text-white/55">{step.description}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
