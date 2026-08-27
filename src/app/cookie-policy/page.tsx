import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informativa sull’uso dei cookie sul sito di Prosperya S.R.L.',
  alternates: { canonical: '/cookie-policy/' },
};

export default function CookiePolicy() {
  return (
    <div className="pt-24 lg:pt-32 pb-20 lg:pb-28 bg-warm-ivory">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-night mb-8">Cookie Policy</h1>

        <div className="space-y-6 text-anthracite/90 leading-relaxed">
          <section>
            <h2 className="text-xl font-heading text-night mb-3">Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti visitati inviano al browser dell’utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-night mb-3">Cookie utilizzati</h2>
            <p>
              Il presente sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento della navigazione, senza finalità di profilazione o tracciamento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-night mb-3">Gestione dei cookie</h2>
            <p>
              Attraverso le impostazioni del browser l’utente può decidere di bloccare, eliminare o consentire i cookie. Si segnala che la disabilitazione dei cookie tecnici potrebbe compromettere la fruizione del sito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-night mb-3">Aggiornamenti</h2>
            <p>
              La presente informativa può essere soggetta a modifiche. Invitiamo gli utenti a consultarla periodicamente.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
