'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { home } from '@/data/content';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-night text-white" aria-label="Hero">
      <div className="absolute inset-0">
        <Image
          src="/images/hero1.png"
          alt="Professionisti di Prosperya in una boardroom panoramica"
          fill
          className="object-cover object-[69%_42%] sm:object-[66%_42%] lg:object-[68%_38%] scale-[1.01]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,13,14,.98)_0%,rgba(9,13,14,.94)_42%,rgba(9,13,14,.58)_68%,rgba(9,13,14,.26)_100%)] sm:bg-[linear-gradient(90deg,rgba(9,13,14,.97)_0%,rgba(9,13,14,.88)_34%,rgba(9,13,14,.48)_58%,rgba(9,13,14,.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,13,14,.22)_0%,rgba(9,13,14,.06)_50%,rgba(9,13,14,.84)_100%)]" />
        <div className="absolute inset-0 prosperya-grid opacity-40 sm:opacity-60" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1480px] flex-col justify-end px-5 pb-7 pt-28 sm:px-6 sm:pb-9 sm:pt-32 lg:justify-center lg:px-8 lg:pb-14 lg:pt-32">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="mb-5 flex items-center gap-3 sm:mb-7"
            >
              <span className="h-px w-8 shrink-0 bg-sand" />
              <p className="eyebrow max-w-[15rem] !text-white/64 sm:max-w-none">{home.hero.eyebrow}</p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="max-w-[940px] text-[clamp(2.7rem,13vw,4.9rem)] font-heading font-medium leading-[0.9] tracking-tighter2 !text-white sm:text-[clamp(3.3rem,8.7vw,6rem)] lg:text-[clamp(4.2rem,7.2vw,7.7rem)]"
            >
              Governare meglio.
              <span className="mt-2 block italic !text-white/72">Crescere con metodo.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
              className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:mt-10 lg:gap-7"
            >
              <p className="max-w-xl text-[15px] leading-relaxed !text-white/72 sm:text-[17px] lg:text-lg">
                {home.hero.description}
              </p>
              <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:items-end">
                <Link href="/contatti/" className="group inline-flex min-h-12 w-full items-center justify-center gap-2 bg-white px-5 py-3.5 text-sm font-semibold !text-night transition-colors hover:bg-sand sm:w-auto">
                  {home.hero.ctaPrimary}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link href="/servizi/" className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-white/15 px-4 py-2 text-sm font-medium !text-white/78 transition-colors hover:bg-white/5 hover:!text-white sm:w-auto sm:border-0 sm:px-1 sm:justify-end">
                  Esplora le aree <ArrowDownRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.35 }}
            className="hidden border-l border-white/18 pb-1 pl-7 lg:col-span-5 lg:block xl:col-span-4 xl:col-start-9"
          >
            <p className="eyebrow mb-5 !text-white/38">Decisioni complesse, rese governabili</p>
            <div className="space-y-5">
              {home.positioning.slice(0, 3).map((item, i) => (
                <div key={item} className="grid grid-cols-[30px_1fr] items-start gap-3">
                  <span className="font-heading italic text-lg text-sand/80">0{i + 1}</span>
                  <p className="text-sm leading-relaxed !text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-7 flex items-center justify-between border-t border-white/14 pt-3 text-[9px] uppercase tracking-[0.16em] !text-white/42 sm:mt-10 sm:pt-4 sm:text-xs sm:tracking-[0.2em] lg:absolute lg:bottom-8 lg:left-8 lg:right-8 xl:left-[calc((100vw-1480px)/2+2rem)] xl:right-[calc((100vw-1480px)/2+2rem)]"
        >
          <span>{home.hero.location}</span>
          <span className="hidden sm:inline">Prosperya S.R.L. · Business Advisory</span>
        </motion.div>
      </div>
    </section>
  );
}
