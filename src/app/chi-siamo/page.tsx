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
      <div className="absolute inset-x-0 top-0 h-[35rem] bg-[linear-gradient(180deg,#090D0E_0%,#101718_64%,transparent_100%)]" />
      <div className="absolute right-[-8rem] top-28 h-[27rem] w-[27rem] rounded-full bg-mediterranean/12 blur-3xl" />

      <div className="premium-container">
        <section className="premium-panel-dark relative overflow-hidden px-6 py-10 sm:px-9 sm:py-12 lg:px-12 lg:py-16">
          <div className="absolute inset-0 prosperya-grid opacity-30" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="flex items-center gap-3"><span className="h-px w-8 bg-sand" /><span className="eyebrow !text-white/40">Prosperya · Advisory company</span></div>
                <h1 className="mt-7 max-w-5xl text-[clamp(3.3rem,7vw,7rem)] font-heading leading-[.88] tracking-[-.045em] !text-white">{about.title}</h1>
              </FadeIn>
            </div>
            <div className="lg:col-span-4">
              <FadeIn delay={0.1}>
                <p className="max-w-lg text-sm leading-[1.8] !text-white/60 sm:text-base">{about.intro}</p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[.72fr_1.28fr]">
          <div className="premium-hero p-7 sm:p-9 lg:p-10">
            <FadeIn>
              <p className="eyebrow text-night/35">Il nostro modo di lavorare</p>
              <h2 className="mt-5 text-4xl font-heading leading-[.98] text-night sm:text-5xl">Esperienza senza rigidità. Metodo senza distanza.</h2>
              <p className="mt-7 text-sm leading-[1.8] text-anthracite/67 sm:text-base">Prosperya unisce esperienza manageriale, controllo operativo e capacità di leggere mercati diversi mantenendo un rapporto diretto con l’impresa.</p>
            </FadeIn>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {about.points.map((point, i) => (
              <FadeIn key={point.title} delay={i * 0.06}>
                <article className={`group relative flex min-h-[245px] flex-col justify-between overflow-hidden border p-6 transition-all duration-500 hover:-translate-y-1 ${i === 2 ? 'border-night bg-night' : 'border-night/10 bg-paper hover:border-night/20 hover:shadow-soft'}`}>
                  <div className="flex items-start justify-between">
                    <span className={`font-heading italic text-2xl ${i === 2 ? 'text-sand' : 'text-mediterranean'}`}>0{i + 1}</span>
                    <span className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-logo-magenta' : i === 1 ? 'bg-logo-blue' : i === 2 ? 'bg-logo-yellow' : 'bg-logo-green'}`} />
                  </div>
                  <div>
                    <h2 className={`text-3xl font-heading leading-none ${i === 2 ? '!text-white' : 'text-night'}`}>{point.title}</h2>
                    <p className={`mt-5 text-sm leading-[1.75] ${i === 2 ? '!text-white/55' : 'text-anthracite/68'}`}>{point.text}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="mt-5 premium-panel-dark grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
          <div>
            <p className="eyebrow !text-white/34">Il prossimo passo</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-heading leading-[.98] !text-white sm:text-5xl lg:text-6xl">Portare chiarezza dove le decisioni diventano complesse.</h2>
          </div>
          <Link href="/contatti/" className="premium-button-light group min-w-[220px] justify-between">
            Parla con Prosperya <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
