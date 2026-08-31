'use client';

import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { home } from '@/data/content';
import { company } from '@/data/company';
import { FadeIn } from './MotionWrapper';

export function SectionCta() {
  return (
    <section className="relative overflow-hidden bg-[#D8D1C5] py-16 sm:py-20 lg:py-28">
      <div className="absolute inset-0 paper-noise opacity-55" />
      <div className="section-frame relative">
        <FadeIn>
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#213236_0%,#172326_100%)] px-6 py-10 text-white shadow-[0_35px_120px_rgba(9,13,14,.18)] sm:px-9 sm:py-14 lg:px-12 lg:py-16 xl:px-14">
            <div className="absolute inset-0 prosperya-grid opacity-18" />
            <div className="absolute right-[-10rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-mediterranean/15 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px hairline-light" />

            <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-end">
              <div className="lg:col-span-8">
                <span className="section-kicker-dark">Private advisory</span>
                <h2 className="mt-7 max-w-5xl text-[clamp(2.8rem,6.2vw,7rem)] font-heading leading-[0.92] tracking-[-.045em] !text-white">{home.finalCta.title}</h2>
                <p className="mt-7 max-w-2xl text-sm leading-[1.8] !text-white/72 sm:text-base">{home.finalCta.text}</p>
              </div>

              <div className="lg:col-span-4">
                <Link href="/contatti/" className="group flex min-h-14 items-center justify-between border border-sand/50 bg-sand/[0.10] px-5 text-sm font-semibold !text-white transition-all duration-300 hover:border-sand hover:bg-sand hover:!text-night">
                  {home.finalCta.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <div className="mt-6 border-y border-white/15">
                  <a href={`tel:${company.telefono.replace(/\s/g, '')}`} className="group flex min-h-12 items-center justify-between gap-4 py-4 text-sm !text-white/72 transition-colors hover:!text-white">
                    <span className="flex items-center gap-3"><Phone className="h-4 w-4 text-sand" />{company.telefono}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a href={`mailto:${company.emailDirezione}`} className="group flex min-h-12 items-center justify-between gap-4 border-t border-white/15 py-4 text-sm !text-white/72 transition-colors hover:!text-white">
                    <span className="flex min-w-0 items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-sand" /><span className="truncate">{company.emailDirezione}</span></span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
