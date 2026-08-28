'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/data/services';
import { useMobilePerformanceMode } from './MotionWrapper';

interface Props {
  service: Service;
  index: number;
}

const accents = ['bg-logo-magenta','bg-logo-blue','bg-logo-yellow','bg-logo-green','bg-logo-orange','bg-mediterranean-light'];

export function ServiceCard({ service, index }: Props) {
  const featured = index === 0 || index === 4;
  const mobile = useMobilePerformanceMode();
  const reduceMotion = useReducedMotion();
  const lightweight = mobile || reduceMotion;

  return (
    <motion.article
      initial={lightweight ? false : { opacity: 0, y: 22 }}
      animate={lightweight ? { opacity: 1, y: 0 } : undefined}
      whileInView={lightweight ? undefined : { opacity: 1, y: 0 }}
      viewport={lightweight ? undefined : { once: true, margin: '-50px' }}
      transition={lightweight ? { duration: 0.01 } : { duration: 0.5, delay: index * 0.045 }}
      className={`group relative flex min-h-[330px] flex-col overflow-hidden border p-6 transition-[transform,box-shadow,border-color] duration-300 sm:min-h-[360px] lg:min-h-[390px] lg:p-8 lg:duration-500 lg:hover:-translate-y-1.5 lg:hover:shadow-float ${featured ? 'bg-night border-night text-white' : 'bg-paper border-night/10 lg:hover:border-night/20'}`}
    >
      <div className={`absolute inset-x-0 top-0 h-[3px] ${accents[index % accents.length]}`} />
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-current opacity-[0.06] lg:transition-transform lg:duration-700 lg:group-hover:scale-110" />
      <div className="absolute -right-9 -top-9 h-24 w-24 rounded-full border border-current opacity-[0.07]" />

      <div className="mb-10 flex items-center justify-between sm:mb-12 lg:mb-14">
        <span className={`font-heading italic text-3xl ${featured ? 'text-sand' : 'text-mediterranean'}`}>0{index + 1}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${accents[index % accents.length]}`} />
      </div>

      <h3 className={`max-w-sm text-[1.7rem] font-heading leading-[1.04] transition-colors lg:text-[2rem] ${featured ? '!text-white' : 'text-night lg:group-hover:text-mediterranean'}`}>
        {service.title}
      </h3>
      <p className={`mt-4 max-w-md text-[14px] leading-relaxed sm:text-[15px] ${featured ? '!text-white/68' : 'text-anthracite/70'}`}>
        {service.promise}
      </p>

      <div className="mt-6 space-y-2.5 sm:mt-7">
        {service.bullets.slice(0, 2).map((bullet) => (
          <div key={bullet} className={`flex items-start gap-3 text-xs leading-relaxed ${featured ? '!text-white/52' : 'text-night/50'}`}>
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accents[index % accents.length]}`} />
            <span>{bullet}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-7 sm:pt-8">
        <p className={`text-[10px] uppercase tracking-[0.18em] ${featured ? '!text-white/30' : 'text-night/35'}`}>Advisory area</p>
        <Link
          href={`/servizi/${service.slug}/`}
          className={`grid h-11 w-11 shrink-0 place-items-center border transition-all sm:h-12 sm:w-12 ${featured ? 'border-white/20 !text-white lg:hover:bg-white lg:hover:!text-night' : 'border-night/18 text-night lg:group-hover:bg-night lg:group-hover:!text-white'}`}
          aria-label={`Approfondisci ${service.title}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
