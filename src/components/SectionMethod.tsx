'use client';

import { methodSteps } from '@/data/services';
import { FadeIn } from './MotionWrapper';

export function SectionMethod() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F10] py-24 text-white lg:py-36">
      <div className="absolute inset-0 prosperya-grid opacity-20" />
      <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-mediterranean/10 blur-3xl" />
      <div className="absolute right-[-9rem] bottom-[-6rem] h-[30rem] w-[30rem] rounded-full bg-sand/[0.06] blur-3xl" />

      <div className="section-frame relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <FadeIn>
              <span className="section-kicker-dark">Metodo Prosperya</span>
              <h2 className="mt-7 max-w-xl text-[clamp(3rem,5.4vw,6rem)] font-heading leading-[0.92] tracking-[-.04em] !text-white">
                Dalla diagnosi all’esecuzione.
              </h2>
              <p className="mt-7 max-w-sm text-base leading-[1.8] !text-white/60">
                Non consegniamo solo documenti. Affianchiamo l’azienda nell’esecuzione, misurando ogni passaggio.
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-8 lg:pt-4">
            <div className="relative">
              <div className="absolute bottom-0 left-[18px] top-0 w-px bg-white/10 sm:left-[22px] lg:left-[28px]" />
              {methodSteps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.06}>
                  <article className="group relative grid grid-cols-[38px_1fr] gap-5 border-b border-white/10 py-7 first:pt-0 sm:grid-cols-[46px_1fr] lg:grid-cols-[58px_1fr_auto] lg:items-center lg:gap-7 lg:py-9">
                    <div className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-[#0A0F10] text-[11px] font-semibold text-sand transition-all duration-500 group-hover:border-sand group-hover:bg-sand group-hover:text-night sm:h-11 sm:w-11 lg:h-14 lg:w-14 lg:text-sm">
                      0{i + 1}
                    </div>

                    <div>
                      <h3 className="text-2xl font-heading leading-none !text-white sm:text-3xl lg:text-4xl">{step.title}</h3>
                      <p className="mt-4 max-w-2xl text-sm leading-[1.8] !text-white/55 lg:text-[15px]">{step.description}</p>
                    </div>

                    <span className="hidden text-[9px] font-semibold uppercase tracking-[.18em] !text-white/25 transition-colors group-hover:!text-sand lg:block">Execution layer</span>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
