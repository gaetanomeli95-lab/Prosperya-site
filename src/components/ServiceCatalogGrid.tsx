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
        const isStartup = service.title === 'Start Up' && service.href === '/servizi/startup/';
        const highlightStartup = compact && isStartup;

        return (
          <FadeIn key={service.title} delay={index * 0.02} className={cn('h-full lg:col-span-2', centerFinalPair && 'lg:col-start-2')}>
            <Link
              href={service.href}
              className={cn(
                'group relative flex h-full flex-col overflow-hidden border transition-all duration-500',
                highlightStartup
                  ? 'border-sand/70 bg-[#172326] shadow-[0_24px_70px_rgba(9,13,14,.16)] hover:-translate-y-1 hover:border-sand hover:shadow-[0_30px_85px_rgba(9,13,14,.22)]'
                  : 'border-night/10 bg-paper hover:-translate-y-1 hover:border-night/20 hover:shadow-[0_24px_70px_rgba(9,13,14,.12)]',
                compact ? 'min-h-[230px] p-5 sm:p-6' : 'min-h-[260px] p-6 sm:p-7 lg:min-h-[285px] lg:p-8'
              )}
              aria-label={highlightStartup ? 'Scopri la consulenza gratuita Start Up' : `Approfondisci ${service.title}`}
            >
              {highlightStartup && (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(214,188,132,.16),transparent_42%)]" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand to-transparent" />
                  <div className="pointer-events-none absolute -bottom-16 -right-12 h-44 w-44 rounded-full border border-sand/[0.10]" />
                  <div className="pointer-events-none absolute -bottom-9 -right-5 h-28 w-28 rounded-full border border-sand/[0.08]" />
                </>
              )}

              <div className={cn(
                'pointer-events-none absolute right-5 top-5 h-14 w-14 opacity-35 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60 sm:h-16 sm:w-16',
                highlightStartup && 'opacity-55 group-hover:opacity-80'
              )}>
                <span className={cn('absolute inset-[16%] rounded-full border', highlightStartup ? 'border-white/[0.10]' : 'border-night/[0.055]')} />
                <span className="absolute inset-0 transition-transform duration-[1100ms] ease-out group-hover:rotate-[18deg]">
                  {orbitDots.map((dot, dotIndex) => (
                    <span
                      key={dotIndex}
                      className={cn(
                        'absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full',
                        highlightStartup ? 'shadow-[0_0_0_2px_rgba(23,35,38,.72)]' : 'shadow-[0_0_0_2px_rgba(255,255,255,.72)]'
                      )}
                      style={{ left: `${dot.x}%`, top: `${dot.y}%`, backgroundColor: highlightStartup ? '#D7BE86' : accents[(dotIndex + index) % accents.length] }}
                    />
                  ))}
                </span>
              </div>

              <div className="relative flex items-start justify-between gap-4 pr-20">
                <span className={cn('editorial-index text-2xl', highlightStartup ? 'text-sand' : 'text-mediterranean')}>{String(index + 1).padStart(2, '0')}</span>
              </div>

              <div className="relative mt-auto pt-12">
                <div className="mb-4 flex min-h-5 flex-wrap items-center gap-2">
                  <p className={cn('text-[9px] font-semibold uppercase tracking-[.22em]', highlightStartup ? '!text-white/45' : 'text-night/42')}>{service.area}</p>

                  {highlightStartup && (
                    <span className="inline-flex items-center gap-1.5 border border-sand/45 bg-sand px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[.14em] text-night shadow-[0_8px_24px_rgba(215,190,134,.12)]">
                      <CalendarDays className="h-3 w-3" /> Consulenza gratuita
                    </span>
                  )}

                  {price && (
                    <span className="inline-flex items-center gap-1.5 border border-mediterranean/20 bg-mediterranean/[0.06] px-2 py-1 text-[9px] font-semibold uppercase tracking-[.12em] text-mediterranean">
                      <CalendarDays className="h-3 w-3" /> Consulenza €{price}
                    </span>
                  )}
                </div>

                <h3 className={cn(
                  'max-w-[25rem] font-heading leading-[1]',
                  highlightStartup ? 'text-[2.15rem] !text-white sm:text-[2.4rem]' : 'text-[1.8rem] text-night sm:text-[2rem]'
                )}>{service.title}</h3>

                {highlightStartup && (
                  <p className="mt-3 max-w-[23rem] text-xs leading-[1.65] !text-white/58">
                    Un primo confronto dedicato al progetto imprenditoriale, senza costi.
                  </p>
                )}

                <div className={cn('mt-7 flex items-center justify-between gap-4 border-t pt-4', highlightStartup ? 'border-white/12' : 'border-night/10')}>
                  <p className={cn(
                    'text-[11px] font-semibold uppercase tracking-[.13em]',
                    highlightStartup ? '!text-sand' : 'text-night/46'
                  )}>
                    {highlightStartup ? 'Prenota gratuitamente' : price ? 'Scopri la consulenza' : 'Esplora il servizio'}
                  </p>
                  <span className="flex items-center gap-2">
                    {!highlightStartup && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />}
                    <span className={cn(
                      'grid h-8 w-8 place-items-center rounded-full border transition-all duration-300',
                      highlightStartup
                        ? 'border-sand/45 bg-sand !text-night group-hover:bg-white'
                        : 'border-night/15 text-night/45 group-hover:bg-night group-hover:text-white'
                    )}>
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
