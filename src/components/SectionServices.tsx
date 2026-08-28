'use client';

import { services } from '@/data/services';
import { ServiceCard } from './ServiceCard';
import { FadeIn } from './MotionWrapper';

export function SectionServices() {
  return (
    <section id="servizi" className="relative overflow-hidden bg-[#DCD6CB] py-24 lg:py-36">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#EEE9DF] to-transparent" />
      <div className="absolute left-[8%] top-36 h-64 w-64 rounded-full bg-white/35 blur-3xl" />
      <div className="absolute right-[-6rem] bottom-12 h-80 w-80 rounded-full bg-mediterranean/8 blur-3xl" />

      <div className="relative max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-16 lg:mb-20">
          <div className="lg:col-span-3">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-mediterranean" />
                <span className="eyebrow text-night/42">Aree di intervento</span>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-6">
            <FadeIn delay={0.05}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading leading-[0.98] text-night">
                Competenze diverse. Una sola regia strategica.
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-3">
            <FadeIn delay={0.12}>
              <p className="text-sm lg:text-[15px] leading-relaxed text-anthracite/68">
                Sei aree che si integrano tra loro per affrontare crescita, controllo, cambiamento e sviluppo internazionale.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
