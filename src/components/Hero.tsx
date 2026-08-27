'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { home } from '@/data/content';

export function Hero() {
  return (
    <section
      className="relative min-h-[85svh] max-h-[100svh] w-full overflow-hidden bg-night"
      aria-label="Hero"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero1.png"
          alt="Professionisti di Prosperya in una boardroom panoramica"
          fill
          className="object-cover object-[60%_40%] lg:object-[70%_30%]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/80 to-transparent lg:from-night/90 lg:via-night/50 lg:to-transparent" />
        <div className="absolute inset-0 bg-night/30 lg:hidden" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 min-h-[85svh] max-h-[100svh] flex flex-col justify-center py-24 lg:py-32">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-mediterranean-light mb-5"
          >
            {home.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-medium text-white leading-[1.1] mb-6"
          >
            {home.hero.h1.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl mb-8"
          >
            {home.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Link
              href="/contatti/"
              className="inline-flex items-center justify-center rounded-sm bg-mediterranean px-6 py-3.5 text-base font-medium text-white hover:bg-mediterranean-light transition-colors focus:outline-none focus:ring-2 focus:ring-logo-yellow focus:ring-offset-2 focus:ring-offset-night"
            >
              {home.hero.ctaPrimary}
            </Link>
            <Link
              href="/servizi/"
              className="inline-flex items-center justify-center rounded-sm border border-white/30 px-6 py-3.5 text-base font-medium text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {home.hero.ctaSecondary}
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-sm text-white/60 tracking-wide"
          >
            {home.hero.location}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
