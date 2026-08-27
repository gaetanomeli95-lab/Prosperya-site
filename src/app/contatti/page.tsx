import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { company } from '@/data/company';
import { FadeIn } from '@/components/MotionWrapper';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta Prosperya S.R.L. per un primo confronto. Sede ad Altavilla Milicia, operativi in Sicilia, Italia e all’estero.',
  alternates: { canonical: '/contatti/' },
};

export default function Contatti() {
  return (
    <div className="pt-24 lg:pt-32 pb-20 lg:pb-28 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-night mb-5">Contatti</h1>
          <p className="text-lg lg:text-xl text-anthracite leading-relaxed max-w-3xl mb-14">
            Scrivici o chiamaci per raccontare la tua impresa e capire insieme il percorso più adatto.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <FadeIn delay={0.1} className="lg:col-span-1">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-mediterranean mb-2">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Sede</span>
                </div>
                <address className="not-italic text-anthracite">
                  {company.sedeLegale}<br />
                  {company.cap} {company.comune}<br />
                  {company.regione}
                </address>
                <p className="text-sm text-anthracite/70 mt-2">{company.areaOperativa}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-mediterranean mb-2">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Telefono</span>
                </div>
                <a href={`tel:${company.telefono.replace(/\s/g, '')}`} className="text-anthracite hover:text-mediterranean transition-colors">
                  {company.telefono}
                </a>
              </div>

              <div>
                <div className="flex items-center gap-2 text-mediterranean mb-2">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Email</span>
                </div>
                <a href={`mailto:${company.emailDirezione}`} className="text-anthracite hover:text-mediterranean transition-colors">
                  {company.emailDirezione}
                </a>
              </div>

              <div>
                <div className="flex items-center gap-2 text-mediterranean mb-2">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Orari</span>
                </div>
                <p className="text-anthracite">Su appuntamento</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:col-span-2">
            <div className="p-6 lg:p-8 bg-white border border-stone-warm rounded-sm">
              <h2 className="text-2xl font-heading text-night mb-6">Richiedi un primo confronto</h2>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
