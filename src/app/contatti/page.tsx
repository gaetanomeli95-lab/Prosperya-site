import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { company } from '@/data/company';
import { FadeIn } from '@/components/MotionWrapper';
import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta Prosperya S.R.L. per un primo confronto. Sede ad Altavilla Milicia, operativi in Sicilia, Italia e all’estero.',
  alternates: { canonical: '/contatti/' },
};

interface ContattiProps {
  searchParams: Promise<{ area?: string }>;
}

export default async function Contatti({ searchParams }: ContattiProps) {
  const { area } = await searchParams;
  return (
    <div className="premium-page">
      <div className="absolute inset-x-0 top-0 h-[38rem] bg-[linear-gradient(180deg,#172326_0%,#1D2C2F_66%,transparent_100%)]" />
      <div className="absolute right-[-10rem] top-20 h-[30rem] w-[30rem] rounded-full bg-mediterranean/10 blur-3xl" />

      <div className="premium-container">
        <section className="premium-panel-dark dark-surface relative overflow-hidden p-6 sm:p-9 lg:p-12 xl:p-14">
          <div className="absolute inset-0 prosperya-grid opacity-20" />
          <div className="absolute inset-x-0 top-0 h-px hairline-light" />
          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <FadeIn>
                <span className="section-kicker-dark">Private advisory</span>
                <h1 className="mt-7 max-w-5xl text-[clamp(3.4rem,7vw,7.2rem)] font-heading leading-[.88] tracking-[-.045em] !text-white">Iniziamo dal contesto.</h1>
              </FadeIn>
            </div>
            <div className="lg:col-span-4">
              <FadeIn delay={0.1}>
                <p className="max-w-lg text-sm leading-[1.8] !text-white/70 sm:text-base">Raccontaci la situazione, l’obiettivo e il livello di urgenza. Il primo confronto serve a capire il percorso più coerente.</p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[.68fr_1.32fr]">
          <div className="bg-[#E9E3D9] p-6 paper-noise sm:p-8 lg:p-9">
            <FadeIn>
              <span className="section-kicker">Contatto diretto</span>
              <div className="mt-8 border-y border-night/15">
                <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-5 text-night/75 transition-colors hover:text-night">
                  <span className="flex items-center gap-3 text-sm"><MessageCircle className="h-4 w-4 text-[#25D366]" />{company.telefono} · WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4 opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a href={company.gmailComposeHref} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-t border-night/10 py-5 text-night/75 transition-colors hover:text-night">
                  <span className="flex min-w-0 items-center gap-3 text-sm"><Mail className="h-4 w-4 shrink-0 text-mediterranean" /><span className="truncate">{company.emailPubblica}</span></span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <div className="mt-10 border-t border-night/15 pt-7">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mediterranean" />
                  <div>
                    <p className="text-sm font-semibold text-night">Sede</p>
                    <address className="mt-2 not-italic text-sm leading-[1.75] text-night/60">{company.sedeLegale}<br />{company.cap} {company.comune}<br />{company.regione}</address>
                  </div>
                </div>
                <p className="mt-7 text-xs leading-[1.8] text-night/45">{company.areaOperativa}</p>
              </div>

              <div className="mt-10 border-t border-night/15 pt-7">
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-night/40">Il percorso</p>
                <div className="mt-5 space-y-4">
                  {['Primo inquadramento', 'Definizione delle priorità', 'Proposta di percorso'].map((item, i) => (
                    <div key={item} className="grid grid-cols-[34px_1fr] items-center gap-3">
                      <span className="editorial-index text-lg text-mediterranean">0{i + 1}</span>
                      <span className="text-sm text-night/65">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.08}>
            <div className="relative overflow-hidden bg-paper p-6 shadow-[0_24px_80px_rgba(9,13,14,.08)] sm:p-8 lg:p-10 xl:p-12">
              <div className="absolute inset-x-0 top-0 h-px hairline-dark" />
              <div className="mb-9 grid gap-4 border-b border-night/10 pb-7 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <span className="section-kicker">Richiesta consulenza</span>
                  <h2 className="mt-5 max-w-2xl text-3xl font-heading leading-[.98] text-night sm:text-4xl lg:text-5xl">Descrivici ciò che conta davvero.</h2>
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-[.2em] text-night/30">Risposta diretta</span>
              </div>
              <ContactForm initialArea={area} />
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
