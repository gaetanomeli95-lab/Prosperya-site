# Simposio Prosperya — iscrizioni

Pagina pubblica: `/simposio/` · Elenco iscritti: `/area-riservata/` (solo personale incaricato).

## Come funziona

1. Il modulo invia i dati a `POST /api/simposio/iscrizione/`.
2. Il server valida i dati e li **salva in Postgres** (tabella `simposio_registrations`). Solo dopo il salvataggio l’utente vede la conferma.
3. Poi invia, tramite Resend, l’email di riepilogo al partecipante e una notifica interna. L’esito di ciascun invio viene registrato. Se l’invio fallisce, l’iscrizione resta valida e la conferma si può reinviare dall’area riservata.
4. Le iscrizioni sono uniche per `(evento, email)`. Un nuovo invio con la stessa email non modifica né restituisce dati: se la conferma era fallita viene ritentata, altrimenti il titolare dell’indirizzo riceve un avviso “iscrizione già registrata” (al massimo uno ogni 6 ore).

L’unica fonte dei dati è l’archivio Postgres. Le email e i log non sono un archivio.

## Variabili d’ambiente (Vercel → Settings → Environment Variables)

| Variabile | Obbligatoria | Descrizione |
|---|---|---|
| `DATABASE_URL` (o `SIMPOSIO_DATABASE_URL`) | sì | Stringa di connessione Postgres. Con Neon dal Marketplace Vercel viene impostata in automatico. Usare l’URL *pooled*. |
| `RESEND_API_KEY` | sì | Già usata dal modulo contatti. |
| `SIMPOSIO_FROM_EMAIL` | sì | Mittente su dominio verificato in Resend, es. `Prosperya <eventi@prosperya.it>`. Con un mittente `@resend.dev` le email ai partecipanti **non** vengono inviate (stato “Non inviata: mittente di prova”). Se manca, si usa `RESEND_FROM_EMAIL`. |
| `SIMPOSIO_NOTIFICATION_EMAIL` | consigliata | Destinatario della notifica interna. Se manca, si usa `CONTACT_EMAIL`. |
| `SIMPOSIO_REPLY_TO` | no | Indirizzo per le risposte dei partecipanti (predefinito: email pubblica in `src/data/company.ts`). |
| `AREA_RISERVATA_SECRET` | sì | Stringa casuale di almeno 32 caratteri, ad esempio generata con `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`. Se la si cambia, tutte le sessioni vengono chiuse. |
| `AREA_RISERVATA_UTENTI` | sì | Utenti dell’area riservata, nel formato `email=hash;email2=hash2`. |
| `SIMPOSIO_REGISTRATIONS` | no | `closed` chiude subito le iscrizioni, `open` le forza aperte. Richiede un redeploy. |
| `SIMPOSIO_DB_POOL_MAX` | no | Connessioni per istanza (predefinito 3). |

Nessuna credenziale va inserita nel repository.

## Attivazione (una tantum)

1. **Archivio**: su Vercel, progetto `prosperya-site` → Storage → Create Database → **Neon** (piano gratuito) → collegalo al progetto per Production e Preview. È consigliato un database o branch separato per le Preview, così i test non finiscono tra gli iscritti reali.
2. **Tabelle**: imposta `DATABASE_URL` in `.env.local` ed esegui `npm run simposio:db:setup`. In alternativa, incolla `db/simposio.sql` nell’editor SQL di Neon. Il comando è idempotente.
3. **Email**: in Resend verifica il dominio `prosperya.it` (record DNS) e imposta `SIMPOSIO_FROM_EMAIL`.
4. **Personale**: per ogni incaricato esegui `npm run staff:hash -- nome@prosperya.it`. La password viene richiesta senza essere mostrata. Copia la riga generata in `AREA_RISERVATA_UTENTI`.
5. Redeploy.

## Consultare ed esportare gli iscritti

`/area-riservata/` → accesso → elenco con ricerca e filtro per stato. Per ogni iscritto puoi:
- cambiare lo stato: **Iscritto**, **Presenza riconfermata**, **Presente all’evento**, **Annullato**;
- vedere l’esito dell’email di conferma e reinviarla;
- **Esporta CSV**: separatore `;` e UTF-8, si apre direttamente in Excel. Le celle che iniziano con `=`, `+`, `-` o `@` vengono neutralizzate, tranne i numeri di telefono.

La sessione dura 8 ore. Per revocare l’accesso a una persona, togli la sua voce da `AREA_RISERVATA_UTENTI` e fai il redeploy.

## Aggiornare l’evento

Tutto è in `src/data/simposio.ts`: data, luogo, indirizzo, orari (`startTime`/`endTime`), programma (`agenda`) e relatori (`speakers`). I campi a `null` o vuoti non compaiono da nessuna parte. Quando inserisci gli orari, appaiono in pagina, nelle email e nei dati strutturati.
Non cambiare `id` mentre le iscrizioni sono aperte: è la chiave dell’archivio.

## Chiudere le iscrizioni

- Automatico: dal giorno successivo all’evento (fuso `Europe/Rome`) il modulo scompare, l’API risponde 409 e il banner in home si nasconde. Pagina e home si rigenerano ogni ora.
- Manuale: `registrations: 'closed'` in `src/data/simposio.ts`, oppure `SIMPOSIO_REGISTRATIONS=closed` su Vercel, seguito da un redeploy.

## Verifica

- `npm run test:simposio`: build di produzione più 18 verifiche end-to-end. Usa un Postgres in memoria e un finto Resend, quindi nessuna email reale. Copre iscrizione, validazione, duplicati, invii contemporanei, errore email, errore archivio, limiti anti-abuso, area riservata, CSV, configurazioni mancanti e iscrizioni chiuse.
- `npm run build && npm run simposio:local`: avvia http://localhost:3200/simposio/ con dati fittizi. Le email simulate vengono stampate in console. Credenziali dell’area riservata di prova: `prova@example.test` / `password-locale-123`.
- Dopo l’attivazione: fai un’iscrizione di prova sulla Preview con un tuo indirizzo, controlla email e area riservata, poi segnala la riga come **Annullato**.

## Analytics

Gli eventi GA4 partono solo dopo il consenso “Accetta”: `simposio_view`, `simposio_form_start` e `simposio_registration_saved`. Quest’ultimo parte solo dopo il salvataggio confermato dal server. Gli eventi non contengono dati personali, solo `utm_source`.
