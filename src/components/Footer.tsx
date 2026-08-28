import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { legalNav } from '@/data/navigation';
import { company } from '@/data/company';

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
    <footer className="relative overflow-hidden bg-[#080C0D] text-white">
      <div className="absolute inset-0 prosperya-grid opacity-20" />
      <div className="absolute right-[-9rem] top-[-8rem] h-[30rem] w-[30rem] rounded-full bg-mediterranean/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1480px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="border-b border-white/10 pb-12 lg:pb-14">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-white/15"><Image src="/brand/prosperya-logo.png" alt="Prosperya" width={48} height={48} className="h-full w-full object-contain scale-[1.08]" /></span>
                <span><span className="block text-sm font-semibold tracking-[.2em] !text-white">PROSPERYA</span><span className="mt-1.5 block text-[9px] uppercase tracking-[.2em] !text-white/34">Advisory · Governance · Growth</span></span>
              </Link>

              <h2 className="mt-8 max-w-4xl text-4xl font-heading leading-[.96] !text-white sm:text-5xl lg:text-6xl">Decisioni complesse. <span className="italic !text-white/48">Una regia più chiara.</span></h2>
            </div>

            <div className="lg:justify-self-end lg:min-w-[360px]">
              <Link href="/contatti/" className="premium-button-light group w-full justify-between">
                Richiedi una consulenza
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] !text-white/30">Profilo</p>
            <p className="mt-5 max-w-xs text-sm leading-[1.8] !text-white/50">Consulenza imprenditoriale e gestionale tra Sicilia, Italia, Europa e area mediterranea.</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] !text-white/30">Aree</p>
            <ul className="mt-5 space-y-3">
              {areas.map(([label, href]) => <li key={label}><Link href={href} className="text-sm !text-white/58 transition-colors hover:!text-white">{label}</Link></li>)}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] !text-white/30">Contatti</p>
            <address className="mt-5 not-italic text-sm leading-[1.8] !text-white/52">
              {company.sedeLegale}<br />{company.cap} {company.comune}<br />{company.regione}
              <div className="mt-4"><a href={`tel:${company.telefono.replace(/\s/g, '')}`} className="transition-colors hover:!text-white">{company.telefono}</a></div>
              <div><a href={`mailto:${company.emailDirezione}`} className="transition-colors hover:!text-white">{company.emailDirezione}</a></div>
            </address>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] !text-white/30">Dati societari</p>
            <div className="mt-5 text-sm leading-[1.8] !text-white/52">
              <p>{company.ragioneSociale}</p>
              <p>P.IVA / C.F. {company.pivaCf}</p>
              <div className="mt-4 space-y-2">
                {legalNav.map((item) => <Link key={item.href} href={item.href} className="block transition-colors hover:!text-white">{item.label}</Link>)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[.15em] !text-white/28 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {company.ragioneSociale}. Tutti i diritti riservati.</p>
          <p>Sicilia · Europa · Mediterraneo</p>
        </div>
      </div>
    </footer>
  );
}
