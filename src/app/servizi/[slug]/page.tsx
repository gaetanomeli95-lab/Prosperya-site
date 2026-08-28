import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { FadeIn } from '@/components/MotionWrapper';
import { Link as LinkIcon, CreditCard } from 'lucide-react';
import LinkNext from 'next/link';

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

  const isStartup = service.slug === 'startup';
  const startupPaymentUrl = process.env.NEXT_PUBLIC_STARTUP_PAYMENT_URL;
  const ctaHref = isStartup && startupPaymentUrl ? startupPaymentUrl : '/contatti/';
  const ctaLabel = isStartup ? 'Richiedi una consulenza per la tua Start Up' : 'Richiedi un confronto';

  return (
    <div className="pt-24 lg:pt-32 pb-20 lg:pb-28 bg-warm-ivory">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-anthracite/70">
            <li><LinkNext href="/" className="hover:text-mediterranean">Home</LinkNext></li>
            <li aria-hidden="true">/</li>
            <li><LinkNext href="/servizi/" className="hover:text-mediterranean">Servizi</LinkNext></li>
            <li aria-hidden="true">/</li>
            <li className="text-night font-medium" aria-current="page">{service.title}</li>
          </ol>
        </nav>

        <FadeIn>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-night mb-6">{service.title}</h1>
          <p className="text-lg lg:text-xl text-anthracite leading-relaxed mb-12">{service.promise}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-xl font-heading text-night mb-4">Ambito di intervento</h2>
          <ul className="space-y-3 mb-12">
            {service.full.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-anthracite/90 py-2 border-b border-stone-warm">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-mediterranean flex-shrink-0" />
                <span className={item === 'Growth Factors' ? 'font-bold text-night' : ''}>{item}</span>
              </li>
            ))}
          </ul>

          <LinkNext
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-sm bg-mediterranean px-6 py-3.5 text-base font-medium text-white hover:bg-mediterranean-light transition-colors"
          >
            {isStartup ? <CreditCard className="w-4 h-4 mr-2" aria-hidden="true" /> : <LinkIcon className="w-4 h-4 mr-2" aria-hidden="true" />}
            {ctaLabel}
          </LinkNext>

          {isStartup && !startupPaymentUrl && (
            <p className="mt-4 text-sm text-anthracite/60">
              Il pagamento online sarà attivato sul pulsante non appena verrà configurato il link di pagamento della consulenza.
            </p>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
