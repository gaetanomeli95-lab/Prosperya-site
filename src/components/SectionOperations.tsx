'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FadeIn } from './MotionWrapper';

const operationItems = [
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

function OperationList({ items, offset = 0 }: { items: typeof operationItems; offset?: number }) {
  return (
    <div className="divide-y divide-night/12 border-y border-night/15">
      {items.map((item, i) => (
        <FadeIn key={item.title} delay={(offset + i) * 0.035}>
          <article className="relative grid gap-5 py-7 sm:grid-cols-[58px_1fr] sm:gap-6 sm:py-9 lg:grid-cols-[70px_1fr] lg:py-10">
            <div className="flex items-start justify-between sm:block">
              <span className="editorial-index text-3xl text-mediterranean/85 lg:text-4xl">{item.n}</span>
              <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-night/35 sm:hidden">{item.tag}</span>
            </div>

            <div className="min-w-0">
              <div className="hidden items-center gap-3 sm:flex">
                <span className="h-px w-7 bg-night/15" />
                <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-night/35">{item.tag}</span>
              </div>
              <h3 className="mt-1 text-[clamp(1.8rem,2.6vw,2.7rem)] font-heading leading-[.98] text-night sm:mt-5">
                {item.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-[1.8] text-anthracite/68 lg:text-[15px]">
                {item.text}
              </p>
            </div>
          </article>
        </FadeIn>
      ))}
    </div>
  );
}

export function SectionOperations() {
  const leftColumn = operationItems.slice(0, 4);
  const rightColumn = operationItems.slice(4);

  return (
    <section className="relative overflow-hidden bg-[#F1ECE4] py-20 sm:py-24 lg:py-32">
      <div className="absolute bottom-[-5rem] left-[-7rem] h-72 w-72 rounded-full bg-mediterranean/10 blur-3xl" />
      <div className="absolute right-[-8rem] top-20 hidden font-heading text-[22rem] italic leading-none text-night/[0.018] xl:block">07</div>

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <FadeIn>
              <span className="eyebrow text-night/50">Corporate & extraordinary</span>
              <h2 className="mt-5 max-w-3xl text-4xl font-heading leading-[0.98] text-night sm:text-5xl lg:text-6xl">
                Operazioni straordinarie e soluzioni su misura
              </h2>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <FadeIn delay={0.08}>
              <p className="max-w-xl text-sm leading-[1.85] text-anthracite/70 lg:text-[15px]">
                Alcune decisioni non si risolvono con un servizio standard. Richiedono una lettura congiunta di struttura societaria, governance, continuità e obiettivi di sviluppo.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="mt-14 grid gap-0 lg:mt-20 lg:grid-cols-2">
          <div className="lg:pr-10 xl:pr-14">
            <OperationList items={leftColumn} />
          </div>
          <div className="mt-[-1px] lg:mt-0 lg:border-l lg:border-night/12 lg:pl-10 xl:pl-14">
            <OperationList items={rightColumn} offset={leftColumn.length} />
          </div>
        </div>

        <FadeIn delay={0.18}>
          <div className="mt-12 border-y border-night/15 py-8 sm:mt-14 sm:py-9 lg:mt-16">
            <div className="grid gap-7 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-8">
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-night/40">Regia Prosperya</p>
                <h3 className="mt-4 max-w-4xl text-2xl font-heading leading-[1.08] text-night sm:text-3xl lg:text-4xl">
                  Prima di definire la forma dell’operazione, definiamo il problema da risolvere e gli equilibri da proteggere.
                </h3>
              </div>

              <div className="lg:col-span-4 lg:justify-self-end">
                <Link
                  href="/contatti/"
                  className="group inline-flex min-h-12 w-full items-center justify-between gap-4 bg-[#213236] px-5 text-sm font-semibold !text-white transition-colors hover:bg-mediterranean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mediterranean sm:w-auto sm:min-w-[245px]"
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
