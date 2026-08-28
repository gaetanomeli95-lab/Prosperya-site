import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
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
    <div className="premium-page">
      <div className="absolute inset-x-0 top-0 h-[39rem] bg-[linear-gradient(180deg,#090D0E_0%,#0E1516_68%,transparent_100%)]" />
      <div className="absolute left-[-9rem] top-24 h-[30rem] w-[30rem] rounded-full bg-mediterranean/10 blur-3xl" />

      <div className="premium-container">
        <section className="premium-panel-dark dark-surface relative overflow-hidden p-6 sm:p-9 lg:p-12 xl:p-14">
          <div className="absolute inset-0 prosperya-grid opacity-30" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="flex items-center gap-3"><span className="h-px w-8 bg-sand" /><span className="eyebrow !text-white/50">Cross-border advisory</span></div>
                <h1 className="mt-7 max-w-5xl text-[clamp(3rem,6.5vw,6.7rem)] font-heading leading-[.9] tracking-[-.045em] !text-white">{home.international.title}</h1>
              </FadeIn>
            </div>
            <div className="lg:col-span-4">
              <FadeIn delay={0.1}>
                <p className="max-w-lg text-sm leading-[1.8] !text-white/70 sm:text-base">{home.international.text}</p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-4">
            {[
              ['01', 'Per le aziende italiane', 'Ingresso nei mercati esteri, Market Entry e supporto operativo in Europa e area magrebina.'],
              ['02', 'Per gli investitori esteri', 'Assistenza per investimenti in Italia, supporto nella costituzione, nel controllo e nella gestione operativa.'],
              ['03', 'Regia internazionale', 'Coordinamento strategico tra mercati, interlocutori e priorità operative.'],
            ].map(([n, title, text], i) => {
              const dark = i === 1;
              return (
                <FadeIn key={title} delay={i * 0.06}>
                  <article className={`premium-card p-6 sm:p-8 ${dark ? 'dark-surface !border-night !bg-night' : ''}`}>
                    <div className="flex items-start justify-between gap-4">
                      <span className={`font-heading italic text-2xl ${dark ? 'text-sand' : 'text-mediterranean'}`}>{n}</span>
                      <span className={`text-[9px] font-semibold uppercase tracking-[.2em] ${dark ? '!text-white/50' : 'text-night/40'}`}>International desk</span>
                    </div>
                    <h2 className={`mt-10 text-3xl font-heading leading-[1] ${dark ? '!text-white' : 'text-night'}`}>{title}</h2>
                    <p className={`mt-5 text-sm leading-[1.75] ${dark ? '!text-white/70' : 'text-anthracite/70'}`}>{text}</p>
                  </article>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.12}>
            <div className="premium-panel-dark dark-surface relative overflow-hidden p-4 sm:p-7 lg:p-10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand/80 to-transparent" />
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow !text-white/50">Operating network</p>
                  <h2 className="mt-3 text-3xl font-heading !text-white sm:text-4xl">Europa · Mediterraneo</h2>
                </div>
                <span className="hidden text-[9px] font-semibold uppercase tracking-[.2em] !text-white/40 sm:block">Sicilia come hub</span>
              </div>
              <MapNetwork />
            </div>
          </FadeIn>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
          <div className="premium-hero p-7 sm:p-9 lg:p-12">
            <p className="eyebrow text-night/40">Geografie operative</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Europa occidentale', 'Italia · Paesi Bassi · Francia · Germania · Spagna'],
                ['Europa orientale', 'Romania · Bulgaria'],
                ['Mediterraneo', 'Tunisia · Area magrebina'],
              ].map(([label, places], i) => (
                <div key={label} className="border-t border-night/10 pt-5">
                  <span className="font-heading italic text-xl text-mediterranean">0{i + 1}</span>
                  <h3 className="mt-5 text-lg font-heading text-night">{label}</h3>
                  <p className="mt-3 text-xs leading-[1.7] text-night/50">{places}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-panel-dark dark-surface flex flex-col justify-between p-7 sm:p-9 lg:p-10">
            <div>
              <p className="eyebrow !text-sand/70">Progetto internazionale</p>
              <h2 className="mt-5 text-4xl font-heading leading-[.98] !text-white">Valutiamo insieme mercato, struttura e priorità.</h2>
            </div>
            <Link href="/contatti/" className="premium-button-light group mt-9 justify-between">
              Richiedi un confronto <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
