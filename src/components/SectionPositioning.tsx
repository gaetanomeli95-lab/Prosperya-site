'use client';

import { motion } from 'framer-motion';
import { home } from '@/data/content';

export function SectionPositioning() {
  return (
    <section className="relative overflow-hidden bg-[#0D1213] text-white border-y border-white/8">
      <div className="absolute -top-24 right-[-8%] h-72 w-72 rounded-full bg-mediterranean/10 blur-3xl" />
      <div className="max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {home.positioning.map((item, i) => (
            <div key={item} className="group relative min-h-[150px] overflow-hidden border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.065] hover:border-white/20">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-center justify-between mb-7">
                <span className="font-heading italic text-2xl text-sand">0{i + 1}</span>
                <span className="h-2 w-2 rounded-full bg-white/20 group-hover:bg-sand transition-colors" />
              </div>
              <p className="max-w-[17rem] text-[15px] font-medium leading-relaxed !text-white/88">{item}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
