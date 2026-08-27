import Link from 'next/link';
import Image from 'next/image';
import { mainNav, legalNav } from '@/data/navigation';
import { company } from '@/data/company';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-white/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/brand/prosperya-logo.png"
                alt="Prosperya"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="text-white text-lg font-heading font-semibold">PROSPERYA</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Consulenza imprenditoriale e gestionale tra Sicilia, Italia, Europa e area mediterranea.
            </p>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Navigazione</h3>
            <ul className="space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Aree di intervento</h3>
            <ul className="space-y-2.5">
              <li><Link href="/servizi/governance-e-controllo/" className="text-sm hover:text-white transition-colors">Governance e controllo</Link></li>
              <li><Link href="/servizi/strategia-e-crescita/" className="text-sm hover:text-white transition-colors">Strategia e crescita</Link></li>
              <li><Link href="/servizi/startup/" className="text-sm hover:text-white transition-colors">Startup</Link></li>
              <li><Link href="/servizi/internazionalizzazione/" className="text-sm hover:text-white transition-colors">Internazionalizzazione</Link></li>
              <li><Link href="/servizi/crisi-e-risanamento/" className="text-sm hover:text-white transition-colors">Crisi e risanamento</Link></li>
              <li><Link href="/servizi/finanza-agevolata/" className="text-sm hover:text-white transition-colors">Finanza agevolata</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Contatti</h3>
            <address className="not-italic space-y-2.5 text-sm text-white/70">
              <p>{company.sedeLegale}<br />{company.cap} {company.comune}<br />{company.regione}</p>
              <p>
                <a href={`tel:${company.telefono.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{company.telefono}</a>
              </p>
              <p>
                <a href={`mailto:${company.emailDirezione}`} className="hover:text-white transition-colors">{company.emailDirezione}</a>
              </p>
              <p className="pt-2">P.IVA / C.F. {company.pivaCf}</p>
            </address>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            © {year} {company.ragioneSociale}. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-xs text-white/60 hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
