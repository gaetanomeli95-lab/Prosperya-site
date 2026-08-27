'use client';

import Link from 'next/link';
import { home } from '@/data/content';
import { company } from '@/data/company';
import { Phone, Mail } from 'lucide-react';
import { FadeIn } from './MotionWrapper';

export function SectionCta() {
  return (
    <section className="py-20 lg:py-28 bg-mediterranean text-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white leading-tight mb-5">
            {home.finalCta.title}
          </h2>
          <p className="text-lg text-white/85 leading-relaxed mb-10">
            {home.finalCta.text}
          </p>
          <Link
            href="/contatti/"
            className="inline-flex items-center justify-center rounded-sm bg-night px-8 py-4 text-base font-medium text-white hover:bg-night-light transition-colors focus:outline-none focus:ring-2 focus:ring-logo-yellow focus:ring-offset-2 focus:ring-offset-mediterranean"
          >
            {home.finalCta.cta}
          </Link>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
            <a
              href={`tel:${company.telefono.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {company.telefono}
            </a>
            <a
              href={`mailto:${company.emailDirezione}`}
              className="flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {company.emailDirezione}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
