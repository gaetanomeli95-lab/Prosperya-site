'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/data/services';

interface Props {
  service: Service;
  index: number;
}

const accents = ['bg-logo-magenta','bg-logo-blue','bg-logo-yellow','bg-logo-green','bg-logo-orange','bg-mediterranean'];

export function ServiceCard({ service, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="group relative min-h-[330px] border-t border-night/14 py-6 lg:py-8 flex flex-col"
    >
      <div className="flex items-center justify-between mb-10">
        <span className="font-heading italic text-2xl text-night/35">0{index + 1}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${accents[index % accents.length]} opacity-80`} />
      </div>

      <h3 className="max-w-sm text-2xl lg:text-[2rem] font-heading leading-[1.05] text-night group-hover:text-mediterranean transition-colors">
        {service.title}
      </h3>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-anthracite/70">
        {service.promise}
      </p>

      <div className="mt-auto pt-8 flex items-end justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.18em] text-night/35">Advisory area</p>
        <Link
          href={`/servizi/${service.slug}/`}
          className="grid place-items-center h-11 w-11 border border-night/18 text-night group-hover:bg-night group-hover:text-white transition-all"
          aria-label={`Approfondisci ${service.title}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
}
