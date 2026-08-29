'use client';

import { operations } from '@/data/services';
import { FadeIn } from './MotionWrapper';

const nodeColors = [
  'bg-logo-magenta',
  'bg-logo-blue',
  'bg-logo-green',
  'bg-logo-yellow',
  'bg-logo-orange',
  'bg-mediterranean-light',
  'bg-logo-magenta',
];

export function SectionOperations() {
  return (
    <section className="relative overflow-hidden bg-[#090D0E] py-24 text-white lg:py-40">
      <div className="absolute inset-0 prosperya-grid opacity-20" />
      <div className="absolute right-[-12rem] top-[-10rem] hidden h-[38rem] w-[38rem] rounded-full bg-mediterranean/[0.09] blur-3xl md:block" />
      <div className="absolute bottom-[-12rem] left-[-10rem] hidden h-[30rem] w-[30rem] rounded-full bg-sand/[0.05] blur-3xl md:block" />

      <div className="section-frame relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeIn>
              <div className="lg:sticky lg:top-32">
                <div className="flex items-center gap-3">
                  <span className="h-px w-9 bg-sand" />
                  <span className="eyebrow !text-white/42">Corporate & extraordinary</span>
                </div>

                <div className="relative mt-7">
                  <span className="pointer-events-none absolute -left-2 -top-10 hidden font-heading text-[12rem] italic leading-none text-white/[0.025] xl:block">
                    07
                  </span>
                  <h2 className="relative max-w-[760px] text-[clamp(3rem,5.2vw,6.2rem)] font-heading leading-[0.9] tracking-[-.045em] !text-white">
                    Operazioni straordinarie e <span className="italic !text-white/52">soluzioni su misura</span>
                  </h2>
                </div>

                <p className="mt-8 max-w-xl text-[15px] leading-[1.85] !text-white/58 sm:text-base lg:mt-10">
                  Gestiamo con precisione pratiche delicate come NewCo (start-up), affitto di ramo d’azienda, spin-off, joint venture, capitale e agreement. Curiamo la stesura di patti parasociali, statuti e atti costitutivi.
                </p>

                <div className="mt-10 hidden items-center gap-4 border-t border-white/10 pt-5 lg:flex">
                  <span className="text-[9px] font-semibold uppercase tracking-[.24em] !text-white/28">Deal architecture</span>
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="font-heading italic text-sm text-sand/70">01 — 07</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-t border-white/14">
              {operations.map((op, i) => (
                <FadeIn key={op} delay={i * 0.035}>
                  <div className="group relative grid min-h-[116px] grid-cols-[42px_1fr_auto] items-center gap-4 border-b border-white/10 py-5 transition-colors duration-500 hover:bg-white/[0.025] sm:min-h-[130px] sm:grid-cols-[58px_1fr_auto] sm:gap-6 sm:py-6 lg:min-h-[142px] lg:px-2">
                    <div className="relative flex h-full items-center">
                      <span className="editorial-index text-xl text-sand/55 transition-colors duration-500 group-hover:text-sand sm:text-2xl">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`absolute -left-[1px] top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-125 ${nodeColors[i % nodeColors.length]}`} />
                    </div>

                    <div className="relative overflow-hidden">
                      <span className="pointer-events-none absolute -right-3 top-1/2 -translate-y-1/2 font-heading text-[5rem] italic leading-none text-white/[0.018] transition-all duration-700 group-hover:-translate-x-2 group-hover:text-white/[0.04] sm:text-[6rem]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="relative max-w-[34rem] text-[clamp(1.25rem,2.2vw,2.05rem)] font-heading leading-[1.02] !text-white/82 transition-all duration-500 group-hover:translate-x-1 group-hover:!text-white">
                        {op}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pl-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${nodeColors[i % nodeColors.length]}`} />
                      <span className="hidden h-px w-8 origin-right bg-white/20 transition-all duration-500 group-hover:w-12 group-hover:bg-sand/55 sm:block" />
                    </div>

                    <div className={`absolute bottom-[-1px] left-0 h-px w-0 transition-all duration-700 group-hover:w-full ${nodeColors[i % nodeColors.length]}`} />
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.22}>
              <div className="mt-6 flex items-center justify-between gap-5 border border-white/10 px-5 py-4 sm:px-6">
                <p className="max-w-lg text-[10px] uppercase tracking-[.18em] !text-white/32">
                  Struttura · Negoziazione · Coordinamento
                </p>
                <span className="shrink-0 font-heading italic text-lg text-sand/75">Prosperya</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
