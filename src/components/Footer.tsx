import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { legalNav } from '@/data/navigation';
import { company } from '@/data/company';
import { MiniBrandMark } from './MiniBrandMark';

const areas = [
  ['Start Up', '/servizi/startup/'],
  ['Sviluppo e risorse', '/servizi/strategia-e-crescita/'],
  ['Internazionalizzazione', '/servizi/internazionalizzazione/'],
  ['Ristrutturazione debiti', '/servizi/crisi-e-risanamento/'],
  ['Finanza agevolata', '/servizi/finanza-agevolata/'],
  ['Creazione NewCo', '/servizi/creazione-newco/'],
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(135deg,#1C2B2E_0%,#142022_100%)] text-white">
      <div className="absolute inset-0 prosperya-grid opacity-14" />
      <div className="absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-mediterranean/14 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px hairline-light" />

      <div className="relative mx-auto max-w-[1480px] px-5 pb-24 pt-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 border-b border-white/14 pb-12 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="lg:col-span-8">
            <Link href="/" className="group inline-flex items-center gap-4">
              <MiniBrandMark />
              <span className="border-l border-white/14 pl-4">
                <span className="block text-sm font-semibold tracking-[.2em] !text-white">PROSPERYA</span>
                <span className="mt-1.5 block text-[9px] uppercase tracking-[.2em] !text-white/50">{company.payoff}</span>
              </span>
            </Link>

            <h2 className="mt-9 max-w-5xl text-[clamp(2.7rem,5.8vw,6.4rem)] font-heading leading-[.94] tracking-[-.04em] !text-white">
              Decisioni complesse. <span className="italic !text-white/62">Una regia più chiara.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end lg:min-w-[360px]">
            <Link href="/contatti/" className="group flex min-h-14 items-center justify-between border border-sand/45 bg-sand/[0.09] px-5 text-sm font-semibold !text-white transition-all duration-300 hover:border-sand hover:bg-sand hover:!text-night">
              Richiedi una consulenza
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:py-14">
          <div className="lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] !text-white/42">Profilo</p>
            <p className="mt-5 max-w-xs text-sm leading-[1.8] !text-white/62">Consulenza imprenditoriale e gestionale tra Sicilia, Italia, Europa e area mediterranea.</p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] !text-white/42">Aree</p>
            <ul className="mt-5 grid gap-3">
              {areas.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="group inline-flex min-h-8 items-center gap-2 text-sm !text-white/72 transition-colors hover:!text-white">
                    <span>{label}</span><span className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] !text-white/42">Contatti</p>
            <address className="mt-5 not-italic text-sm leading-[1.8] !text-white/68">
              {company.sedeLegale}<br />{company.cap} {company.comune}<br />{company.regione}
              <div className="mt-4">
                <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:!text-white"><MessageCircle className="h-4 w-4 text-[#25D366]" />{company.telefono} · WhatsApp</a>
              </div>
              <div><a href={company.gmailComposeHref} target="_blank" rel="noopener noreferrer" className="break-all transition-colors hover:!text-white">{company.emailPubblica}</a></div>
            </address>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] !text-white/42">Società & legal</p>
            <div className="mt-5 text-sm leading-[1.8] !text-white/68">
              <p>{company.ragioneSociale}</p>
              <p>P.IVA / C.F. {company.pivaCf}</p>
              <div className="mt-4 space-y-2">
                {legalNav.map((item) => <Link key={item.href} href={item.href} className="block min-h-8 transition-colors hover:!text-white">{item.label}</Link>)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/14 pt-6 text-[10px] uppercase tracking-[.15em] !text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {company.ragioneSociale}. Tutti i diritti riservati.</p>
          <p>Sicilia · Europa · Mediterraneo</p>
        </div>
      </div>
    </footer>
  );
}
