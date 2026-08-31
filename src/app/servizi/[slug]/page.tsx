import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { consultationConfig, isPaidConsultationSlug } from '@/data/consultations';
import { FadeIn } from '@/components/MotionWrapper';
import { ArrowLeft, ArrowUpRight, CalendarDays, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Servizio non trovato' };
  return {
    title: service.title,
    description: service.promise,
    alternates: { canonical: `/servizi/${service.slug}/` },
  };
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const isPaidConsultation = isPaidConsultationSlug(service.slug);
  const paymentUrl = service.slug === 'startup'
    ? process.env.NEXT_PUBLIC_STARTUP_PAYMENT_URL
    : service.slug === 'finanza-agevolata'
      ? process.env.NEXT_PUBLIC_FINANZA_PAYMENT_URL
      : undefined;
  const contactArea = encodeURIComponent(service.title);
  const ctaHref = isPaidConsultation && paymentUrl ? paymentUrl : `/contatti/?area=${contactArea}`;
  const ctaLabel = isPaidConsultation
    ? paymentUrl ? 'Prenota e paga la consulenza' : 'Richiedi la consulenza'
    : 'Richiedi un confronto';

  return (
    <div className="premium-page">
      <div className="absolute inset-x-0 top-0 h-[38rem] bg-[linear-gradient(180deg,#090D0E_0%,#101718_66%,transparent_100%)]" />
      <div className="absolute left-[-9rem] top-40 h-[26rem] w-[26rem] rounded-full bg-mediterranean/10 blur-3xl" />

      <div className="premium-container">
        <Link href="/servizi/" className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] !text-white/60 transition-colors hover:!text-white">
          <ArrowLeft className="h-4 w-4" /> Tutti i servizi
        </Link>

        <section className="premium-panel-dark dark-surface relative overflow-hidden p-6 sm:p-9 lg:p-12 xl:p-14">
          <div className="absolute inset-0 prosperya-grid opacity-20" />
          <div className="absolute inset-x-0 top-0 h-px hairline-light" />
          <div className="absolute right-[-10rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full border border-white/10" />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="flex items-center gap-4">
                  <span className="editorial-index text-2xl text-sand">{String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px w-10 bg-white/20" />
                  <span className="eyebrow !text-white/50">Advisory service</span>
                </div>
                <h1 className="mt-7 max-w-5xl text-[clamp(3.2rem,7vw,7.4rem)] font-heading leading-[.88] tracking-[-.045em] !text-white">{service.title}</h1>
              </FadeIn>
            </div>
            <div className="lg:col-span-4">
              <FadeIn delay={0.1}>
                <p className="max-w-lg text-sm leading-[1.8] !text-white/70 sm:text-base">{service.promise}</p>
                <div className="mt-8 grid gap-3">
                  {service.bullets.map((item, i) => (
                    <div key={item} className="grid grid-cols-[28px_1fr] gap-3 border-t border-white/10 pt-3">
                      <span className="editorial-index text-sm text-sand">0{i + 1}</span>
                      <span className="text-xs leading-[1.6] !text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
          <div className="relative overflow-hidden bg-paper p-6 paper-noise shadow-[0_24px_80px_rgba(9,13,14,.08)] sm:p-8 lg:p-10 xl:p-12">
            <div className="absolute inset-x-0 top-0 h-px hairline-dark" />
            <FadeIn>
              <div className="flex items-center justify-between gap-4">
                <span className="section-kicker">Ambito di intervento</span>
                <span className="hidden text-[9px] font-semibold uppercase tracking-[.18em] text-night/40 sm:block">Prosperya framework</span>
              </div>
              <div className="mt-8 divide-y divide-night/10 border-y border-night/10">
                {service.full.map((item, i) => (
                  <div key={item} className="group grid grid-cols-[42px_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[54px_1fr_auto] sm:py-6">
                    <span className="editorial-index text-xl text-mediterranean/80">{String(i + 1).padStart(2, '0')}</span>
                    <p className={`text-base leading-relaxed sm:text-lg ${item === 'Growth Factors' ? 'font-semibold text-night' : 'text-anthracite/80'}`}>{item}</p>
                    <span className="h-1.5 w-1.5 rounded-full bg-mediterranean/40 transition-transform group-hover:scale-150" />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <aside className="relative overflow-hidden bg-[#0A0F10] p-6 text-white shadow-[0_24px_80px_rgba(9,13,14,.16)] sm:p-8 lg:p-9">
            <div className="absolute inset-0 prosperya-grid opacity-15" />
            <div className="absolute inset-x-0 top-0 h-px hairline-light" />
            <div className="relative">
              <span className="section-kicker-dark">Approccio</span>
              <h2 className="mt-6 text-3xl font-heading leading-[1] !text-white sm:text-4xl">Dalla decisione all’esecuzione.</h2>
              <p className="mt-6 text-sm leading-[1.8] !text-white/70">L’intervento viene dimensionato sul contesto reale, sulle priorità e sul livello di complessità dell’impresa.</p>

              {isPaidConsultation && (
                <div className="mt-7 border border-white/12 bg-white/[0.045] p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[.2em] !text-white/40">Consulenza iniziale</p>
                      <p className="mt-2 text-4xl font-heading !text-white">€{consultationConfig.price}</p>
                    </div>
                    <span className="pb-1 text-[10px] font-semibold uppercase tracking-[.16em] !text-sand/80">{consultationConfig.vatLabel}</span>
                  </div>
                  <div className="mt-5 flex items-start gap-3 border-t border-white/10 pt-4">
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-sand" />
                    <p className="text-xs leading-[1.7] !text-white/62">{consultationConfig.availableDays}, nella fascia {consultationConfig.availableHours}.</p>
                  </div>
                  <p className="mt-4 text-[11px] leading-[1.7] !text-white/45">{consultationConfig.creditNote}</p>
                </div>
              )}

              <Link
                href={ctaHref}
                target={paymentUrl ? '_blank' : undefined}
                rel={paymentUrl ? 'noopener noreferrer' : undefined}
                className="group mt-8 flex min-h-14 w-full items-center justify-between border border-sand/40 bg-sand/[0.06] px-5 text-sm font-semibold !text-white transition-all hover:bg-sand hover:!text-night"
              >
                <span className="flex items-center gap-2">{isPaidConsultation && <CreditCard className="h-4 w-4" />}{ctaLabel}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              {isPaidConsultation && !paymentUrl && (
                <p className="mt-4 text-[11px] leading-relaxed !text-white/50">La prenotazione con pagamento online sarà disponibile dopo il collegamento di Stripe e Google Calendar. Nel frattempo puoi inviare la richiesta.</p>
              )}

              <div className="mt-10 border-t border-white/10 pt-7">
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] !text-white/35">Prosperya standard</p>
                <div className="mt-5 space-y-4">
                  {['Analisi prima della proposta', 'Referente e regia coordinata', 'Obiettivi e avanzamento misurabili'].map((item, i) => (
                    <div key={item} className="grid grid-cols-[32px_1fr] gap-3 border-t border-white/10 pt-4">
                      <span className="editorial-index text-lg text-sand">0{i + 1}</span>
                      <p className="text-sm leading-relaxed !text-white/65">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
