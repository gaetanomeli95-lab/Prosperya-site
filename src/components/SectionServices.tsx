'use client';

import { services, homeServices } from '@/data/services';
import { ServiceCard } from './ServiceCard';
import { FadeIn } from './MotionWrapper';

export function SectionServices() {
  return (
    <section id="servizi" className="relative overflow-hidden bg-[#DCD6CB] py-24 lg:py-36">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#EEE9DF] to-transparent" />
      <div className="absolute left-[8%] top-36 h-64 w-64 rounded-full bg-white/35 blur-3xl" />
      <div className="absolute right-[-6rem] bottom-12 h-80 w-80 rounded-full bg-mediterranean/8 blur-3xl" />

      <div className="relative max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-3">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-mediterranean" />
                <span className="eyebrow text-night/42">I nostri servizi</span>
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
                Un sistema integrato di servizi per affrontare sviluppo, controllo, finanza, internazionalizzazione e nuove iniziative imprenditoriali.
              </p>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.08}>
          <div className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
            {homeServices.map((item, i) => (
              <div key={item} className={`min-h-[82px] border px-4 py-4 flex items-center gap-3 ${i % 5 === 0 ? 'bg-night border-night' : 'bg-paper/80 border-night/10'}`}>
                <span className={`font-heading italic text-lg ${i % 5 === 0 ? 'text-sand' : 'text-mediterranean'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className={`text-xs sm:text-[13px] font-semibold tracking-[0.05em] leading-snug ${i % 5 === 0 ? '!text-white/90' : 'text-night/78'}`}>{item}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
