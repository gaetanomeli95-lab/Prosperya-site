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
          className="object-cover object-[64%_42%] lg:object-[68%_38%] scale-[1.015]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,13,14,.97)_0%,rgba(9,13,14,.88)_34%,rgba(9,13,14,.48)_58%,rgba(9,13,14,.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,13,14,.16)_0%,rgba(9,13,14,.05)_54%,rgba(9,13,14,.78)_100%)]" />
        <div className="absolute inset-0 prosperya-grid opacity-60" />
      </div>

      <div className="relative z-10 max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8 min-h-[100svh] flex flex-col justify-end lg:justify-center pt-32 pb-10 lg:pb-14">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <div className="lg:col-span-7 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="w-8 h-px bg-sand" />
              <p className="eyebrow text-white/64">{home.hero.eyebrow}</p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="max-w-[940px] text-[clamp(3.3rem,7.2vw,7.7rem)] font-heading font-medium tracking-tighter2 leading-[0.86] text-white"
            >
              Governare meglio.
              <span className="block mt-2 text-white/72 italic">Crescere con metodo.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
              className="mt-8 lg:mt-10 grid sm:grid-cols-[minmax(0,1fr)_auto] gap-7 sm:items-end"
            >
              <p className="max-w-xl text-[15px] sm:text-[17px] lg:text-lg leading-relaxed text-white/72">
                {home.hero.description}
              </p>
              <div className="flex sm:flex-col gap-3 sm:items-end">
                <Link href="/contatti/" className="group inline-flex items-center gap-2 bg-white px-5 py-3.5 text-sm font-semibold text-night hover:bg-sand transition-colors">
                  {home.hero.ctaPrimary}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link href="/servizi/" className="inline-flex items-center gap-2 px-1 py-2 text-sm font-medium text-white/72 hover:text-white transition-colors">
                  Esplora le aree <ArrowDownRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.35 }}
            className="hidden lg:block lg:col-span-5 xl:col-span-4 xl:col-start-9 border-l border-white/18 pl-7 pb-1"
          >
            <p className="eyebrow text-white/38 mb-5">Decisioni complesse, rese governabili</p>
            <div className="space-y-5">
              {home.positioning.slice(0, 3).map((item, i) => (
                <div key={item} className="grid grid-cols-[30px_1fr] gap-3 items-start">
                  <span className="font-heading italic text-lg text-sand/80">0{i + 1}</span>
                  <p className="text-sm leading-relaxed text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 lg:absolute lg:bottom-8 lg:left-8 lg:right-8 xl:left-[calc((100vw-1480px)/2+2rem)] xl:right-[calc((100vw-1480px)/2+2rem)] flex items-center justify-between border-t border-white/14 pt-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/42"
        >
          <span>{home.hero.location}</span>
          <span className="hidden sm:inline">Prosperya S.R.L. · Business Advisory</span>
        </motion.div>
      </div>
    </section>
  );
}
