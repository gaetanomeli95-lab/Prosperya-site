import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { serviceCatalog } from '@/data/services';
import { FadeIn } from '@/components/MotionWrapper';
import { ServiceCatalogGrid } from '@/components/ServiceCatalogGrid';

export const metadata: Metadata = {
  title: 'Servizi',
  description: 'I servizi Prosperya per Start Up, sviluppo, controllo, finanza, internazionalizzazione, ristrutturazione e operazioni su misura.',
  alternates: { canonical: '/servizi/' },
};

export default function Servizi() {
  return (
    <div className="premium-page">
      <div className="absolute inset-x-0 top-0 h-[38rem] bg-[linear-gradient(180deg,#090D0E_0%,#111819_63%,transparent_100%)]" />
      <div className="absolute right-[-9rem] top-24 h-[28rem] w-[28rem] rounded-full bg-mediterranean/10 blur-3xl" />

      <div className="premium-container">
        <section className="premium-panel-dark dark-surface relative overflow-hidden px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="absolute inset-0 prosperya-grid opacity-30" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-sand" />
                  <span className="eyebrow !text-white/50">Advisory portfolio · {serviceCatalog.length} servizi</span>
                </div>
                <h1 className="mt-7 max-w-5xl text-[clamp(3rem,7vw,7rem)] font-heading leading-[.88] tracking-[-.045em] !text-white">
                  Competenze specialistiche. <span className="italic !text-white/70">Una visione integrata.</span>
                </h1>
              </FadeIn>
            </div>
            <div className="lg:col-span-4">
              <FadeIn delay={0.1}>
                <p className="max-w-md text-sm leading-[1.8] !text-white/70 sm:text-base">
                  Prosperya interviene su crescita, governance, finanza, internazionalizzazione e nuove iniziative imprenditoriali con un’unica regia strategica.
                </p>
                <div className="mt-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.18em] !text-white/50">
                  <span>Esplora i servizi</span><ArrowDownRight className="h-4 w-4 text-sand" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="mt-5 border border-night/10 bg-[#E5DFD5] p-3 paper-noise sm:p-4 lg:mt-6 lg:p-5">
          <ServiceCatalogGrid />
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
          <div className="premium-hero p-7 sm:p-9 lg:p-12">
            <p className="eyebrow text-night/40">Metodo Prosperya</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-heading leading-[.98] text-night sm:text-5xl lg:text-6xl">Non vendiamo pacchetti. Costruiamo <span className="italic text-night/60">percorsi.</span></h2>
          </div>
          <div className="premium-panel-dark dark-surface flex flex-col justify-between p-7 sm:p-9">
            <p className="text-sm leading-[1.75] !text-white/70">Ogni incarico parte dall’analisi del contesto e viene costruito attorno alle priorità reali dell’impresa.</p>
            <Link href="/contatti/" className="premium-button-light group mt-8 justify-between">
              Richiedi un confronto
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
