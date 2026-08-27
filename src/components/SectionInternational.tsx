'use client';

import { home } from '@/data/content';
import { MapNetwork } from './MapNetwork';
import { FadeIn } from './MotionWrapper';

export function SectionInternational() {
  return (
    <section className="relative overflow-hidden bg-night text-white py-24 lg:py-36">
      <div className="absolute inset-0 prosperya-grid opacity-40" />
      <div className="relative max-w-[1480px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <span className="eyebrow text-white/38">Cross-border advisory</span>
              <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-heading leading-[0.98] text-white">
                {home.international.title}
              </h2>
              <p className="mt-7 max-w-lg text-base lg:text-lg leading-[1.75] text-white/66">
                {home.international.text}
              </p>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="mt-10 border-t border-white/12">
                {[
                  ['Europa occidentale', 'Italia · Paesi Bassi · Francia · Germania · Spagna'],
                  ['Europa orientale', 'Romania · Bulgaria'],
                  ['Mediterraneo', 'Tunisia · Area magrebina'],
                ].map(([label, places], i) => (
                  <div key={label} className="grid grid-cols-[28px_1fr] gap-4 py-5 border-b border-white/10">
                    <span className="font-heading italic text-lg text-sand/70">0{i + 1}</span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/36">{label}</p>
                      <p className="mt-1 text-sm text-white/72">{places}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn delay={0.15}>
              <div className="relative border border-white/10 bg-white/[0.025] p-4 sm:p-7 lg:p-10 shadow-float">
                <div className="absolute top-0 left-0 h-px w-24 bg-sand/70" />
                <MapNetwork />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
