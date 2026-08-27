import type { Metadata } from 'next';
import { about } from '@/data/content';
import { FadeIn } from '@/components/MotionWrapper';

export const metadata: Metadata = {
  title: 'Chi siamo',
  description: 'La storia, i valori e l’approccio di Prosperya S.R.L.: consulenza imprenditoriale e gestionale tra Sicilia, Italia, Europa e area mediterranea.',
  alternates: { canonical: '/chi-siamo/' },
};

export default function ChiSiamo() {
  return (
    <div className="pt-24 lg:pt-32 pb-20 lg:pb-28 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-night mb-8">{about.title}</h1>
          <p className="text-lg lg:text-xl text-anthracite leading-relaxed max-w-3xl mb-16">
            {about.intro}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {about.points.map((point, i) => (
            <FadeIn key={point.title} delay={i * 0.1}>
              <div className="p-6 lg:p-8 bg-white border border-stone-warm rounded-sm h-full">
                <h2 className="text-2xl font-heading text-night mb-3">{point.title}</h2>
                <p className="text-base text-anthracite/90 leading-relaxed">{point.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
