import type { Metadata } from 'next';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informativa sull’uso dei cookie e dei servizi di terze parti sul sito di Prosperya S.R.L.',
  alternates: { canonical: '/cookie-policy/' },
};

export default function CookiePolicy() {
  return (
    <div className="premium-page">
      <div className="absolute inset-x-0 top-0 h-[30rem] bg-[linear-gradient(180deg,#172326_0%,#1D2C2F_67%,transparent_100%)]" />
      <div className="premium-container">
        <section className="premium-panel-dark p-6 sm:p-9 lg:p-12">
          <p className="eyebrow !text-white/45">Legal · Cookies</p>
          <h1 className="mt-6 text-[clamp(3.2rem,7vw,6.6rem)] font-heading leading-[.9] tracking-[-.04em] !text-white">Cookie Policy</h1>
          <p className="mt-6 max-w-2xl text-sm leading-[1.8] !text-white/62">Informativa sull’utilizzo dei cookie, sulle tecnologie necessarie e sui servizi esterni attivati dall’utente.</p>
        </section>

        <section className="premium-hero mt-5 p-6 sm:p-9 lg:p-12">
          <div className="mx-auto max-w-4xl space-y-10 text-anthracite/78">
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Cosa sono i cookie</h2>
              <p className="mt-4 leading-[1.8]">I cookie sono piccoli file di testo che possono essere memorizzati dal browser durante la navigazione. Alcuni sono necessari al funzionamento del sito, altri possono essere collegati a servizi esterni scelti dall’utente.</p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Cookie e tecnologie necessarie</h2>
              <p className="mt-4 leading-[1.8]">Prosperya utilizza tecnologie tecniche necessarie alla navigazione, alla memorizzazione delle preferenze e alla sicurezza del sito. Queste funzioni non vengono utilizzate per finalità pubblicitarie o di profilazione.</p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Google Translate</h2>
              <p className="mt-4 leading-[1.8]">Il sito mette a disposizione un servizio di traduzione automatica basato su Google Translate. Il servizio viene attivato con il consenso dell’utente oppure quando l’utente sceglie volontariamente una lingua diversa dall’italiano. L’attivazione può comportare l’utilizzo di tecnologie e richieste verso servizi Google.</p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Gestione delle preferenze</h2>
              <p className="mt-4 leading-[1.8]">Al primo accesso l’utente può scegliere se accettare i servizi opzionali oppure utilizzare soltanto le tecnologie necessarie. Le preferenze vengono salvate localmente sul dispositivo. È inoltre possibile eliminare cookie e dati del sito dalle impostazioni del browser.</p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Contatti</h2>
              <p className="mt-4 leading-[1.8]">Per informazioni relative alla presente Cookie Policy è possibile scrivere a <a href={`mailto:${company.emailPrivacy}`} className="font-semibold text-mediterranean hover:underline">{company.emailPrivacy}</a>.</p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Aggiornamenti</h2>
              <p className="mt-4 leading-[1.8]">La presente informativa può essere aggiornata in caso di variazioni dei servizi utilizzati o della normativa applicabile. Invitiamo gli utenti a consultarla periodicamente.</p>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
