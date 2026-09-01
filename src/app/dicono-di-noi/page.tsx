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
    source: 'Caltanissetta 401',
    href: 'https://share.google/VODcMEGSPOdMa4p8q',
    index: '01',
  },
  {
    source: 'PalermoToday',
    href: 'https://share.google/Lz75z34WgyR7zcld9',
    index: '02',
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
              <FadeIn key={item.source} delay={i * 0.05}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid min-h-[150px] grid-cols-[52px_1fr_auto] items-center gap-5 px-5 py-7 transition-colors hover:bg-night/[0.025] sm:grid-cols-[72px_1fr_auto] sm:px-8 lg:min-h-[180px] lg:px-12"
                >
                  <span className="editorial-index text-2xl text-mediterranean sm:text-3xl">{item.index}</span>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[.22em] text-night/38">Fonte esterna</p>
                    <h2 className="mt-3 text-3xl font-heading leading-none text-night sm:text-4xl lg:text-5xl">{item.source}</h2>
                    <p className="mt-3 text-xs text-night/48">Apri la pubblicazione originale</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-night/15 text-night/50 transition-all duration-300 group-hover:bg-night group-hover:text-white sm:h-12 sm:w-12">
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
