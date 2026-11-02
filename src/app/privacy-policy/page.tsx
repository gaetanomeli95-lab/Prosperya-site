import type { Metadata } from 'next';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sul trattamento dei dati personali di Prosperya S.R.L.',
  alternates: { canonical: '/privacy-policy/' },
};

export default function PrivacyPolicy() {
  return (
    <div className="premium-page">
      <div className="absolute inset-x-0 top-0 h-[30rem] bg-[linear-gradient(180deg,#090D0E_0%,#111819_67%,transparent_100%)]" />
      <div className="premium-container">
        <section className="premium-panel-dark p-6 sm:p-9 lg:p-12">
          <p className="eyebrow !text-white/38">Legal · Privacy</p>
          <h1 className="mt-6 text-[clamp(3.2rem,7vw,6.6rem)] font-heading leading-[.9] tracking-[-.04em] !text-white">Privacy Policy</h1>
          <p className="mt-6 max-w-2xl text-sm leading-[1.8] !text-white/52">Informativa sul trattamento dei dati personali e sui diritti dell’interessato.</p>
        </section>

        <section className="premium-hero mt-5 p-6 sm:p-9 lg:p-12">
          <div className="mx-auto max-w-4xl space-y-10 text-anthracite/78">
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Titolare del trattamento</h2>
              <p className="mt-4 leading-[1.8]">{company.ragioneSociale} — Sede legale {company.sedeLegale}, {company.cap} {company.comune}, {company.regione}.<br />P.IVA / C.F. {company.pivaCf}<br />Email: <a href={`mailto:${company.emailPrivacy}`} className="font-semibold text-mediterranean hover:underline">{company.emailPrivacy}</a></p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Dati raccolti</h2>
              <p className="mt-4 leading-[1.8]">Tramite il sito vengono raccolti esclusivamente i dati personali volontariamente forniti tramite i moduli: il modulo di contatto (nome, cognome, denominazione dell’azienda, indirizzo email, numero di telefono, area di interesse e contenuto del messaggio) e il modulo di iscrizione agli eventi, descritto nella sezione dedicata.</p>
            </section>
            <section id="simposio" className="scroll-mt-28 border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Iscrizione al Simposio Prosperya</h2>
              <p className="mt-4 leading-[1.8]"><strong className="text-night">Dati trattati.</strong> Nome e cognome, indirizzo email e numero di cellulare (obbligatori); comune di provenienza, situazione professionale attuale e una breve descrizione dell’idea o della domanda (facoltativi). Possono essere registrati anche parametri di provenienza della visita (ad esempio il canale social da cui si è aperto il link), che non contengono dati personali.</p>
              <p className="mt-4 leading-[1.8]"><strong className="text-night">Gestione dell’iscrizione e comunicazioni organizzative.</strong> I dati sono trattati per registrare l’iscrizione, inviare l’email di riepilogo, comunicare orario, programma ed eventuali variazioni, riconfermare la presenza e gestire l’accoglienza il giorno dell’evento. La base giuridica è l’esecuzione di una richiesta dell’interessato (art. 6, par. 1, lett. b, del Regolamento (UE) 2016/679). Il conferimento dei dati obbligatori è necessario per l’iscrizione; senza di essi non è possibile registrarla.</p>
              <p className="mt-4 leading-[1.8]"><strong className="text-night">Comunicazioni su futuri eventi e iniziative.</strong> Solo se l’interessato seleziona l’apposita casella, facoltativa e non preselezionata, Prosperya potrà inviargli informazioni su futuri eventi e iniziative. La base giuridica è il consenso (art. 6, par. 1, lett. a), che può essere revocato in qualsiasi momento scrivendo all’indirizzo indicato sotto, senza conseguenze sull’iscrizione. Senza questo consenso i dati non vengono usati per finalità promozionali.</p>
              <p className="mt-4 leading-[1.8]"><strong className="text-night">Sicurezza e prevenzione degli abusi.</strong> Per limitare invii automatici ripetuti, il sistema conserva per un massimo di due giorni un’impronta crittografica non reversibile dell’indirizzo IP di connessione, sulla base del legittimo interesse del titolare alla sicurezza del servizio (art. 6, par. 1, lett. f).</p>
              <p className="mt-4 leading-[1.8]"><strong className="text-night">Chi accede ai dati.</strong> L’elenco degli iscritti è consultabile soltanto dal personale incaricato da Prosperya, tramite un’area riservata protetta da credenziali personali. I dati sono conservati su infrastrutture cloud e le email sono inviate tramite un fornitore di servizi di posta elettronica, che operano in qualità di responsabili del trattamento. I dati non vengono venduti né ceduti a terzi per finalità commerciali.</p>
              <p className="mt-4 leading-[1.8]"><strong className="text-night">Conservazione.</strong> I dati dell’iscrizione sono conservati per il tempo necessario all’organizzazione dell’evento e alle comunicazioni a esso collegate; i dati per i quali è stato espresso il consenso facoltativo sono conservati fino alla sua revoca.</p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Finalità e base giuridica</h2>
              <p className="mt-4 leading-[1.8]">I dati sono trattati per rispondere alle richieste di informazioni e per eventuali attività precontrattuali, sulla base del consenso espresso in sede di invio del modulo e dell’art. 6, co. 1, lett. b) del Regolamento (UE) 2016/679.</p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Conservazione</h2>
              <p className="mt-4 leading-[1.8]">I dati sono conservati per il tempo necessario a gestire la richiesta e, in caso di instaurazione di un rapporto, per la durata dello stesso e per i termini previsti dalla normativa.</p>
            </section>
            <section className="border-t border-night/10 pt-6">
              <h2 className="text-2xl font-heading text-night">Diritti dell’interessato</h2>
              <p className="mt-4 leading-[1.8]">L’interessato può esercitare i diritti di accesso, rettifica, revoca, cancellazione, limitazione e opposizione scrivendo a <a href={`mailto:${company.emailPrivacy}`} className="font-semibold text-mediterranean hover:underline">{company.emailPrivacy}</a>.</p>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
