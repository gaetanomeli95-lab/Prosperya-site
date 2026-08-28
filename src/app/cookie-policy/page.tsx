import type { Metadata } from 'next';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informativa sull’uso dei cookie sul sito di Prosperya S.R.L.',
  alternates: { canonical: '/cookie-policy/' },
};

export default function CookiePolicy() {
  return (
    <div className="premium-page">
      <div className="absolute inset-x-0 top-0 h-[30rem] bg-[linear-gradient(180deg,#090D0E_0%,#111819_67%,transparent_100%)]" />
      <div className="premium-container">
        <section className="premium-panel-dark p-6 sm:p-9 lg:p-12">
          <p className="eyebrow !text-white/38">Legal · Cookies</p>
          <h1 className="mt-6 text-[clamp(3.2rem,7vw,6.6rem)] font-heading leading-[.9] tracking-[-.04em] !text-white">Cookie Policy</h1>
          <p className="mt-6 max-w-2xl text-sm leading-[1.8] !text-white/52">Informativa sull’utilizzo dei cookie e sulle modalità di gestione da parte dell’utente.</p>
        </section>

        <section className="premium-hero mt-5 p-6 sm:p-9 lg:p-12">
          <div className="mx-auto max-w-4xl space-y-10 text-anthracite/78">
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Cosa sono i cookie</h2>
              <p className="mt-4 leading-[1.8]">I cookie sono piccoli file di testo che i siti visitati inviano al browser dell’utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.</p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Cookie utilizzati</h2>
              <p className="mt-4 leading-[1.8]">Il presente sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento della navigazione, senza finalità di profilazione o tracciamento.</p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Gestione dei cookie</h2>
              <p className="mt-4 leading-[1.8]">Attraverso le impostazioni del browser l’utente può decidere di bloccare, eliminare o consentire i cookie. Si segnala che la disabilitazione dei cookie tecnici potrebbe compromettere la fruizione del sito.</p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Contatti</h2>
              <p className="mt-4 leading-[1.8]">Per informazioni relative alla presente Cookie Policy è possibile scrivere a <a href={`mailto:${company.emailPrivacy}`} className="font-semibold text-mediterranean hover:underline">{company.emailPrivacy}</a>.</p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Aggiornamenti</h2>
              <p className="mt-4 leading-[1.8]">La presente informativa può essere soggetta a modifiche. Invitiamo gli utenti a consultarla periodicamente.</p>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
