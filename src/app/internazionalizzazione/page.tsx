import type { Metadata } from 'next';
import { home } from '@/data/content';
import { MapNetwork } from '@/components/MapNetwork';
import { FadeIn } from '@/components/MotionWrapper';

export const metadata: Metadata = {
  title: 'Internazionalizzazione',
  description: 'Prosperya supporta l’ingresso nei mercati esteri, investitori stranieri in Italia e progetti tra Europa e area magrebina.',
  alternates: { canonical: '/internazionalizzazione/' },
};

export default function Internazionalizzazione() {
  return (
    <div className="pt-24 lg:pt-32 pb-20 lg:pb-28 bg-night text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-white leading-tight mb-6">
              {home.international.title}
            </h1>
            <p className="text-lg text-white/85 leading-relaxed mb-8">
              {home.international.text}
            </p>
            <div className="space-y-4 text-white/80">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white mb-2">Per le aziende italiane</h2>
                <p className="text-sm leading-relaxed">Ingresso nei mercati esteri, market entry e supporto operativo in Europa e area magrebina.</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white mb-2">Per gli investitori esteri</h2>
                <p className="text-sm leading-relaxed">Assistenza per investimenti in Italia, supporto nella costituzione, nel controllo e nella gestione operativa.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <MapNetwork />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
