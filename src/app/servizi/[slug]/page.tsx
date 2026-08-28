import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { FadeIn } from '@/components/MotionWrapper';
import { ArrowLeft, ArrowUpRight, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Servizio non trovato' };
  return {
    title: service.title,
    description: service.promise,
    alternates: { canonical: `/servizi/${service.slug}/` },
  };
}

export default function ServiceDetail({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const isStartup = service.slug === 'startup';
  const startupPaymentUrl = process.env.NEXT_PUBLIC_STARTUP_PAYMENT_URL;
  const ctaHref = isStartup && startupPaymentUrl ? startupPaymentUrl : '/contatti/';
  const ctaLabel = isStartup ? 'Richiedi una consulenza per la tua Start Up' : 'Richiedi un confronto';

  return (
    <div className="premium-page">
      <div className="absolute inset-x-0 top-0 h-[38rem] bg-[linear-gradient(180deg,#090D0E_0%,#101718_66%,transparent_100%)]" />
      <div className="absolute left-[-9rem] top-40 h-[26rem] w-[26rem] rounded-full bg-mediterranean/10 blur-3xl" />

      <div className="premium-container">
        <Link href="/servizi/" className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] !text-white/60 transition-colors hover:!text-white">
          <ArrowLeft className="h-4 w-4" /> Tutti i servizi
        </Link>

        <section className="premium-panel-dark dark-surface relative overflow-hidden p-6 sm:p-9 lg:p-12 xl:p-14">
          <div className="absolute inset-0 prosperya-grid opacity-30" />
          <div className="absolute right-[-10rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full border border-white/10" />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="flex items-center gap-4">
                  <span className="font-heading italic text-2xl text-sand">{String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px w-10 bg-white/20" />
                  <span className="eyebrow !text-white/50">Advisory service</span>
                </div>
                <h1 className="mt-7 max-w-5xl text-[clamp(3.2rem,7vw,7.4rem)] font-heading leading-[.88] tracking-[-.045em] !text-white">
                  {service.title}
                </h1>
              </FadeIn>
            </div>
            <div className="lg:col-span-4">
              <FadeIn delay={0.1}>
                <p className="max-w-lg text-sm leading-[1.8] !text-white/70 sm:text-base">{service.promise}</p>
                <div className="mt-8 grid gap-3">
                  {service.bullets.map((item, i) => (
                    <div key={item} className="grid grid-cols-[28px_1fr] gap-3 border-t border-white/10 pt-3">
                      <span className="font-heading italic text-sm text-sand">0{i + 1}</span>
                      <span className="text-xs leading-[1.6] !text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
          <div className="premium-hero p-6 paper-noise sm:p-8 lg:p-10 xl:p-12">
            <FadeIn>
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-night/40">Ambito di intervento</p>
                <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-night/40">Prosperya framework</span>
              </div>
              <div className="mt-8 divide-y divide-night/10 border-y border-night/10">
                {service.full.map((item, i) => (
                  <div key={item} className="group grid grid-cols-[42px_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[54px_1fr_auto] sm:py-6">
                    <span className="font-heading italic text-xl text-mediterranean/80">{String(i + 1).padStart(2, '0')}</span>
                    <p className={`text-base leading-relaxed sm:text-lg ${item === 'Growth Factors' ? 'font-semibold text-night' : 'text-anthracite/80'}`}>{item}</p>
                    <span className="h-1.5 w-1.5 rounded-full bg-mediterranean/40 transition-transform group-hover:scale-150" />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <aside className="space-y-4">
            <div className="premium-panel-dark dark-surface p-6 sm:p-8 lg:p-9">
              <p className="eyebrow !text-sand/70">Approccio</p>
              <h2 className="mt-5 text-3xl font-heading leading-[1] !text-white sm:text-4xl">Dalla decisione all’esecuzione.</h2>
              <p className="mt-6 text-sm leading-[1.8] !text-white/70">L’intervento viene dimensionato sul contesto reale, sulle priorità e sul livello di complessità dell’impresa.</p>

              <Link href={ctaHref} className="premium-button-light group mt-8 w-full justify-between">
                <span className="flex items-center gap-2">{isStartup && <CreditCard className="h-4 w-4" />}{ctaLabel}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              {isStartup && !startupPaymentUrl && (
                <p className="mt-4 text-[11px] leading-relaxed !text-white/50">Il pagamento online sarà attivato qui non appena verrà configurato il link di pagamento della consulenza.</p>
              )}
            </div>

            <div className="premium-card p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-night/40">Prosperya standard</p>
              <div className="mt-6 grid gap-4">
                {['Analisi prima della proposta', 'Referente e regia coordinata', 'Obiettivi e avanzamento misurabili'].map((item, i) => (
                  <div key={item} className="flex items-start gap-3 border-t border-night/10 pt-4">
                    <span className="font-heading italic text-lg text-mediterranean">0{i + 1}</span>
                    <p className="text-sm leading-relaxed text-night/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
