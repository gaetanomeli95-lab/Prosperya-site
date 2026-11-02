import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, CalendarDays, Clock, Compass, Lightbulb, MapPin, Store, Ticket, Users } from 'lucide-react';
import { company, site } from '@/data/company';
import { simposio, simposioPath } from '@/data/simposio';
import { FadeIn } from '@/components/MotionWrapper';
import { RegistrationForm } from '@/components/simposio/RegistrationForm';
import { isStorageConfigured } from '@/lib/simposio/db';
import { formatEventDate, formatEventTime, formatVenue, registrationState, venueMapsHref } from '@/lib/simposio/schedule';

// Rigenerata ogni ora: la chiusura automatica dopo l’evento si riflette anche sulla pagina.
export const revalidate = 3600;

const title = 'Simposio Prosperya · 27 gennaio 2027';
const description = 'Incontro gratuito per chi vuole avviare un’attività, sviluppare un’idea o far crescere un’impresa. 27 gennaio 2027, Saracen Hotel, Isola delle Femmine (PA). Iscriviti online.';

export const metadata: Metadata = {
  title: { absolute: `${title} — Prosperya` },
  description,
  alternates: { canonical: simposioPath },
  openGraph: {
    title,
    description,
    url: `${site.url}${simposioPath}`,
    siteName: company.ragioneSociale,
    locale: 'it_IT',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title, description },
};

const audience = [
  { icon: Compass, title: 'Vuoi metterti in proprio', text: 'ma non sai ancora da dove iniziare, quali passi servono e in che ordine affrontarli.' },
  { icon: Lightbulb, title: 'Hai un’idea da sviluppare', text: 'e vuoi capire se può diventare un’attività: a chi si rivolge, quale problema risolve, cosa serve per partire.' },
  { icon: Store, title: 'Hai già un’impresa', text: 'e cerchi un confronto su strategia, organizzazione e possibilità di sviluppo.' },
  { icon: Users, title: 'Stai esplorando', text: 'e vuoi ascoltare, fare domande e conoscere persone che stanno facendo lo stesso percorso.' },
];

const benefits = [
  { title: 'Un punto di partenza più chiaro', text: 'Una visione d’insieme dei passaggi che portano da un’idea a un’attività: verificare il bisogno, capire a chi ti rivolgi, valutare cosa serve per iniziare.' },
  { title: 'Uno sguardo esterno sulla tua idea', text: 'Il confronto con i consulenti di Prosperya, che affiancano aspiranti imprenditori e imprese, e con chi si trova nella tua stessa fase.' },
  { title: 'Le domande giuste sulle agevolazioni', text: 'Un orientamento su come ragionare quando si valuta una misura di sostegno. Ogni misura ha requisiti propri, da verificare caso per caso: partecipare al simposio non dà accesso a finanziamenti o contributi.' },
  { title: 'Persone e contatti sul territorio', text: 'L’occasione di conoscere altre persone che vogliono fare impresa in Sicilia e scambiare esperienze e idee.' },
];

function upperFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function faqs(dateLabel: string, time: string | null) {
  return [
    { q: 'Quanto costa partecipare?', a: 'Nulla: la partecipazione al simposio è gratuita.' },
    { q: 'Devo avere già un’idea o un’impresa?', a: 'No. L’incontro è pensato anche per chi sta ancora esplorando e vuole capire se mettersi in proprio fa per sé. Nel modulo puoi raccontarci la tua idea, ma non è obbligatorio.' },
    { q: 'Partecipare dà accesso a finanziamenti o agevolazioni?', a: 'No. Il simposio è un momento di orientamento e confronto. Ogni misura di agevolazione ha requisiti e procedure propri, che vanno verificati caso per caso.' },
    {
      q: 'Quando conoscerò orario e programma?',
      a: time
        ? `Il simposio si svolge ${dateLabel}, ${time}. Eventuali aggiornamenti sul programma verranno inviati via email agli iscritti.`
        : 'Orario e programma sono in via di definizione: li pubblicheremo su questa pagina e li invieremo via email a chi si è iscritto.',
    },
    { q: 'La data è cambiata?', a: `Sì. Il simposio, inizialmente annunciato per il 27 novembre 2026, si terrà ${dateLabel}.` },
    { q: 'E se poi non posso venire?', a: `Nessun problema: rispondi all’email di conferma oppure scrivi a ${company.emailPubblica}. Ci aiuti a organizzare al meglio l’accoglienza.` },
  ];
}

function EventJsonLd({ dateLabel }: { dateLabel: string }) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: simposio.name,
    description,
    startDate: simposio.startTime ? `${simposio.date}T${simposio.startTime}:00+01:00` : simposio.date,
    ...(simposio.startTime && simposio.endTime ? { endDate: `${simposio.date}T${simposio.endTime}:00+01:00` } : {}),
    eventStatus: 'https://schema.org/EventRescheduled',
    previousStartDate: '2026-11-27',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true,
    location: {
      '@type': 'Place',
      name: simposio.venue.name,
      address: {
        '@type': 'PostalAddress',
        ...(simposio.venue.address ? { streetAddress: simposio.venue.address } : {}),
        addressLocality: simposio.venue.locality,
        addressRegion: simposio.venue.province,
        addressCountry: 'IT',
      },
    },
    organizer: { '@type': 'Organization', name: company.ragioneSociale, url: company.sito },
    url: `${site.url}${simposioPath}`,
    inLanguage: 'it',
    alternateName: `${simposio.name} — ${dateLabel}`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function SimposioPage() {
  const dateLabel = formatEventDate();
  const dateTitle = upperFirst(dateLabel);
  const time = formatEventTime();
  const venue = formatVenue();
  const mapsHref = venueMapsHref();
  const state = registrationState();
  const contact = {
    phone: company.telefono,
    whatsappHref: `${company.whatsappHref}?text=${encodeURIComponent('Ciao Prosperya, ho una domanda sul Simposio del 27 gennaio 2027.')}`,
    email: company.emailPubblica,
    emailHref: `mailto:${company.emailPubblica}?subject=${encodeURIComponent('Simposio Prosperya')}`,
  };

  return (
    <div className="simposio-page relative overflow-hidden bg-[#ECE7DE] pb-20 pt-[5.5rem] sm:pt-28 lg:pb-28 lg:pt-36">
      <EventJsonLd dateLabel={dateLabel} />
      <div className="absolute inset-x-0 top-0 h-[40rem] bg-[linear-gradient(180deg,#172326_0%,#1D2C2F_66%,transparent_100%)]" />

      <div className="premium-container">
        {/* Apertura: evento, pubblico, data, luogo, gratuità e iscrizione nella prima schermata. */}
        <section aria-labelledby="simposio-title" className="premium-panel-dark dark-surface on-dark relative overflow-hidden px-5 py-7 sm:p-9 lg:p-12 xl:p-14">
          <div className="absolute inset-0 prosperya-grid opacity-20" />
          <div className="absolute inset-x-0 top-0 h-px hairline-light" />
          <div className="absolute right-[-12rem] top-[-8rem] hidden h-[30rem] w-[30rem] rounded-full bg-mediterranean/20 blur-3xl lg:block" />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <span className="section-kicker-dark">Evento gratuito · Iscrizione online</span>
              <h1 id="simposio-title" className="mt-5 text-[clamp(2.6rem,11vw,6.4rem)] font-heading leading-[.92] tracking-[-.04em] !text-white sm:mt-7">
                Simposio Prosperya
                <span className="mt-2 block text-[0.52em] italic leading-[1.05] tracking-[-.02em] !text-white/75">Dall’idea all’impresa, un passo alla volta.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] !text-white/78 sm:mt-7 sm:text-[17px]">
                Un incontro per chi vuole mettersi in proprio, per chi sta lavorando a un’idea e per chi ha già un’attività da far crescere. Con un’attenzione particolare ai giovani under 35 e alle donne che vogliono sviluppare un progetto imprenditoriale.
              </p>

              <ul className="mt-6 grid gap-x-6 gap-y-3 text-sm !text-white sm:mt-8 sm:grid-cols-2 sm:text-[15px]">
                <li className="flex items-start gap-3"><CalendarDays className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sand" aria-hidden="true" /><span className="font-semibold">{dateTitle}</span></li>
                <li className="flex items-start gap-3"><Ticket className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sand" aria-hidden="true" /><span className="font-semibold">Partecipazione gratuita</span></li>
                <li className="flex items-start gap-3 sm:col-span-2"><MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sand" aria-hidden="true" /><span><span className="font-semibold">{simposio.venue.name}</span><span className="!text-white/70"> · {simposio.venue.locality} ({simposio.venue.province})</span></span></li>
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-5">
                <a href="#iscrizione" className="group inline-flex min-h-[52px] w-full items-center justify-between gap-3 bg-sand px-5 text-[15px] font-semibold !text-night transition-colors hover:bg-white sm:w-auto sm:min-w-[260px]">
                  Iscriviti al simposio
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                </a>
                <p className="text-xs leading-[1.6] !text-white/62">Modulo breve, meno di un minuto. Nessun account.</p>
              </div>
            </div>

            <div className="hidden lg:col-span-5 lg:block">
              <div className="relative mx-auto aspect-square w-full max-w-[400px]">
                <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.95)_0%,rgba(243,240,233,.92)_60%,rgba(243,240,233,0)_71%)]" />
                <Image src="/brand/prosperya-logo.png" alt="Logo Prosperya" fill sizes="400px" className="object-contain p-[14%]" priority />
              </div>
            </div>
          </div>
        </section>

        {/* Per chi */}
        <section aria-labelledby="per-chi" className="mt-5 bg-paper p-6 sm:p-9 lg:p-12">
          <FadeIn>
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <span className="section-kicker">Per chi è utile</span>
                <h2 id="per-chi" className="mt-5 text-[clamp(2rem,5vw,3.4rem)] font-heading leading-[1] tracking-[-.03em]">Non serve avere già un piano.</h2>
              </div>
              <p className="text-[15px] leading-[1.75] text-anthracite/75 lg:col-span-6">Serve la voglia di capire se, e come, la propria idea può diventare un’attività. Il simposio è pensato in particolare per giovani e donne che vogliono avviare un progetto imprenditoriale, ed è aperto a tutte le persone interessate.</p>
            </div>
          </FadeIn>
          <ul className="mt-8 grid gap-px overflow-hidden border border-night/10 bg-night/10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
            {audience.map(({ icon: Icon, title: itemTitle, text }) => (
              <li key={itemTitle} className="bg-paper p-5 sm:p-6">
                <Icon className="h-5 w-5 text-mediterranean" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-heading leading-tight">{itemTitle}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-anthracite/72">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Idea come risposta a un problema + benefici */}
        <section aria-labelledby="benefici" className="mt-5 grid gap-5 lg:grid-cols-12">
          <div className="premium-panel-dark dark-surface on-dark relative overflow-hidden p-6 sm:p-9 lg:col-span-5 lg:p-10">
            <div className="absolute inset-0 prosperya-grid opacity-15" />
            <FadeIn className="relative">
              <span className="section-kicker-dark">Da dove nasce un’impresa</span>
              <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3rem)] font-heading leading-[1.02] tracking-[-.03em] !text-white">Spesso, da un problema osservato da vicino.</h2>
              <p className="mt-5 text-[15px] leading-[1.8] !text-white/75">Un servizio che nel tuo territorio manca. Un’attesa troppo lunga. Un bisogno che nessuno soddisfa davvero bene. Molte attività nascono così: guardando un problema reale e costruendo una soluzione utile per qualcuno.</p>
              <p className="mt-4 text-[15px] leading-[1.8] !text-white/75">Al simposio partiamo da qui, per aiutarti a guardare la tua idea, o la tua curiosità, con più concretezza.</p>
            </FadeIn>
          </div>

          <div className="bg-paper p-6 sm:p-9 lg:col-span-7 lg:p-10">
            <span className="section-kicker">Cosa porti a casa</span>
            <h2 id="benefici" className="mt-5 text-[clamp(1.9rem,4.4vw,3rem)] font-heading leading-[1.02] tracking-[-.03em]">Cosa puoi aspettarti.</h2>
            <ol className="mt-7 divide-y divide-night/10 border-y border-night/10">
              {benefits.map((b, i) => (
                <li key={b.title} className="grid grid-cols-[2.25rem_1fr] gap-3 py-5">
                  <span className="editorial-index text-xl text-mediterranean" aria-hidden="true">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-heading leading-snug">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-[1.75] text-anthracite/72">{b.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Informazioni pratiche */}
        <section aria-labelledby="info" className="mt-5 bg-[#E9E3D9] p-6 paper-noise sm:p-9 lg:p-12">
          <span className="section-kicker">Informazioni pratiche</span>
          <h2 id="info" className="mt-5 text-[clamp(1.9rem,4.4vw,3rem)] font-heading leading-[1.02] tracking-[-.03em]">Quando e dove</h2>
          <dl className="mt-8 grid gap-px overflow-hidden border border-night/10 bg-night/10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-[#F3EFE7] p-5">
              <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-night/55"><CalendarDays className="h-4 w-4 text-mediterranean" aria-hidden="true" />Data</dt>
              <dd className="mt-3 text-lg font-heading text-night">{dateTitle}</dd>
            </div>
            <div className="bg-[#F3EFE7] p-5">
              <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-night/55"><Clock className="h-4 w-4 text-mediterranean" aria-hidden="true" />Orario</dt>
              <dd className="mt-3 text-lg font-heading text-night">{time ? upperFirst(time) : 'In definizione'}</dd>
              {!time && <dd className="mt-1 text-xs leading-[1.6] text-anthracite/65">Lo comunicheremo via email agli iscritti.</dd>}
            </div>
            <div className="bg-[#F3EFE7] p-5">
              <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-night/55"><MapPin className="h-4 w-4 text-mediterranean" aria-hidden="true" />Luogo</dt>
              <dd className="mt-3 text-lg font-heading text-night">{simposio.venue.name}</dd>
              <dd className="mt-1 text-sm text-anthracite/70">{simposio.venue.address ? `${simposio.venue.address}, ` : ''}{simposio.venue.locality} ({simposio.venue.province})</dd>
              <dd className="mt-2"><a href={mapsHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-mediterranean hover:underline">Apri in Google Maps <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a></dd>
            </div>
            <div className="bg-[#F3EFE7] p-5">
              <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-night/55"><Ticket className="h-4 w-4 text-mediterranean" aria-hidden="true" />Partecipazione</dt>
              <dd className="mt-3 text-lg font-heading text-night">Gratuita</dd>
              <dd className="mt-1 text-sm text-anthracite/70">Con iscrizione online qui sotto.</dd>
            </div>
          </dl>

          {simposio.agenda.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-heading">Programma</h3>
              <ol className="mt-4 divide-y divide-night/10 border-y border-night/10">
                {simposio.agenda.map((item) => (
                  <li key={item.title} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr]">
                    <span className="text-sm font-semibold text-mediterranean">{item.time ?? ''}</span>
                    <div><p className="font-semibold text-night">{item.title}</p>{item.description && <p className="mt-1 text-sm text-anthracite/72">{item.description}</p>}</div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {simposio.speakers.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-heading">Interventi</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {simposio.speakers.map((s) => (
                  <li key={s.name} className="border border-night/10 bg-[#F3EFE7] p-4"><p className="font-semibold text-night">{s.name}</p><p className="mt-1 text-sm text-anthracite/72">{s.role}</p></li>
                ))}
              </ul>
            </div>
          )}

          {simposio.agenda.length === 0 && (
            <p className="mt-6 max-w-2xl text-sm leading-[1.7] text-anthracite/70">Il programma dettagliato sarà pubblicato su questa pagina e inviato agli iscritti appena definito.</p>
          )}
        </section>

        {/* Modulo */}
        <section id="iscrizione" aria-labelledby="iscrizione-title" className="mt-5 scroll-mt-24 grid gap-5 lg:grid-cols-12">
          <div className="premium-panel-dark dark-surface on-dark p-6 sm:p-9 lg:col-span-4 lg:p-10">
            <span className="section-kicker-dark">Iscrizione</span>
            <h2 id="iscrizione-title" className="mt-5 text-[clamp(2rem,4.6vw,3.2rem)] font-heading leading-[1] tracking-[-.03em] !text-white">Riserva la tua partecipazione.</h2>
            <ol className="mt-7 space-y-4 text-sm leading-[1.65] !text-white/78">
              <li className="grid grid-cols-[2rem_1fr] gap-2"><span className="editorial-index text-lg text-sand" aria-hidden="true">01</span><span>Compili il modulo con nome, email e cellulare.</span></li>
              <li className="grid grid-cols-[2rem_1fr] gap-2"><span className="editorial-index text-lg text-sand" aria-hidden="true">02</span><span>Ricevi subito un’email con il riepilogo.</span></li>
              <li className="grid grid-cols-[2rem_1fr] gap-2"><span className="editorial-index text-lg text-sand" aria-hidden="true">03</span><span>Ti scriviamo con orario e programma e, a ridosso dell’evento, potremmo contattarti per riconfermare la presenza.</span></li>
            </ol>
            <div className="mt-8 border-t border-white/12 pt-6 text-sm !text-white/70">
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] !text-white/45">Domande?</p>
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-10 items-center hover:!text-white">{company.telefono} · WhatsApp</a>
              <a href={contact.emailHref} className="flex min-h-10 items-center break-all hover:!text-white">{company.emailPubblica}</a>
            </div>
          </div>

          <div className="border border-night/10 bg-paper p-5 shadow-soft sm:p-8 lg:col-span-8 lg:p-10">
            {state === 'open' ? (
              <RegistrationForm eventId={simposio.id} dateLabel={dateTitle} venueLabel={venue} mapsHref={mapsHref} contact={contact} available={isStorageConfigured()} />
            ) : (
              <div role="status">
                <h3 className="text-2xl font-heading text-night sm:text-3xl">{state === 'ended' ? 'Il simposio si è concluso.' : 'Le iscrizioni sono chiuse.'}</h3>
                <p className="mt-4 text-[15px] leading-[1.75] text-anthracite/78">
                  {state === 'ended'
                    ? 'Grazie a chi ha partecipato. Per essere informato sui prossimi incontri, o per un confronto sulla tua idea, scrivici.'
                    : 'Al momento non è possibile iscriversi online. Per informazioni puoi contattarci direttamente.'}
                </p>
                <div className="mt-6 grid gap-2 text-sm">
                  <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-mediterranean hover:underline">{company.telefono} · WhatsApp</a>
                  <a href={contact.emailHref} className="font-semibold text-mediterranean hover:underline">{company.emailPubblica}</a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Domande frequenti */}
        <section aria-labelledby="faq" className="mt-5 bg-paper p-6 sm:p-9 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="section-kicker">Domande frequenti</span>
              <h2 id="faq" className="mt-5 text-[clamp(1.9rem,4.4vw,3rem)] font-heading leading-[1.02] tracking-[-.03em]">Prima di iscriverti</h2>
            </div>
            <div className="divide-y divide-night/10 border-y border-night/10 lg:col-span-8">
              {faqs(dateLabel, time).map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-semibold text-night [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid h-7 w-7 shrink-0 place-items-center border border-night/15 text-mediterranean transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="pb-5 pr-10 text-sm leading-[1.75] text-anthracite/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
