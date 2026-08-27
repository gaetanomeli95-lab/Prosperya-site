'use client';

import { motion } from 'framer-motion';
import { home } from '@/data/content';

export function SectionPositioning() {
  return (
    <section className="bg-paper border-b border-night/10">
      <div className="max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8 py-9 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-0"
        >
          {home.positioning.map((item, i) => (
            <div key={item} className={`relative lg:px-7 first:lg:pl-0 ${i > 0 ? 'lg:border-l lg:border-night/10' : ''}`}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-heading italic text-xl text-mediterranean">0{i + 1}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-night/35">Prosperya</span>
              </div>
              <p className="max-w-xs text-sm lg:text-[15px] font-medium leading-relaxed text-night/78">{item}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
