'use client';

import { methodSteps } from '@/data/services';
import { FadeIn } from './MotionWrapper';

export function SectionMethod() {
  return (
    <section className="relative overflow-hidden bg-[#172326] py-20 text-white sm:py-24 lg:py-36">
      <div className="absolute inset-0 prosperya-grid opacity-20" />
      <div className="absolute left-[-8rem] top-24 h-80 w-80 rounded-full bg-mediterranean/14 blur-3xl" />
      <div className="absolute bottom-[-6rem] right-[-9rem] h-[30rem] w-[30rem] rounded-full bg-sand/[0.08] blur-3xl" />

      <div className="section-frame relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:gap-20 xl:grid-cols-[minmax(0,.76fr)_minmax(0,1.24fr)] xl:gap-28">
          <div className="min-w-0 lg:pr-2">
            <FadeIn>
              <span className="section-kicker-dark">Metodo Prosperya</span>
              <h2 className="mt-7 max-w-[9.5ch] text-[clamp(2.8rem,5.4vw,6rem)] font-heading leading-[0.94] tracking-[-.04em] !text-white lg:text-[4.35rem] xl:text-[5.15rem] 2xl:text-[5.7rem]">
                Dalla diagnosi all’esecuzione.
              </h2>
              <p className="mt-7 max-w-sm text-base leading-[1.8] !text-white/72">
                Non consegniamo solo documenti. Affianchiamo l’azienda nell’esecuzione, misurando ogni passaggio.
              </p>
            </FadeIn>
          </div>

          <div className="min-w-0 lg:pt-4">
            <div className="relative">
              <div className="absolute bottom-0 left-[18px] top-0 w-px bg-white/14 sm:left-[22px] lg:left-[28px]" />
              {methodSteps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.06}>
                  <article className="group relative grid grid-cols-[38px_1fr] gap-5 border-b border-white/14 py-7 first:pt-0 sm:grid-cols-[46px_1fr] lg:grid-cols-[58px_minmax(0,1fr)_auto] lg:items-center lg:gap-7 lg:py-9">
                    <div className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#172326] text-[11px] font-semibold text-sand transition-all duration-500 group-hover:border-sand group-hover:bg-sand group-hover:text-night sm:h-11 sm:w-11 lg:h-14 lg:w-14 lg:text-sm">
                      0{i + 1}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-2xl font-heading leading-none !text-white sm:text-3xl lg:text-[2.15rem] xl:text-4xl">{step.title}</h3>
                      <p className="mt-4 max-w-2xl text-sm leading-[1.8] !text-white/68 lg:text-[15px]">{step.description}</p>
                    </div>

                    <span className="hidden whitespace-nowrap text-[9px] font-semibold uppercase tracking-[.18em] !text-white/40 transition-colors group-hover:!text-sand xl:block">Execution layer</span>
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
