import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/data/services';
import { FadeIn } from '@/components/MotionWrapper';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Servizi',
  description: 'Le aree di intervento di Prosperya: governance e controllo, sviluppo e risorse, Start Up, creazione NewCo, internazionalizzazione, ristrutturazione debiti e finanza agevolata.',
  alternates: { canonical: '/servizi/' },
};

export default function Servizi() {
  return (
    <div className="pt-24 lg:pt-32 pb-20 lg:pb-28 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-night mb-6">Servizi</h1>
          <p className="text-lg lg:text-xl text-anthracite leading-relaxed max-w-3xl mb-14">
            Sette ambiti di consulenza per affiancare l’impresa nelle scelte strategiche, operative, finanziarie e di sviluppo.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <FadeIn key={service.slug} delay={i * 0.06}>
              <div className="group p-6 lg:p-8 bg-white border border-stone-warm rounded-sm h-full flex flex-col">
                <h2 className="text-2xl font-heading text-night mb-3">{service.title}</h2>
                <p className="text-base text-anthracite/90 leading-relaxed mb-5 flex-grow">{service.promise}</p>
                <ul className="mb-6 space-y-2">
                  {service.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-anthracite/80">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-logo-magenta flex-shrink-0" />
                      <span className={b === 'Growth Factors' ? 'font-bold text-night' : ''}>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/servizi/${service.slug}/`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-mediterranean group-hover:text-mediterranean-light transition-colors"
                >
                  Approfondisci <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
