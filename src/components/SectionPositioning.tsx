'use client';

import { motion } from 'framer-motion';
import { home } from '@/data/content';
import { Check } from 'lucide-react';

export function SectionPositioning() {
  return (
    <section className="bg-mediterranean text-white py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {home.positioning.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-logo-yellow" aria-hidden="true" />
              <p className="text-sm lg:text-base font-medium leading-snug">{item}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
