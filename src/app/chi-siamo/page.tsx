import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { about } from '@/data/content';
import { FadeIn } from '@/components/MotionWrapper';

export const metadata: Metadata = {
  title: 'Chi siamo',
  description: 'La storia, i valori e l’approccio di Prosperya S.R.L.: consulenza imprenditoriale e gestionale tra Sicilia, Italia, Europa e area mediterranea.',
  alternates: { canonical: '/chi-siamo/' },
};

export default function ChiSiamo() {
  return (
    <div className="premium-page">
      <div className="absolute inset-x-0 top-0 h-[38rem] bg-[linear-gradient(180deg,#090D0E_0%,#101718_66%,transparent_100%)]" />
      <div className="absolute right-[-10rem] top-20 h-[30rem] w-[30rem] rounded-full bg-mediterranean/10 blur-3xl" />

      <div className="premium-container">
        <section className="premium-panel-dark dark-surface relative overflow-hidden px-6 py-11 sm:px-9 sm:py-14 lg:px-12 lg:py-16 xl:px-14">
          <div className="absolute inset-0 prosperya-grid opacity-20" />
          <div className="absolute inset-x-0 top-0 h-px hairline-light" />
          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <FadeIn>
                <span className="section-kicker-dark">Prosperya · Advisory company</span>
                <h1 className="mt-7 max-w-5xl text-[clamp(3.4rem,7vw,7.2rem)] font-heading leading-[.88] tracking-[-.045em] !text-white">{about.title}</h1>
              </FadeIn>
            </div>
            <div className="lg:col-span-4">
              <FadeIn delay={0.1}>
                <p className="max-w-lg text-sm leading-[1.8] !text-white/70 sm:text-base">{about.intro}</p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="mt-6 bg-[#EEE9DF] p-6 paper-noise sm:p-8 lg:p-10 xl:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <FadeIn>
                <span className="section-kicker">Il nostro modo di lavorare</span>
                <h2 className="mt-7 text-4xl font-heading leading-[.96] text-night sm:text-5xl lg:text-6xl">Esperienza senza rigidità. Metodo senza distanza.</h2>
              </FadeIn>
            </div>

            <div className="lg:col-span-8">
              <FadeIn delay={0.08}>
                <p className="max-w-3xl text-[clamp(1.1rem,1.8vw,1.55rem)] leading-[1.65] text-anthracite/80">Prosperya unisce esperienza manageriale, controllo operativo e capacità di leggere mercati diversi mantenendo un rapporto diretto con l’impresa.</p>
              </FadeIn>

              <div className="mt-10 border-y border-night/15">
                {about.points.map((point, i) => (
                  <FadeIn key={point.title} delay={i * 0.05}>
                    <article className="group grid gap-5 border-b border-night/10 py-7 last:border-b-0 sm:grid-cols-[54px_1fr] lg:grid-cols-[72px_.65fr_1fr] lg:items-start lg:py-8">
                      <span className="editorial-index text-2xl text-mediterranean lg:text-3xl">0{i + 1}</span>
                      <h3 className="text-2xl font-heading leading-none text-night sm:text-3xl">{point.title}</h3>
                      <p className="text-sm leading-[1.8] text-anthracite/70 sm:col-start-2 lg:col-start-auto lg:text-[15px]">{point.text}</p>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="premium-panel-dark dark-surface mt-6 grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
          <div>
            <span className="section-kicker-dark">Il prossimo passo</span>
            <h2 className="mt-6 max-w-4xl text-4xl font-heading leading-[.96] !text-white sm:text-5xl lg:text-6xl">Portare chiarezza dove le decisioni diventano complesse.</h2>
          </div>
          <Link href="/contatti/" className="group flex min-h-14 min-w-[230px] items-center justify-between border border-sand/40 bg-sand/[0.06] px-5 text-sm font-semibold !text-white transition-all hover:bg-sand hover:!text-night">
            Parla con Prosperya
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
