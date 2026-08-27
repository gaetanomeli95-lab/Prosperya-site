'use client';

import { services } from '@/data/services';
import { ServiceCard } from './ServiceCard';
import { FadeIn } from './MotionWrapper';

export function SectionServices() {
  return (
    <section id="servizi" className="py-20 lg:py-28 bg-stone-warm/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-night leading-tight mb-5">
              Aree di intervento
            </h2>
            <p className="text-lg text-anthracite/90 leading-relaxed">
              Sei ambiti di consulenza per affiancare l’impresa nelle scelte strategiche, operative e di sviluppo.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
