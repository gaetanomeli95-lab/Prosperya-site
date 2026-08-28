'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { serviceCatalog } from '@/data/services';
import { FadeIn } from './MotionWrapper';

export function SectionServices() {
  return (
    <section id="servizi" className="relative overflow-hidden bg-[#DCD6CB] py-24 lg:py-36">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#EEE9DF] to-transparent" />
      <div className="absolute left-[8%] top-36 h-64 w-64 rounded-full bg-white/35 blur-3xl" />
      <div className="absolute right-[-6rem] bottom-12 h-80 w-80 rounded-full bg-mediterranean/8 blur-3xl" />

      <div className="relative max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-3">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-mediterranean" />
                <span className="eyebrow text-night/42">I nostri servizi</span>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-6">
            <FadeIn delay={0.05}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading leading-[0.98] text-night">
                Quattordici servizi. Una sola regia strategica.
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-3">
            <FadeIn delay={0.12}>
              <p className="text-sm lg:text-[15px] leading-relaxed text-anthracite/68">
                Ogni servizio è direttamente accessibile e collegato all’area di consulenza più pertinente.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {serviceCatalog.map((service, i) => {
            const featured = i % 5 === 0;
            return (
              <FadeIn key={service.title} delay={i * 0.025}>
                <Link
                  href={service.href}
                  className={`group min-h-[150px] border p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${featured ? 'bg-night border-night' : 'bg-paper/90 border-night/10 hover:border-night/20'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={`font-heading italic text-xl ${featured ? 'text-sand' : 'text-mediterranean'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <ArrowUpRight className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${featured ? 'text-white/60' : 'text-night/35'}`} />
                  </div>
                  <div>
                    <p className={`text-[10px] uppercase tracking-[0.16em] mb-2 ${featured ? '!text-white/35' : 'text-night/35'}`}>{service.area}</p>
                    <h3 className={`text-lg sm:text-xl font-heading leading-tight ${featured ? '!text-white' : 'text-night'}`}>{service.title}</h3>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
