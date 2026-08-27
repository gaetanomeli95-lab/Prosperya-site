import type { Metadata } from 'next';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sul trattamento dei dati personali di Prosperya S.R.L.',
  alternates: { canonical: '/privacy-policy/' },
};

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 lg:pt-32 pb-20 lg:pb-28 bg-warm-ivory">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-night mb-8">Privacy Policy</h1>

        <div className="prose prose-anthracite max-w-none space-y-6 text-anthracite/90">
          <section>
            <h2 className="text-xl font-heading text-night mb-3">Titolare del trattamento</h2>
            <p className="leading-relaxed">
              {company.ragioneSociale} — Sede legale {company.sedeLegale}, {company.cap} {company.comune}, {company.regione}.<br />
              P.IVA / C.F. {company.pivaCf}<br />
              Email: <a href={`mailto:${company.emailPrivacy}`} className="text-mediterranean hover:underline">{company.emailPrivacy}</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-night mb-3">Dati raccolti</h2>
            <p className="leading-relaxed">
              Tramite il sito vengono raccolti esclusivamente i dati personali volontariamente forniti tramite il modulo di contatto: nome, cognome, denominazione dell’azienda, indirizzo email, numero di telefono, area di interesse e contenuto del messaggio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-night mb-3">Finalità e base giuridica</h2>
            <p className="leading-relaxed">
              I dati sono trattati per rispondere alle richieste di informazioni e per eventuali attività precontrattuali, sulla base del consenso espresso in sede di invio del modulo e dell’art. 6, co. 1, lett. b) del Regolamento (UE) 2016/679.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-night mb-3">Conservazione</h2>
            <p className="leading-relaxed">
              I dati sono conservati per il tempo necessario a gestire la richiesta e, in caso di instaurazione di un rapporto, per la durata dello stesso e per i termini previsti dalla normativa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-night mb-3">Diritti dell’interessato</h2>
            <p className="leading-relaxed">
              L’interessato può esercitare i diritti di accesso, rettifica, revoca, cancellazione, limitazione e opposizione scrivendo a{' '}
              <a href={`mailto:${company.emailPrivacy}`} className="text-mediterranean hover:underline">{company.emailPrivacy}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
