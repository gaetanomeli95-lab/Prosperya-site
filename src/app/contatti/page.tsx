import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { company } from '@/data/company';
import { FadeIn } from '@/components/MotionWrapper';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta Prosperya S.R.L. per un primo confronto. Sede ad Altavilla Milicia, operativi in Sicilia, Italia e all’estero.',
  alternates: { canonical: '/contatti/' },
};

export default function Contatti() {
  return (
    <div className="premium-page">
      <div className="absolute inset-x-0 top-0 h-[36rem] bg-[linear-gradient(180deg,#090D0E_0%,#101718_64%,transparent_100%)]" />
      <div className="absolute right-[-8rem] top-24 h-[28rem] w-[28rem] rounded-full bg-mediterranean/12 blur-3xl" />

      <div className="premium-container">
        <section className="premium-panel-dark relative overflow-hidden p-6 sm:p-9 lg:p-12 xl:p-14">
          <div className="absolute inset-0 prosperya-grid opacity-30" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="flex items-center gap-3"><span className="h-px w-8 bg-sand" /><span className="eyebrow !text-white/40">Private advisory</span></div>
                <h1 className="mt-7 max-w-5xl text-[clamp(3.3rem,7vw,7rem)] font-heading leading-[.88] tracking-[-.045em] !text-white">Iniziamo dal contesto.</h1>
              </FadeIn>
            </div>
            <div className="lg:col-span-4">
              <FadeIn delay={0.1}>
                <p className="max-w-lg text-sm leading-[1.8] !text-white/60 sm:text-base">Raccontaci la situazione, l’obiettivo e il livello di urgenza. Il primo confronto serve a capire il percorso più coerente.</p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[.72fr_1.28fr]">
          <div className="space-y-4">
            <FadeIn>
              <div className="premium-hero p-6 sm:p-8 lg:p-9">
                <p className="eyebrow text-night/34">Contatto diretto</p>
                <div className="mt-7 divide-y divide-night/10 border-y border-night/10">
                  <a href={`tel:${company.telefono.replace(/\s/g, '')}`} className="group flex items-center justify-between gap-4 py-5 text-night/75 transition-colors hover:text-night">
                    <span className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 text-mediterranean" />{company.telefono}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a href={`mailto:${company.emailDirezione}`} className="group flex items-center justify-between gap-4 py-5 text-night/75 transition-colors hover:text-night">
                    <span className="flex min-w-0 items-center gap-3 text-sm"><Mail className="h-4 w-4 shrink-0 text-mediterranean" /><span className="truncate">{company.emailDirezione}</span></span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="premium-panel-dark p-6 sm:p-8 lg:p-9">
                <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand" /><div><p className="text-sm font-semibold !text-white">Sede</p><address className="mt-2 not-italic text-sm leading-[1.7] !text-white/55">{company.sedeLegale}<br />{company.cap} {company.comune}<br />{company.regione}</address></div></div>
                <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-[1.7] !text-white/34">{company.areaOperativa}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="premium-card p-6 sm:p-8">
                <p className="eyebrow text-night/34">Come lavoriamo</p>
                <div className="mt-6 space-y-4">
                  {['Primo inquadramento', 'Definizione delle priorità', 'Proposta di percorso'].map((item, i) => (
                    <div key={item} className="flex items-center gap-3 border-t border-night/10 pt-4"><span className="font-heading italic text-lg text-mediterranean">0{i + 1}</span><span className="text-sm text-night/65">{item}</span></div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.08}>
            <div className="premium-hero p-6 sm:p-8 lg:p-10 xl:p-12">
              <div className="mb-8 grid gap-4 border-b border-night/10 pb-7 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="eyebrow text-night/34">Richiesta consulenza</p>
                  <h2 className="mt-4 text-3xl font-heading leading-[1] text-night sm:text-4xl">Descrivici ciò che conta davvero.</h2>
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-[.2em] text-night/30">Risposta diretta</span>
              </div>
              <ContactForm />
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
