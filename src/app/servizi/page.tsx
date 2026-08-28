import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { serviceCatalog } from '@/data/services';
import { FadeIn } from '@/components/MotionWrapper';

export const metadata: Metadata = {
  title: 'Servizi',
  description: 'I servizi Prosperya per Start Up, sviluppo, controllo, finanza, internazionalizzazione, ristrutturazione e operazioni su misura.',
  alternates: { canonical: '/servizi/' },
};

const accents = ['bg-logo-magenta', 'bg-logo-blue', 'bg-logo-yellow', 'bg-logo-green', 'bg-logo-orange', 'bg-mediterranean-light'];

export default function Servizi() {
  return (
    <div className="premium-page">
      <div className="absolute inset-x-0 top-0 h-[36rem] bg-[linear-gradient(180deg,#090D0E_0%,#111819_63%,transparent_100%)]" />
      <div className="absolute right-[-9rem] top-24 h-[28rem] w-[28rem] rounded-full bg-mediterranean/12 blur-3xl" />

      <div className="premium-container">
        <section className="premium-panel-dark relative overflow-hidden px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="absolute inset-0 prosperya-grid opacity-35" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-sand" />
                  <span className="eyebrow !text-white/42">Advisory portfolio · 14 servizi</span>
                </div>
                <h1 className="mt-7 max-w-5xl text-[clamp(3rem,7vw,7rem)] font-heading leading-[.88] tracking-[-.045em] !text-white">
                  Competenze specialistiche. <span className="italic !text-white/58">Una visione integrata.</span>
                </h1>
              </FadeIn>
            </div>
            <div className="lg:col-span-4">
              <FadeIn delay={0.1}>
                <p className="max-w-md text-sm leading-[1.8] !text-white/58 sm:text-base">
                  Prosperya interviene su crescita, governance, finanza, internazionalizzazione e nuove iniziative imprenditoriali con un’unica regia strategica.
                </p>
                <div className="mt-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.18em] !text-white/34">
                  <span>Esplora i servizi</span><ArrowDownRight className="h-4 w-4 text-sand" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="mt-5 border border-night/10 bg-[#E5DFD5] p-3 sm:p-4 lg:mt-6 lg:p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {serviceCatalog.map((service, i) => {
              const featured = i === 0 || i === 4 || i === 9 || i === 13;
              return (
                <FadeIn key={service.title} delay={i * 0.025}>
                  <Link
                    href={service.href}
                    className={`group relative flex min-h-[250px] flex-col justify-between overflow-hidden border p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(9,13,14,.12)] ${featured ? 'border-night bg-night' : 'border-night/10 bg-paper hover:border-night/25'}`}
                  >
                    <div className={`absolute inset-x-0 top-0 h-[3px] ${accents[i % accents.length]}`} />
                    <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full border border-current opacity-[.055] transition-transform duration-700 group-hover:scale-125" />

                    <div className="flex items-start justify-between gap-4">
                      <span className={`font-heading italic text-2xl ${featured ? 'text-sand' : 'text-mediterranean'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={`grid h-10 w-10 place-items-center border transition-all ${featured ? 'border-white/15 !text-white/55 group-hover:bg-white group-hover:!text-night' : 'border-night/12 text-night/35 group-hover:bg-night group-hover:!text-white'}`}>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>

                    <div>
                      <p className={`mb-3 text-[9px] font-semibold uppercase tracking-[.2em] ${featured ? '!text-white/32' : 'text-night/34'}`}>{service.area}</p>
                      <h2 className={`max-w-[18rem] text-[1.7rem] font-heading leading-[1.02] sm:text-[1.9rem] ${featured ? '!text-white' : 'text-night'}`}>{service.title}</h2>
                      <p className={`mt-5 text-xs font-medium uppercase tracking-[.12em] ${featured ? '!text-white/38' : 'text-night/38'}`}>Approfondisci il servizio</p>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
          <div className="premium-hero p-7 sm:p-9 lg:p-12">
            <p className="eyebrow text-night/38">Metodo Prosperya</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-heading leading-[.98] text-night sm:text-5xl lg:text-6xl">Non vendiamo pacchetti. Costruiamo <span className="italic text-night/55">percorsi.</span></h2>
          </div>
          <div className="premium-panel-dark flex flex-col justify-between p-7 sm:p-9">
            <p className="text-sm leading-[1.75] !text-white/58">Ogni incarico parte dall’analisi del contesto e viene costruito attorno alle priorità reali dell’impresa.</p>
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
