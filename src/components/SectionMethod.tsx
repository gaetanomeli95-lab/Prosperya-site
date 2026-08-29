'use client';

import { methodSteps } from '@/data/services';
import { FadeIn } from './MotionWrapper';

export function SectionMethod() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F10] py-24 text-white lg:py-36">
      <div className="absolute inset-0 prosperya-grid opacity-20" />
      <div className="absolute left-[-8rem] top-24 hidden h-80 w-80 rounded-full bg-mediterranean/10 blur-3xl md:block" />
      <div className="absolute right-[-9rem] bottom-[-6rem] hidden h-[30rem] w-[30rem] rounded-full bg-sand/[0.06] blur-3xl md:block" />

      <div className="section-frame relative">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:gap-20 xl:gap-28">
          <div className="relative z-20 min-w-0 lg:pr-2">
            <FadeIn>
              <div className="lg:sticky lg:top-32">
                <span className="section-kicker-dark">Metodo Prosperya</span>
                <h2 className="mt-7 max-w-[9ch] text-[clamp(3rem,4.6vw,5.5rem)] font-heading leading-[0.92] tracking-[-.04em] !text-white">
                  Dalla diagnosi all’esecuzione.
                </h2>
                <p className="mt-7 max-w-sm text-base leading-[1.8] !text-white/60">
                  Non consegniamo solo documenti. Affianchiamo l’azienda nell’esecuzione, misurando ogni passaggio.
                </p>

                <div className="mt-10 hidden items-center gap-4 lg:flex">
                  <span className="h-px w-12 bg-sand/65" />
                  <span className="text-[9px] font-semibold uppercase tracking-[.22em] !text-white/28">Diagnosis → execution</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="relative z-10 min-w-0 lg:border-l lg:border-white/10 lg:pl-10 xl:pl-14">
            <div className="relative min-w-0">
              <div className="absolute bottom-0 left-[18px] top-0 w-px bg-white/10 sm:left-[22px] lg:left-[27px]" />
              {methodSteps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.06}>
                  <article className="group relative grid min-w-0 grid-cols-[38px_minmax(0,1fr)] gap-5 border-b border-white/10 py-7 first:pt-0 sm:grid-cols-[46px_minmax(0,1fr)] lg:grid-cols-[56px_minmax(0,1fr)] lg:gap-7 lg:py-9 xl:grid-cols-[56px_minmax(0,1fr)_auto] xl:items-center">
                    <div className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-[#0A0F10] text-[11px] font-semibold text-sand transition-all duration-500 group-hover:border-sand group-hover:bg-sand group-hover:text-night sm:h-11 sm:w-11 lg:h-14 lg:w-14 lg:text-sm">
                      0{i + 1}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-2xl font-heading leading-[1.02] !text-white sm:text-3xl lg:text-[2.15rem] xl:text-4xl">{step.title}</h3>
                      <p className="mt-4 max-w-2xl text-sm leading-[1.8] !text-white/55 lg:text-[15px]">{step.description}</p>
                    </div>

                    <span className="hidden whitespace-nowrap text-[9px] font-semibold uppercase tracking-[.18em] !text-white/25 transition-colors group-hover:!text-sand xl:block">Execution layer</span>
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
