import type { Metadata } from 'next';
import Link from 'next/link';
import { serviceCatalog } from '@/data/services';
import { FadeIn } from '@/components/MotionWrapper';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Servizi',
  description: 'I quattordici servizi di Prosperya: Start Up, Market Entry, Invest in Italy, rinegoziazione bancaria, Growth Factors, controllo di gestione, finanza agevolata e altri servizi specialistici.',
  alternates: { canonical: '/servizi/' },
};

export default function Servizi() {
  return (
    <div className="pt-24 lg:pt-32 pb-20 lg:pb-28 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <FadeIn>
          <span className="eyebrow text-night/42">Prosperya advisory</span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-heading text-night mb-6">I nostri servizi</h1>
          <p className="text-lg lg:text-xl text-anthracite leading-relaxed max-w-3xl mb-14">
            Quattordici servizi specifici per affiancare imprese, imprenditori e investitori nelle scelte strategiche, finanziarie, operative e di sviluppo.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
          {serviceCatalog.map((service, i) => {
            const featured = i % 5 === 0;
            return (
              <FadeIn key={service.title} delay={i * 0.025}>
                <Link
                  href={service.href}
                  className={`group min-h-[190px] border p-5 lg:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${featured ? 'bg-night border-night' : 'bg-white border-stone-warm hover:border-night/20'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={`font-heading italic text-2xl ${featured ? 'text-sand' : 'text-mediterranean'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <ArrowUpRight className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${featured ? 'text-white/60' : 'text-night/35'}`} />
                  </div>
                  <div>
                    <p className={`mb-2 text-[10px] uppercase tracking-[0.16em] ${featured ? '!text-white/35' : 'text-night/35'}`}>{service.area}</p>
                    <h2 className={`text-xl lg:text-2xl font-heading leading-tight ${featured ? '!text-white' : 'text-night'}`}>{service.title}</h2>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
}
