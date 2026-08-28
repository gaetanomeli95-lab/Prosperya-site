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
          className="scale-[1.01] object-cover object-[70%_42%] sm:object-[67%_42%] lg:object-[69%_38%]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,13,14,.99)_0%,rgba(9,13,14,.95)_38%,rgba(9,13,14,.66)_64%,rgba(9,13,14,.28)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,13,14,.20)_0%,rgba(9,13,14,.04)_48%,rgba(9,13,14,.88)_100%)]" />
        <div className="absolute inset-0 prosperya-grid opacity-40" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1480px] flex-col justify-end px-5 pb-8 pt-28 sm:px-6 sm:pb-10 sm:pt-32 lg:justify-center lg:px-8 lg:pb-16 lg:pt-32">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
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
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="lg:col-span-5 xl:col-span-4 xl:col-start-9"
          >
            <div className="relative mx-auto w-full max-w-[430px] overflow-hidden border border-white/20 bg-[#EEE8DD]/95 p-5 shadow-[0_28px_90px_rgba(0,0,0,.34)] sm:p-7 lg:ml-auto">
              <div className="absolute inset-0 paper-noise opacity-60" />
              <div className="relative">
                <div className="mb-5 flex items-center justify-between border-b border-night/10 pb-4">
                  <span className="text-[9px] font-semibold uppercase tracking-[.22em] text-night/45">Prosperya identity</span>
                  <span className="font-heading italic text-sm text-mediterranean">Est. Sicilia</span>
                </div>

                <div className="brand-halo relative flex min-h-[245px] items-center justify-center sm:min-h-[285px] lg:min-h-[310px]">
                  <div className="absolute inset-7 rounded-full border border-night/10" />
                  <div className="absolute inset-14 rounded-full border border-night/5" />
                  <Image
                    src="/brand/prosperya-logo.png"
                    alt="Logo Prosperya"
                    width={360}
                    height={360}
                    className="relative z-10 h-auto w-[78%] max-w-[310px] object-contain drop-shadow-[0_18px_35px_rgba(9,13,14,.14)]"
                    priority
                  />
                </div>

                <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-6 border-t border-night/10 pt-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-night/40">Business advisory</p>
                    <p className="mt-2 max-w-[17rem] text-xs leading-[1.6] text-night/60">Governance, crescita, finanza e operazioni complesse sotto un’unica regia.</p>
                  </div>
                  <span className="text-[10px] font-semibold tracking-[.16em] text-night/35">PROSPERYA</span>
                </div>
              </div>
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
