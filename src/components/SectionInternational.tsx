'use client';

import { home } from '@/data/content';
import { MapNetwork } from './MapNetwork';
import { FadeIn } from './MotionWrapper';

export function SectionInternational() {
  return (
    <section className="py-20 lg:py-28 bg-night text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white leading-tight mb-6">
                {home.international.title}
              </h2>
              <p className="text-base lg:text-lg text-white/80 leading-relaxed mb-8">
                {home.international.text}
              </p>
              <ul className="space-y-3 text-sm lg:text-base text-white/70">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-logo-blue" />
                  Italia, Paesi Bassi, Francia, Germania, Spagna
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-logo-green" />
                  Romania, Bulgaria
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-logo-magenta" />
                  Tunisia e area magrebina
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <MapNetwork />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
