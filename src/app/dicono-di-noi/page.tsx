import type { Metadata } from 'next';
import { ArrowUpRight, Newspaper } from 'lucide-react';
import { FadeIn } from '@/components/MotionWrapper';

export const metadata: Metadata = {
  title: 'Dicono di noi',
  description: 'Rassegna stampa e pubblicazioni che parlano di Prosperya S.R.L.',
  alternates: { canonical: '/dicono-di-noi/' },
};

const press = [
  {
    source: 'PalermoToday',
    section: 'Economia',
    title: 'Simposio dei giovani imprenditori in Sicilia',
    href: 'https://www.palermotoday.it/economia/simposio-giovani-imprenditori-sicilia.html',
    index: '01',
    featured: true,
  },
  {
    source: 'Caltanissetta 401',
    href: 'https://share.google/VODcMEGSPOdMa4p8q',
    index: '02',
  },
  {
    source: 'PalermoToday',
    href: 'https://share.google/Lz75z34WgyR7zcld9',
    index: '03',
  },
];

export default function DiconoDiNoi() {
  return (
    <div className="premium-page">
      <div className="absolute inset-x-0 top-0 h-[36rem] bg-[linear-gradient(180deg,#172326_0%,#1D2C2F_68%,transparent_100%)]" />
      <div className="absolute right-[-10rem] top-24 h-[30rem] w-[30rem] rounded-full bg-mediterranean/10 blur-3xl" />

      <div className="premium-container">
        <section className="premium-panel-dark dark-surface relative overflow-hidden p-6 sm:p-9 lg:p-12 xl:p-14">
          <div className="absolute inset-0 prosperya-grid opacity-20" />
          <div className="absolute inset-x-0 top-0 h-px hairline-light" />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="flex items-center gap-3">
                  <Newspaper className="h-4 w-4 text-sand" />
                  <span className="section-kicker-dark">Rassegna stampa</span>
                </div>
                <h1 className="mt-7 max-w-5xl text-[clamp(3.5rem,7vw,7.4rem)] font-heading leading-[.88] tracking-[-.045em] !text-white">
                  Dicono <span className="italic !text-white/55">di noi.</span>
                </h1>
              </FadeIn>
            </div>

            <div className="lg:col-span-4">
              <FadeIn delay={0.08}>
                <p className="max-w-lg text-sm leading-[1.8] !text-white/68 sm:text-base">
                  Una selezione di pubblicazioni e fonti esterne dedicate a Prosperya e alle sue attività.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="mt-6 bg-paper shadow-[0_24px_80px_rgba(9,13,14,.08)]">
          <div className="divide-y divide-night/10 border-y border-night/10">
            {press.map((item, i) => (
              <FadeIn key={`${item.source}-${item.index}`} delay={i * 0.05}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative grid items-center gap-5 px-5 py-7 transition-all duration-300 sm:px-8 lg:px-12 ${
                    item.featured
                      ? 'min-h-[210px] grid-cols-[52px_1fr_auto] overflow-hidden bg-[#F4EFE6] hover:bg-[#F0E8DC] sm:grid-cols-[72px_1fr_auto] lg:min-h-[240px]'
                      : 'min-h-[150px] grid-cols-[52px_1fr_auto] hover:bg-night/[0.025] sm:grid-cols-[72px_1fr_auto] lg:min-h-[180px]'
                  }`}
                >
                  {item.featured && (
                    <>
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mediterranean/55 to-transparent" />
                      <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full border border-mediterranean/[0.08]" />
                      <div className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full border border-mediterranean/[0.06]" />
                    </>
                  )}

                  <span className={`editorial-index relative text-2xl sm:text-3xl ${item.featured ? 'text-night' : 'text-mediterranean'}`}>{item.index}</span>

                  <div className="relative min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <p className="text-[9px] font-semibold uppercase tracking-[.22em] text-night/38">{item.featured ? 'In evidenza' : 'Fonte esterna'}</p>
                      {item.section && (
                        <span className="border border-night/12 px-2 py-1 text-[8px] font-semibold uppercase tracking-[.18em] text-night/45">{item.section}</span>
                      )}
                    </div>

                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[.18em] text-mediterranean/75">{item.source}</p>

                    {item.title ? (
                      <h2 className="mt-2 max-w-4xl text-[clamp(2rem,4vw,4.35rem)] font-heading leading-[.96] tracking-[-.03em] text-night">
                        {item.title}
                      </h2>
                    ) : (
                      <h2 className="mt-2 text-3xl font-heading leading-none text-night sm:text-4xl lg:text-5xl">{item.source}</h2>
                    )}

                    <p className={`mt-4 text-xs ${item.featured ? 'font-semibold uppercase tracking-[.13em] text-night/48' : 'text-night/48'}`}>
                      {item.featured ? `Leggi l’articolo su ${item.source}` : 'Apri la pubblicazione originale'}
                    </p>
                  </div>

                  <span className={`relative grid h-11 w-11 place-items-center rounded-full border transition-all duration-300 sm:h-12 sm:w-12 ${
                    item.featured
                      ? 'border-night/15 bg-night text-white group-hover:bg-mediterranean group-hover:border-mediterranean'
                      : 'border-night/15 text-night/50 group-hover:bg-night group-hover:text-white'
                  }`}>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
