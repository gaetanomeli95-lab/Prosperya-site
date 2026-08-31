import Link from 'next/link';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { serviceCatalog } from '@/data/services';
import { cn } from '@/lib/utils';
import { FadeIn } from './MotionWrapper';

const accents = ['#C81A69', '#1976D2', '#F2C94C', '#4CAF50', '#FF7F2A'];
const orbitDots = [
  { x: 50, y: 4 }, { x: 76, y: 13 }, { x: 93, y: 38 }, { x: 89, y: 66 }, { x: 67, y: 88 },
  { x: 39, y: 94 }, { x: 14, y: 78 }, { x: 5, y: 50 }, { x: 15, y: 24 }, { x: 34, y: 9 },
];

interface ServiceCatalogGridProps { compact?: boolean; }

export function ServiceCatalogGrid({ compact = false }: ServiceCatalogGridProps) {
  const remainder = serviceCatalog.length % 3;

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
      {serviceCatalog.map((service, index) => {
        const centerFinalPair = remainder === 2 && index === serviceCatalog.length - 2;
        const price = service.consultationPrice;
        const accent = accents[index % accents.length];

        return (
          <FadeIn key={service.title} delay={index * 0.02} className={cn('h-full lg:col-span-2', centerFinalPair && 'lg:col-start-2')}>
            <Link
              href={service.href}
              className={cn(
                'group relative flex h-full flex-col overflow-hidden border border-night/10 bg-paper transition-all duration-500',
                'hover:-translate-y-1 hover:border-night/20 hover:shadow-[0_24px_70px_rgba(9,13,14,.12)]',
                compact ? 'min-h-[230px] p-5 sm:p-6' : 'min-h-[260px] p-6 sm:p-7 lg:min-h-[285px] lg:p-8'
              )}
              aria-label={`Approfondisci ${service.title}`}
            >
              <div className="pointer-events-none absolute right-5 top-5 h-20 w-20 opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 sm:h-24 sm:w-24">
                <span className="absolute inset-[16%] rounded-full border border-night/[0.07]" />
                <span className="absolute inset-0 transition-transform duration-[1100ms] ease-out group-hover:rotate-[24deg]">
                  {orbitDots.map((dot, dotIndex) => (
                    <span
                      key={dotIndex}
                      className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_3px_rgba(255,255,255,.75)]"
                      style={{ left: `${dot.x}%`, top: `${dot.y}%`, backgroundColor: accents[(dotIndex + index) % accents.length] }}
                    />
                  ))}
                </span>
              </div>

              <span className="pointer-events-none absolute -right-8 -top-10 font-heading text-[7.5rem] italic leading-none text-night/[0.025] transition-colors duration-500 group-hover:text-night/[0.045]">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="relative flex items-start justify-between gap-4 pr-20">
                <span className="editorial-index text-2xl text-mediterranean">{String(index + 1).padStart(2, '0')}</span>
              </div>

              <div className="relative mt-auto pt-12">
                <div className="mb-4 flex min-h-5 flex-wrap items-center gap-2">
                  <p className="text-[9px] font-semibold uppercase tracking-[.22em] text-night/42">{service.area}</p>
                  {price && (
                    <span className="inline-flex items-center gap-1.5 border border-mediterranean/20 bg-mediterranean/[0.06] px-2 py-1 text-[9px] font-semibold uppercase tracking-[.12em] text-mediterranean">
                      <CalendarDays className="h-3 w-3" /> Consulenza €{price}
                    </span>
                  )}
                </div>

                <h3 className="max-w-[25rem] text-[1.8rem] font-heading leading-[1] text-night sm:text-[2rem]">{service.title}</h3>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-night/10 pt-4">
                  <p className="text-[11px] font-medium uppercase tracking-[.13em] text-night/46">{price ? 'Scopri la consulenza' : 'Esplora il servizio'}</p>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-night/15 text-night/45 transition-all duration-300 group-hover:bg-night group-hover:text-white">
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        );
      })}
    </div>
  );
}
