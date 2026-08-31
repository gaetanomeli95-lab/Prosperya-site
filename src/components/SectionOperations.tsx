'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FadeIn } from './MotionWrapper';

const operationCards = [
  {
    n: '01',
    title: 'NewCo (start-up)',
    tag: 'Nuove iniziative',
    text: 'Costituzione e assetto iniziale per nuove iniziative imprenditoriali.',
  },
  {
    n: '02',
    title: 'Affitto di ramo d’azienda',
    tag: 'Continuità & transizione',
    text: 'Strutture temporanee o strategiche per continuità, rilancio o transizione.',
  },
  {
    n: '03',
    title: 'Spin-off',
    tag: 'Riorganizzazione',
    text: 'Separazione di attività o competenze per creare nuovi veicoli più focalizzati.',
  },
  {
    n: '04',
    title: 'Joint venture',
    tag: 'Partnership strategiche',
    text: 'Accordi e modelli di collaborazione per progetti condivisi e crescita con partner.',
  },
  {
    n: '05',
    title: 'Capitale e agreement',
    tag: 'Assetto societario',
    text: 'Definizione di assetti, conferimenti e accordi tra soci o investitori.',
  },
  {
    n: '06',
    title: 'Patti parasociali',
    tag: 'Governance tra soci',
    text: 'Regole di governance tra soci per tutela, equilibrio e chiarezza decisionale.',
  },
  {
    n: '07',
    title: 'Statuti e atti costitutivi',
    tag: 'Impianto giuridico',
    text: 'Impianto giuridico e organizzativo coerente con obiettivi e operatività.',
  },
];

export function SectionOperations() {
  return (
    <section className="relative overflow-hidden bg-[#F1ECE4] py-20 sm:py-24 lg:py-32">
      <div className="absolute bottom-[-5rem] left-[-7rem] h-72 w-72 rounded-full bg-mediterranean/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-6 lg:px-8">
        <div className="mb-12 grid items-end gap-8 sm:mb-14 lg:mb-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <FadeIn>
              <span className="eyebrow text-night/50">Corporate & extraordinary</span>
              <h2 className="mt-5 text-4xl font-heading leading-[0.98] text-night sm:text-5xl lg:text-6xl">
                Operazioni straordinarie e soluzioni su misura
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <FadeIn delay={0.1}>
              <p className="text-sm leading-relaxed text-anthracite/70 lg:text-[15px]">
                Gestiamo operazioni societarie e passaggi delicati costruendo ogni intervento attorno a governance, continuità aziendale, assetto tra soci e obiettivi di sviluppo.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {operationCards.map((card, i) => {
            const featured = i === 0 || i === 3 || i === 6;
            return (
              <FadeIn key={card.title} delay={i * 0.035}>
                <article
                  className={`relative flex min-h-[220px] flex-col justify-between overflow-hidden border p-5 sm:min-h-[230px] sm:p-6 lg:min-h-[245px] ${featured ? 'border-white/10 bg-[#213236] text-white shadow-[0_18px_55px_rgba(9,13,14,.10)]' : 'border-night/10 bg-paper/80 text-night shadow-[0_14px_40px_rgba(9,13,14,.05)]'}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-[2px] ${i % 2 === 0 ? 'bg-logo-magenta' : 'bg-mediterranean-light'}`} />

                  <div className="flex items-start justify-between gap-4">
                    <span className={`font-heading italic text-2xl ${featured ? 'text-sand' : 'text-mediterranean'}`}>{card.n}</span>
                    <span className={`max-w-[10rem] text-right text-[9px] font-semibold uppercase tracking-[.16em] sm:text-[10px] ${featured ? '!text-white/50' : 'text-night/40'}`}>
                      {card.tag}
                    </span>
                  </div>

                  <div className="mt-8">
                    <h3 className={`max-w-[17rem] text-[1.55rem] font-heading leading-[1.02] ${featured ? '!text-white' : 'text-night'}`}>
                      {card.title}
                    </h3>
                    <p className={`mt-4 max-w-[18rem] text-sm leading-[1.75] ${featured ? '!text-white/72' : 'text-anthracite/68'}`}>
                      {card.text}
                    </p>
                  </div>

                  <div className={`mt-8 border-t pt-4 ${featured ? 'border-white/10' : 'border-night/10'}`}>
                    <span className={`text-[9px] font-semibold uppercase tracking-[.18em] sm:text-[10px] ${featured ? '!text-sand/75' : 'text-night/45'}`}>
                      Advisory framework
                    </span>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative overflow-hidden border border-night/10 bg-[#E7E0D6] p-6 paper-noise sm:p-8 lg:p-9">
              <div className="absolute inset-x-0 top-0 h-px hairline-dark" />
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-night/40">Regia Prosperya</p>
              <h3 className="mt-5 max-w-3xl text-3xl font-heading leading-[1.02] text-night sm:text-4xl">
                Non semplici pratiche, ma scenari che richiedono struttura, tutela e coordinamento.
              </h3>
              <p className="mt-5 max-w-3xl text-sm leading-[1.85] text-anthracite/72 lg:text-[15px]">
                Ogni operazione viene valutata in base al contesto societario, ai rapporti tra le parti, agli impatti economici e alla sostenibilità esecutiva.
              </p>
            </div>

            <div className="relative overflow-hidden border border-white/10 bg-[#213236] p-6 text-white shadow-[0_18px_55px_rgba(9,13,14,.12)] sm:p-8 lg:p-9">
              <div className="absolute inset-0 prosperya-grid opacity-15" />
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.2em] !text-white/45">Intervento su misura</p>
                  <h3 className="mt-5 text-3xl font-heading leading-[1.02] !text-white sm:text-4xl">
                    Valutiamo la formula più adatta prima di proporre qualsiasi struttura.
                  </h3>
                </div>

                <Link
                  href="/contatti/"
                  className="group inline-flex min-h-12 items-center justify-between gap-4 border border-sand/40 bg-sand/[0.08] px-5 text-sm font-semibold !text-white transition-all hover:bg-sand hover:!text-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand"
                >
                  Richiedi un confronto
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
