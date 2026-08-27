'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/data/services';

interface Props {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col h-full rounded-sm border border-stone-warm bg-white p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-mediterranean to-mediterranean-light rounded-l-sm" />
      <h3 className="text-xl lg:text-2xl font-heading text-night mb-3">
        {service.title}
      </h3>
      <p className="text-sm lg:text-base text-anthracite/90 leading-relaxed mb-4 flex-grow">
        {service.promise}
      </p>
      <ul className="mb-6 space-y-2">
        {service.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-anthracite/80">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-logo-magenta flex-shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/servizi/${service.slug}/`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-mediterranean group-hover:text-mediterranean-light transition-colors"
      >
        Approfondisci <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.article>
  );
}
