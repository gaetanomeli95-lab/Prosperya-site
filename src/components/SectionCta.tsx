'use client';

import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { home } from '@/data/content';
import { company } from '@/data/company';
import { FadeIn } from './MotionWrapper';

export function SectionCta() {
  return (
    <section className="relative overflow-hidden bg-[#D9D2C6] py-20 lg:py-28">
      <div className="absolute left-[-7rem] top-[-5rem] h-72 w-72 rounded-full bg-white/30 blur-3xl" />
      <div className="mx-auto max-w-[1480px] px-5 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden border border-white/10 bg-[#0B1011] px-6 py-10 text-white shadow-[0_30px_100px_rgba(9,13,14,.20)] sm:px-9 sm:py-12 lg:px-12 lg:py-16">
            <div className="absolute inset-0 prosperya-grid opacity-25" />
            <div className="absolute right-[-9rem] top-[-9rem] h-[28rem] w-[28rem] rounded-full bg-mediterranean/12 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
              <div>
                <div className="flex items-center gap-3"><span className="h-px w-8 bg-sand" /><span className="eyebrow !text-white/36">Private advisory</span></div>
                <h2 className="mt-6 max-w-4xl text-[clamp(2.8rem,6vw,6rem)] font-heading leading-[.92] tracking-[-.04em] !text-white">{home.finalCta.title}</h2>
                <p className="mt-6 max-w-2xl text-sm leading-[1.8] !text-white/56 sm:text-base">{home.finalCta.text}</p>
              </div>

              <div className="lg:justify-self-end lg:min-w-[360px]">
                <Link href="/contatti/" className="premium-button-light group w-full justify-between sm:w-auto lg:w-full">
                  {home.finalCta.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  <a href={`tel:${company.telefono.replace(/\s/g, '')}`} className="group flex items-center justify-between gap-4 py-4 text-sm !text-white/58 transition-colors hover:!text-white">
                    <span className="flex items-center gap-3"><Phone className="h-4 w-4 text-sand" />{company.telefono}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a href={`mailto:${company.emailDirezione}`} className="group flex items-center justify-between gap-4 py-4 text-sm !text-white/58 transition-colors hover:!text-white">
                    <span className="flex min-w-0 items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-sand" /><span className="truncate">{company.emailDirezione}</span></span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 opacity-35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
