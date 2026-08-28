'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { home } from '@/data/content';
import { useMobilePerformanceMode } from './MotionWrapper';

export function SectionPositioning() {
  const mobile = useMobilePerformanceMode();
  const reduceMotion = useReducedMotion();
  const lightweight = mobile || reduceMotion;

  return (
    <section className="relative overflow-hidden bg-[#0D1213] text-white border-y border-white/8">
      <div className="absolute -top-24 right-[-8%] h-72 w-72 rounded-full bg-mediterranean/10 blur-3xl hidden md:block" />
      <div className="max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          initial={lightweight ? false : { opacity: 0, y: 18 }}
          animate={lightweight ? { opacity: 1, y: 0 } : undefined}
          whileInView={lightweight ? undefined : { opacity: 1, y: 0 }}
          viewport={lightweight ? undefined : { once: true, margin: '-40px' }}
          transition={lightweight ? { duration: 0.01 } : { duration: 0.58 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {home.positioning.map((item, i) => (
            <div key={item} className="group relative min-h-[140px] lg:min-h-[150px] overflow-hidden border border-white/10 bg-white/[0.035] p-6 lg:backdrop-blur-sm lg:transition-all lg:duration-500 lg:hover:-translate-y-1 lg:hover:bg-white/[0.065] lg:hover:border-white/20">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand/70 to-transparent opacity-0 lg:transition-opacity lg:group-hover:opacity-100" />
              <div className="flex items-center justify-between mb-7">
                <span className="font-heading italic text-2xl text-sand">0{i + 1}</span>
                <span className="h-2 w-2 rounded-full bg-white/20 lg:group-hover:bg-sand lg:transition-colors" />
              </div>
              <p className="max-w-[17rem] text-[15px] font-medium leading-relaxed !text-white/88">{item}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
