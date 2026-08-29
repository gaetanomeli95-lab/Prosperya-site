'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { operations } from '@/data/services';
import { FadeIn } from './MotionWrapper';

const nodeColors = [
  '#C81A69',
  '#1976D2',
  '#4CAF50',
  '#F2C94C',
  '#FF7F2A',
  '#76A0A5',
  '#D84A13',
];

const desktopNodes = [
  { top: '7%', left: '5%', width: '24rem', x: 18, y: 16 },
  { top: '5%', left: '72%', width: '21rem', x: 82, y: 14 },
  { top: '36%', left: '1%', width: '22rem', x: 15, y: 46 },
  { top: '37%', left: '75%', width: '20rem', x: 84, y: 47 },
  { top: '70%', left: '7%', width: '22rem', x: 20, y: 78 },
  { top: '78%', left: '40%', width: '22rem', x: 50, y: 88 },
  { top: '70%', left: '75%', width: '20rem', x: 84, y: 79 },
];

export function SectionOperations() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeLabel = activeIndex === null ? null : operations[activeIndex];

  return (
    <section className="relative overflow-hidden bg-[#090D0E] py-24 text-white lg:py-40">
      <div className="absolute inset-0 prosperya-grid opacity-16" />
      <div className="absolute right-[-12rem] top-[-9rem] hidden h-[38rem] w-[38rem] rounded-full bg-mediterranean/[0.08] blur-3xl md:block" />
      <div className="absolute bottom-[-10rem] left-[-10rem] hidden h-[28rem] w-[28rem] rounded-full bg-sand/[0.04] blur-3xl md:block" />

      <div className="section-frame relative">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-12 lg:items-end lg:gap-14 lg:pb-14">
          <div className="lg:col-span-7">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-sand" />
                <span className="eyebrow !text-white/42">Corporate & extraordinary</span>
              </div>
              <h2 className="mt-6 max-w-5xl text-[clamp(3rem,5.5vw,6.5rem)] font-heading leading-[0.89] tracking-[-.045em] !text-white">
                Operazioni straordinarie. <span className="italic !text-white/50">Una regia unica.</span>
              </h2>
            </FadeIn>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <FadeIn delay={0.08}>
              <p className="max-w-xl text-[15px] leading-[1.85] !text-white/58 sm:text-base">
                Gestiamo con precisione pratiche delicate come NewCo (start-up), affitto di ramo d’azienda, spin-off, joint venture, capitale e agreement. Curiamo la stesura di patti parasociali, statuti e atti costitutivi.
              </p>
              <div className="mt-6 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.22em] !text-white/28">
                <span>7 operazioni</span>
                <span className="h-px flex-1 bg-white/10" />
                <span>1 coordinamento</span>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="relative mt-12 hidden min-h-[690px] lg:block xl:min-h-[730px]">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {desktopNodes.map((node, i) => (
              <motion.line
                key={i}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke={activeIndex === i ? nodeColors[i] : 'rgba(255,255,255,.10)'}
                strokeWidth={activeIndex === i ? '0.22' : '0.12'}
                strokeDasharray={activeIndex === i ? '0' : '1.2 1.2'}
                vectorEffect="non-scaling-stroke"
                animate={{ opacity: activeIndex === null || activeIndex === i ? 1 : 0.32 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 h-[250px] w-[300px] -translate-x-1/2 -translate-y-1/2 xl:h-[280px] xl:w-[340px]">
            <div className="absolute inset-0 border border-white/12 bg-[#0C1112]/94 shadow-[0_30px_90px_rgba(0,0,0,.28)]" />
            <div className="absolute left-0 top-0 h-7 w-px bg-sand/70" />
            <div className="absolute left-0 top-0 h-px w-7 bg-sand/70" />
            <div className="absolute bottom-0 right-0 h-7 w-px bg-sand/35" />
            <div className="absolute bottom-0 right-0 h-px w-7 bg-sand/35" />
            <div className="absolute inset-[12%] border border-white/[0.055]" />

            <div className="relative flex h-full flex-col justify-between p-7 xl:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[9px] font-semibold uppercase tracking-[.24em] !text-white/30">Prosperya / Regia</span>
                <span className="font-heading italic text-xl text-sand/75">07</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLabel ?? 'default'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  {activeLabel ? (
                    <>
                      <p className="text-[9px] font-semibold uppercase tracking-[.2em] !text-sand/65">
                        {String((activeIndex ?? 0) + 1).padStart(2, '0')} · Operazione
                      </p>
                      <p className="mt-3 text-[2rem] font-heading leading-[.96] !text-white xl:text-[2.35rem]">
                        {activeLabel}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[9px] font-semibold uppercase tracking-[.2em] !text-white/34">Deal architecture</p>
                      <p className="mt-3 text-[2.1rem] font-heading leading-[.96] !text-white xl:text-[2.55rem]">
                        Struttura. <span className="italic !text-white/48">Negoziazione.</span> Coordinamento.
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <p className="text-[10px] uppercase tracking-[.18em] !text-white/24">Muovi il cursore sui nodi</p>
            </div>
          </div>

          {operations.map((op, i) => {
            const node = desktopNodes[i];
            const active = activeIndex === i;
            return (
              <motion.button
                key={op}
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(i)}
                onBlur={() => setActiveIndex(null)}
                className="group absolute z-20 text-left outline-none"
                style={{ top: node.top, left: node.left, width: node.width }}
                animate={{ opacity: activeIndex === null || active ? 1 : 0.42, scale: active ? 1.025 : 1 }}
                transition={{ duration: 0.28 }}
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1.5 flex shrink-0 items-center gap-2">
                    <span className="editorial-index text-lg text-sand/55 transition-colors group-hover:text-sand">{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-2 w-2 rounded-full shadow-[0_0_0_5px_rgba(255,255,255,.025)]" style={{ backgroundColor: nodeColors[i] }} />
                  </span>
                  <span className="max-w-[17rem] text-[1.35rem] font-heading leading-[1.04] !text-white/74 transition-all duration-300 group-hover:translate-x-1 group-hover:!text-white xl:text-[1.55rem]">
                    {op}
                  </span>
                </div>
                <span className="mt-4 block h-px w-12 bg-white/12 transition-all duration-500 group-hover:w-24" style={{ backgroundColor: active ? nodeColors[i] : undefined }} />
              </motion.button>
            );
          })}
        </div>

        <div className="relative mt-12 lg:hidden">
          <div className="absolute bottom-3 left-1/2 top-3 w-px -translate-x-1/2 bg-white/10" />
          <div className="space-y-8">
            {operations.map((op, i) => {
              const left = i % 2 === 0;
              return (
                <FadeIn key={op} delay={i * 0.035}>
                  <div className="relative grid grid-cols-[1fr_44px_1fr] items-center">
                    <div className={left ? 'pr-3 text-right' : 'col-start-3 pl-3 text-left'}>
                      <span className="editorial-index text-base text-sand/55">{String(i + 1).padStart(2, '0')}</span>
                      <p className="mt-1.5 text-[1.2rem] font-heading leading-[1.06] !text-white/84 sm:text-[1.35rem]">{op}</p>
                    </div>
                    <div className="col-start-2 row-start-1 grid place-items-center">
                      <span className="relative z-10 h-3 w-3 rounded-full border-[3px] border-[#090D0E] shadow-[0_0_0_1px_rgba(255,255,255,.12)]" style={{ backgroundColor: nodeColors[i] }} />
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.22}>
            <div className="mx-auto mt-12 max-w-sm border border-white/10 bg-white/[0.025] px-5 py-5 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[.22em] !text-white/28">Prosperya / Deal architecture</p>
              <p className="mt-2 font-heading text-xl !text-white">Sette operazioni. <span className="italic !text-white/48">Una regia.</span></p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
