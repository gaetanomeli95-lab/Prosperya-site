'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { home } from '@/data/content';
import { InteractiveBrandMark } from './InteractiveBrandMark';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-night text-white" aria-label="Hero">
      <div className="absolute inset-0">
        <Image
          src="/images/hero1.webp"
          alt="Professionisti di Prosperya in una boardroom panoramica"
          fill
          className="scale-[1.01] object-cover object-[70%_42%] sm:object-[67%_42%] lg:object-[69%_38%]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,13,14,.99)_0%,rgba(9,13,14,.95)_36%,rgba(9,13,14,.70)_62%,rgba(9,13,14,.30)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,13,14,.22)_0%,rgba(9,13,14,.06)_48%,rgba(9,13,14,.88)_100%)]" />
        <div className="absolute inset-0 prosperya-grid opacity-35" />
        <div className="absolute right-[8%] top-[20%] hidden h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(49,95,103,.18),transparent_68%)] blur-3xl lg:block" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1480px] flex-col justify-end px-5 pb-8 pt-28 sm:px-6 sm:pb-10 sm:pt-32 lg:justify-center lg:px-8 lg:pb-16 lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6 xl:gap-10">
          <div className="lg:col-span-7 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="mb-5 flex items-center gap-3 sm:mb-7"
            >
              <span className="h-px w-8 shrink-0 bg-sand" />
              <p className="eyebrow max-w-[16rem] !text-white/70 sm:max-w-none">{home.hero.eyebrow}</p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="max-w-[940px] text-[clamp(2.7rem,13vw,4.9rem)] font-heading font-medium leading-[0.9] tracking-tighter2 !text-white sm:text-[clamp(3.3rem,8.7vw,6rem)] lg:text-[clamp(4.2rem,7.2vw,7.7rem)]"
            >
              Governare meglio.
              <span className="mt-2 block italic !text-white/70">Crescere con metodo.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="mx-auto mt-7 w-full max-w-[360px] sm:max-w-[410px] lg:hidden"
            >
              <InteractiveBrandMark />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
              className="mt-7 grid gap-6 sm:mt-9 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:mt-10"
            >
              <p className="max-w-xl text-[15px] leading-[1.75] !text-white/70 sm:text-[17px] lg:text-lg">
                {home.hero.description}
              </p>
              <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:items-end">
                <Link href="/contatti/" className="group inline-flex min-h-12 w-full items-center justify-center gap-2 bg-white px-5 py-3.5 text-sm font-semibold !text-night transition-colors hover:bg-sand sm:w-auto">
                  {home.hero.ctaPrimary}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link href="/servizi/" className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-white/20 px-4 py-2 text-sm font-medium !text-white/80 transition-colors hover:bg-white/5 hover:!text-white sm:w-auto sm:border-0 sm:px-1 sm:justify-end">
                  Esplora le aree <ArrowDownRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, scale: 0.9, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.22 }}
            className="relative hidden lg:col-span-5 lg:block xl:col-span-5 xl:col-start-8"
          >
            <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
              <div className="absolute inset-[8%] rounded-full border border-white/10" />
              <div className="absolute inset-[18%] rounded-full border border-white/5" />
              <InteractiveBrandMark />
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex items-center justify-between border-t border-white/20 pt-3 text-[9px] uppercase tracking-[0.16em] !text-white/50 sm:mt-10 sm:pt-4 sm:text-xs sm:tracking-[0.2em] lg:absolute lg:bottom-8 lg:left-8 lg:right-8 xl:left-[calc((100vw-1480px)/2+2rem)] xl:right-[calc((100vw-1480px)/2+2rem)]"
        >
          <span>{home.hero.location}</span>
          <span className="hidden sm:inline">Prosperya S.R.L. · Business Advisory</span>
        </motion.div>
      </div>
    </section>
  );
}
