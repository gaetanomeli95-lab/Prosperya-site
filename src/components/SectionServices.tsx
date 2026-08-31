import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { serviceCatalog } from '@/data/services';
import { FadeIn } from './MotionWrapper';
import { ServiceCatalogGrid } from './ServiceCatalogGrid';

export function SectionServices() {
  return (
    <section id="servizi" className="relative overflow-hidden bg-[#D9D2C6] py-24 lg:py-40">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#EEE9DF] via-[#E7E1D7] to-transparent" />
      <div className="absolute left-[4%] top-36 h-80 w-80 rounded-full bg-white/35 blur-3xl" />
      <div className="absolute right-[-7rem] bottom-16 h-[26rem] w-[26rem] rounded-full bg-mediterranean/[0.08] blur-3xl" />
      <div className="absolute inset-0 paper-noise opacity-35" />

      <div className="section-frame relative">
        <div className="grid gap-10 border-b border-night/15 pb-12 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-14">
          <div className="lg:col-span-3">
            <FadeIn>
              <span className="section-kicker">I nostri servizi</span>
            </FadeIn>
          </div>

          <div className="lg:col-span-6">
            <FadeIn delay={0.05}>
              <h2 className="max-w-4xl text-[clamp(3rem,5.4vw,6.1rem)] font-heading leading-[0.9] tracking-[-.045em] text-night">
                {serviceCatalog.length} servizi. <span className="italic text-night/55">Una sola regia strategica.</span>
              </h2>
            </FadeIn>
          </div>

          <div className="lg:col-span-3">
            <FadeIn delay={0.1}>
              <p className="max-w-sm text-sm leading-[1.8] text-anthracite/65 lg:text-[15px]">
                Ogni servizio è un punto d’ingresso diretto a competenze integrate, con un unico coordinamento strategico.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="mt-10">
          <ServiceCatalogGrid compact />
        </div>

        <FadeIn delay={0.12} className="mt-10 flex justify-end">
          <Link href="/servizi/" className="group inline-flex min-h-12 items-center gap-3 border border-night/20 px-5 text-sm font-semibold text-night transition-colors hover:bg-night hover:text-white">
            Esplora il portfolio completo
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
