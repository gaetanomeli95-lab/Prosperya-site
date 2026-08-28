'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/data/services';

interface Props {
  service: Service;
  index: number;
}

const accents = ['bg-logo-magenta','bg-logo-blue','bg-logo-yellow','bg-logo-green','bg-logo-orange','bg-mediterranean-light'];

export function ServiceCard({ service, index }: Props) {
  const featured = index === 0 || index === 4;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className={`group relative min-h-[390px] overflow-hidden border p-7 lg:p-8 flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:shadow-float ${featured ? 'bg-night border-night text-white' : 'bg-paper border-night/10 hover:border-night/20'}`}
    >
      <div className={`absolute inset-x-0 top-0 h-[3px] ${accents[index % accents.length]}`} />
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-current opacity-[0.06] transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute -right-9 -top-9 h-24 w-24 rounded-full border border-current opacity-[0.07]" />

      <div className="flex items-center justify-between mb-14">
        <span className={`font-heading italic text-3xl ${featured ? 'text-sand' : 'text-mediterranean'}`}>0{index + 1}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${accents[index % accents.length]}`} />
      </div>

      <h3 className={`max-w-sm text-2xl lg:text-[2rem] font-heading leading-[1.04] transition-colors ${featured ? '!text-white' : 'text-night group-hover:text-mediterranean'}`}>
        {service.title}
      </h3>
      <p className={`mt-5 max-w-md text-[15px] leading-relaxed ${featured ? '!text-white/68' : 'text-anthracite/70'}`}>
        {service.promise}
      </p>

      <div className="mt-7 space-y-2.5">
        {service.bullets.slice(0, 2).map((bullet) => (
          <div key={bullet} className={`flex items-start gap-3 text-xs leading-relaxed ${featured ? '!text-white/52' : 'text-night/50'}`}>
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${accents[index % accents.length]}`} />
            <span>{bullet}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-8 flex items-end justify-between gap-4">
        <p className={`text-[10px] uppercase tracking-[0.2em] ${featured ? '!text-white/30' : 'text-night/35'}`}>Advisory area</p>
        <Link
          href={`/servizi/${service.slug}/`}
          className={`grid place-items-center h-12 w-12 border transition-all ${featured ? 'border-white/20 !text-white hover:bg-white hover:!text-night' : 'border-night/18 text-night group-hover:bg-night group-hover:!text-white'}`}
          aria-label={`Approfondisci ${service.title}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
}
