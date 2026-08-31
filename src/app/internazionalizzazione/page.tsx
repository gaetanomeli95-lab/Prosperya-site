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

const desks = [
  ['01', 'Aziende italiane', 'Market Entry e supporto operativo per l’ingresso e lo sviluppo nei mercati esteri.'],
  ['02', 'Investitori esteri', 'Invest in Italy, costituzione, controllo e gestione operativa sul territorio italiano.'],
  ['03', 'Regia internazionale', 'Coordinamento tra mercati, interlocutori, struttura e priorità operative.'],
];

const geographies = [
  ['Europa occidentale', 'Italia · Paesi Bassi · Francia · Germania · Spagna'],
  ['Europa orientale', 'Romania · Bulgaria'],
  ['Mediterraneo', 'Tunisia · Area magrebina'],
];

export default function Internazionalizzazione() {
  return (
    <div className="premium-page !bg-[#E7E0D6]">
      <div className="absolute inset-x-0 top-0 h-[42rem] bg-[linear-gradient(180deg,#122326_0%,#18363A_68%,transparent_100%)]" />
      <div className="absolute left-[-9rem] top-24 h-[30rem] w-[30rem] rounded-full bg-mediterranean/18 blur-3xl" />

      <div className="premium-container">
        <section className="relative overflow-hidden border border-white/10 bg-[linear-gradient(135deg,#19383B_0%,#13272A_100%)] p-6 text-white shadow-[0_28px_100px_rgba(6,12,13,.22)] sm:p-9 lg:p-12 xl:p-14">
          <div className="absolute inset-0 prosperya-grid opacity-24" />
          <div className="absolute right-[-10rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[#2F7775]/18 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="flex items-center gap-3"><span className="h-px w-8 bg-sand" /><span className="eyebrow !text-white/55">Cross-border advisory</span></div>
                <h1 className="mt-7 max-w-5xl text-[clamp(3rem,6.5vw,6.7rem)] font-heading leading-[.9] tracking-[-.045em] !text-white">{home.international.title}</h1>
              </FadeIn>
            </div>
            <div className="lg:col-span-4">
              <FadeIn delay={0.1}>
                <p className="max-w-lg text-sm leading-[1.8] !text-white/72 sm:text-base">{home.international.text}</p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="mt-6 overflow-hidden border border-night/10 bg-[#F3EEE5] shadow-[0_22px_70px_rgba(9,13,14,.07)]">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <div className="border-b border-night/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10 xl:p-12">
              <FadeIn>
                <span className="section-kicker">International desk</span>
                <h2 className="mt-6 max-w-2xl text-[clamp(2.6rem,4.6vw,5.2rem)] font-heading leading-[.94] text-night">Tre direttrici. Una sola regia.</h2>
              </FadeIn>

              <div className="mt-10 border-y border-night/14">
                {desks.map(([n, title, text], i) => (
                  <FadeIn key={title} delay={i * 0.05}>
                    <article className="group grid gap-4 border-b border-night/10 py-7 last:border-b-0 sm:grid-cols-[54px_.7fr_1fr] sm:items-start lg:grid-cols-[54px_1fr] xl:grid-cols-[58px_.72fr_1.1fr]">
                      <span className="editorial-index text-3xl text-mediterranean">{n}</span>
                      <h3 className="text-2xl font-heading leading-none text-night sm:text-3xl">{title}</h3>
                      <p className="text-sm leading-[1.8] text-anthracite/68 sm:col-start-2 lg:col-start-2 xl:col-start-auto">{text}</p>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden bg-[linear-gradient(145deg,#21464A_0%,#173438_100%)] p-4 sm:p-7 lg:p-9 xl:p-10">
              <div className="absolute inset-0 prosperya-grid opacity-17" />
              <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-logo-blue/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-end justify-between gap-5 border-b border-white/10 pb-5">
                  <div>
                    <p className="eyebrow !text-white/48">Operating network</p>
                    <h2 className="mt-3 text-3xl font-heading !text-white sm:text-4xl">Europa · Mediterraneo</h2>
                  </div>
                  <span className="hidden text-[9px] font-semibold uppercase tracking-[.2em] !text-sand/65 sm:block">Sicilia come hub</span>
                </div>
                <MapNetwork />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          <div className="border border-night/10 bg-[#F5F0E8] p-6 paper-noise sm:p-8 lg:p-10 xl:p-12">
            <div className="grid gap-8 sm:grid-cols-[.7fr_1.3fr] sm:items-start">
              <div>
                <span className="section-kicker">Geografie operative</span>
                <p className="mt-6 max-w-xs text-sm leading-[1.8] text-night/58">Una rete costruita per leggere mercati diversi senza perdere il controllo della regia.</p>
              </div>
              <div className="border-y border-night/14">
                {geographies.map(([label, places], i) => (
                  <div key={label} className="grid gap-3 border-b border-night/10 py-6 last:border-b-0 sm:grid-cols-[48px_.65fr_1fr] sm:items-center">
                    <span className="editorial-index text-2xl text-mediterranean">0{i + 1}</span>
                    <h3 className="text-xl font-heading text-night">{label}</h3>
                    <p className="text-xs leading-[1.75] text-night/52">{places}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#1C3B3F] p-7 text-white sm:p-9 lg:p-10">
            <div className="absolute inset-0 prosperya-grid opacity-16" />
            <div className="absolute right-[-8rem] top-[-7rem] h-72 w-72 rounded-full bg-logo-green/12 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="eyebrow !text-sand/72">Progetto internazionale</p>
                <h2 className="mt-5 text-4xl font-heading leading-[.98] !text-white">Valutiamo insieme mercato, struttura e priorità.</h2>
                <p className="mt-6 text-sm leading-[1.8] !text-white/62">Prima di aprire un nuovo mercato definiamo obiettivi, rischi, interlocutori e modello operativo.</p>
              </div>
              <Link href="/contatti/" className="group mt-10 flex min-h-14 items-center justify-between border border-sand/45 bg-sand/[0.08] px-5 text-sm font-semibold !text-white transition-all hover:bg-sand hover:!text-night">
                Richiedi un confronto <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
