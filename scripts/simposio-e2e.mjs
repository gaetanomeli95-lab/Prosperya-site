// Verifica end-to-end del flusso iscrizioni, con dati fittizi e servizi locali:
// - Postgres in memoria (PGlite esposto sul protocollo di rete), nessun dato persiste dopo il test.
//   PGlite ha un solo backend: la concorrenza reale tra connessioni è garantita da Postgres
//   (INSERT … ON CONFLICT atomico) e va riverificata sull’archivio di preview.
// - finto provider email compatibile con l’API Resend (nessuna email reale viene inviata)
// - server Next.js di produzione (`next build` + `next start`)
//
// Uso: npm run test:simposio            (esegue anche la build)
//      npm run test:simposio -- --skip-build
import { spawn } from 'node:child_process';
import { createHmac, randomBytes, scrypt } from 'node:crypto';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import assert from 'node:assert/strict';
import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';
import postgres from 'postgres';

const DB_PORT = 54329;
const MAIL_PORT = 54330;
const SECRET = randomBytes(32).toString('base64url');
const STAFF_USER = 'staff@example.test';
const STAFF_PASSWORD = 'password-di-prova-123';
const DATABASE_URL = `postgres://postgres:postgres@127.0.0.1:${DB_PORT}/postgres`;
const skipBuild = process.argv.includes('--skip-build');

const results = [];
async function check(name, fn) {
  try {
    await fn();
    results.push({ name, ok: true });
    console.log(`  ✔ ${name}`);
  } catch (error) {
    results.push({ name, ok: false, error });
    console.log(`  ✘ ${name}\n    ${error instanceof Error ? error.message : error}`);
  }
}

// --- Postgres locale -------------------------------------------------------
const pg = await PGlite.create();
const dbServer = new PGLiteSocketServer({ db: pg, port: DB_PORT, host: '127.0.0.1', maxConnections: 4 });
await dbServer.start();
const db = postgres(DATABASE_URL, { prepare: false, max: 1, onnotice: () => {} });
await db.unsafe(await readFile(new URL('../db/simposio.sql', import.meta.url), 'utf8'));

// --- Finto provider email --------------------------------------------------
const mail = { mode: 'ok', sent: [] };
const mailServer = createServer((req, res) => {
  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', () => {
    if (mail.mode === 'fail') {
      res.writeHead(500, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ name: 'internal_server_error', message: 'simulated', statusCode: 500 }));
      return;
    }
    const payload = JSON.parse(body || '{}');
    mail.sent.push(payload);
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ id: `mock-${mail.sent.length}` }));
  });
});
await new Promise((r) => mailServer.listen(MAIL_PORT, '127.0.0.1', r));

// --- Server Next.js --------------------------------------------------------
const salt = randomBytes(16);
const hash = await promisify(scrypt)(STAFF_PASSWORD, salt, 32);
const baseEnv = {
  ...process.env,
  NODE_ENV: 'production',
  NEXT_TELEMETRY_DISABLED: '1',
  NEXT_PUBLIC_NOINDEX: 'true',
  AREA_RISERVATA_SECRET: SECRET,
  AREA_RISERVATA_UTENTI: `${STAFF_USER}=scrypt$${salt.toString('base64url')}$${hash.toString('base64url')}`,
  RESEND_BASE_URL: `http://127.0.0.1:${MAIL_PORT}`,
};
for (const key of ['DATABASE_URL', 'SIMPOSIO_DATABASE_URL', 'RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'SIMPOSIO_FROM_EMAIL', 'SIMPOSIO_REGISTRATIONS', 'CONTACT_EMAIL', 'SIMPOSIO_NOTIFICATION_EMAIL']) delete baseEnv[key];

const fullEnv = {
  ...baseEnv,
  DATABASE_URL,
  SIMPOSIO_DB_POOL_MAX: '1',
  RESEND_API_KEY: 're_test_mock',
  SIMPOSIO_FROM_EMAIL: 'Prosperya Eventi <eventi@example.test>',
  SIMPOSIO_NOTIFICATION_EMAIL: 'organizzazione@example.test',
};

function run(cmd, args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { env, stdio: 'inherit', shell: process.platform === 'win32' });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} → ${code}`))));
  });
}

const servers = [];
async function startNext(port, env) {
  const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], { env, stdio: ['ignore', 'pipe', 'pipe'] });
  child.stdout.on('data', () => {});
  child.stderr.on('data', (d) => process.env.DEBUG_E2E && process.stderr.write(d));
  servers.push(child);
  const base = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 120; i++) {
    try {
      const res = await fetch(`${base}/robots.txt`);
      if (res.ok) return base;
    } catch { /* in avvio */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Next non avviato sulla porta ${port}`);
}

let ipCounter = 0;
function register(base, body, ip = `10.0.0.${++ipCounter % 250}`) {
  return fetch(`${base}/api/simposio/iscrizione/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-real-ip': ip },
    body: JSON.stringify(body),
  });
}

const valid = (n, extra = {}) => ({
  fullName: `Persona Prova ${n}`,
  email: `persona.prova.${n}@example.test`,
  phone: '333 000 00' + String(n).padStart(2, '0'),
  comune: 'Comune di prova',
  situation: 'idea',
  message: 'Messaggio di prova.',
  marketingConsent: false,
  attribution: { utm_source: 'instagram', utm_medium: 'story', utm_campaign: 'simposio-2027', utm_content: 'mario@example.test' },
  ...extra,
});

function sessionCookie(user, expOffsetMs = 3600_000) {
  const payload = Buffer.from(JSON.stringify({ u: user, exp: Date.now() + expOffsetMs })).toString('base64url');
  const sig = createHmac('sha256', SECRET).update(`staff-session:${payload}`).digest('base64url');
  return `prosperya_staff=${payload}.${sig}`;
}

const rowsFor = (email) => db`select * from simposio_registrations where email = ${email}`;

try {
  if (!skipBuild) {
    console.log('Build di produzione con configurazione di test…');
    await run('npx', ['next', 'build'], fullEnv);
  }

  const app = await startNext(3107, fullEnv);
  console.log(`\nServer completo: ${app}`);

  await check('pagina /simposio/ risponde, è indicizzabile solo fuori preview e ha canonical', async () => {
    const res = await fetch(`${app}/simposio/`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.match(html, /Simposio Prosperya/);
    assert.match(html, /Iscriviti al simposio/);
    assert.match(html, /<link rel="canonical" href="https:\/\/prosperya.it\/simposio\/"/);
    assert.match(html, /og:image/);
    assert.match(html, /noindex/, 'con NEXT_PUBLIC_NOINDEX=true la preview non deve essere indicizzata');
  });

  await check('pulizia dati: prima della scadenza non tocca nulla e non restituisce dati', async () => {
    const res = await fetch(`${app}/api/simposio/pulizia/`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true, purged: false });
  });

  await check('sitemap include /simposio/', async () => {
    const xml = await (await fetch(`${app}/sitemap.xml`)).text();
    assert.match(xml, /https:\/\/prosperya.it\/simposio\//);
  });

  await check('iscrizione valida: salvata in archivio, conferma + notifica interna inviate', async () => {
    mail.sent = [];
    const res = await register(app, valid(1));
    const data = await res.json();
    assert.equal(res.status, 200);
    assert.equal(data.ok, true);
    assert.equal(data.emailDelivery, 'sent');
    const [row] = await rowsFor('persona.prova.1@example.test');
    assert.ok(row, 'riga presente in archivio');
    assert.equal(row.event_id, 'simposio-2027-01-27');
    assert.equal(row.status, 'iscritto');
    assert.equal(row.phone, '+393330000001');
    assert.equal(row.confirmation_email_status, 'sent');
    assert.equal(row.internal_notification_status, 'sent');
    assert.equal(row.utm_source, 'instagram');
    assert.equal(row.utm_content, null, 'valori UTM con dati personali scartati');
    assert.equal(row.marketing_consent, false);
    const participant = mail.sent.find((m) => m.to === 'persona.prova.1@example.test');
    assert.ok(participant?.html && participant?.text, 'email partecipante con html e testo');
    assert.match(participant.text, /27 gennaio 2027/);
    assert.match(participant.text, /Saracen Hotel/);
    assert.match(participant.text, /Orario: dalle 10:00/, 'orario configurato nell’email');
    assert.match(participant.text, /Via Libertà 128\/A/, 'indirizzo nell’email');
    const internal = mail.sent.find((m) => m.to === 'organizzazione@example.test');
    assert.ok(internal, 'notifica interna inviata');
    assert.doesNotMatch(internal.text, /persona\.prova\.1@example\.test|3330000001/, 'notifica interna senza email/telefono');
  });

  await check('consenso promozionale facoltativo salvato solo se selezionato', async () => {
    await register(app, valid(2, { marketingConsent: true }));
    const [row] = await rowsFor('persona.prova.2@example.test');
    assert.equal(row.marketing_consent, true);
    assert.ok(row.marketing_consent_at);
  });

  await check('dati obbligatori mancanti o non validi → 422 con errori per campo, nessun salvataggio', async () => {
    const before = (await db`select count(*)::int c from simposio_registrations`)[0].c;
    let res = await register(app, { fullName: '', email: '', phone: '' });
    let data = await res.json();
    assert.equal(res.status, 422);
    assert.ok(data.errors.fullName && data.errors.email && data.errors.phone);
    res = await register(app, valid(3, { email: 'non-una-email', phone: 'abc' }));
    data = await res.json();
    assert.equal(res.status, 422);
    assert.ok(data.errors.email && data.errors.phone && !data.errors.fullName);
    res = await register(app, valid(3, { message: 'x'.repeat(1200) }));
    assert.equal(res.status, 422);
    res = await register(app, valid(3, { situation: 'valore-inventato' }));
    assert.equal(res.status, 422);
    const after = (await db`select count(*)::int c from simposio_registrations`)[0].c;
    assert.equal(after, before);
  });

  await check('richieste non JSON o troppo grandi rifiutate', async () => {
    let res = await fetch(`${app}/api/simposio/iscrizione/`, { method: 'POST', headers: { 'content-type': 'text/plain' }, body: 'x' });
    assert.equal(res.status, 415);
    res = await fetch(`${app}/api/simposio/iscrizione/`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ fullName: 'x'.repeat(20000) }) });
    assert.equal(res.status, 413);
  });

  await check('campo trappola compilato: nessun salvataggio', async () => {
    await register(app, valid(4, { website: 'http://spam.example' }));
    assert.equal((await rowsFor('persona.prova.4@example.test')).length, 0);
  });

  await check('10 invii contemporanei della stessa persona → una sola iscrizione', async () => {
    mail.sent = [];
    const responses = await Promise.all(Array.from({ length: 10 }, () => register(app, valid(5))));
    assert.deepEqual(responses.map((r) => r.status), Array(10).fill(200));
    const rows = await rowsFor('persona.prova.5@example.test');
    assert.equal(rows.length, 1);
    assert.equal(rows[0].duplicate_attempts, 9);
    const confirmations = mail.sent.filter((m) => m.to === 'persona.prova.5@example.test' && /Iscrizione confermata/.test(m.subject));
    assert.equal(confirmations.length, 1, 'una sola email di conferma');
  });

  await check('reinvio con stessa email e dati diversi: dati originali non modificati, nessun dato restituito', async () => {
    mail.sent = [];
    const res = await register(app, valid(1, { fullName: 'Nome Sostitutivo', phone: '3399999999', comune: 'Altro' }));
    const data = await res.json();
    assert.equal(res.status, 200);
    assert.deepEqual(Object.keys(data).sort(), ['emailDelivery', 'ok']);
    const [row] = await rowsFor('persona.prova.1@example.test');
    assert.equal(row.full_name, 'Persona Prova 1');
    assert.equal(row.phone, '+393330000001');
    assert.equal(row.duplicate_attempts, 1);
    const notices = mail.sent.filter((m) => m.to === 'persona.prova.1@example.test');
    assert.equal(notices.length, 1);
    assert.match(notices[0].subject, /già registrata/);
    assert.match(notices[0].text, /Persona Prova|Persona/);
    await register(app, valid(1));
    assert.equal(mail.sent.filter((m) => m.to === 'persona.prova.1@example.test').length, 1, 'avviso duplicato limitato');
  });

  await check('errore email dopo salvataggio: iscrizione conservata, esito registrato, recupero al reinvio', async () => {
    mail.mode = 'fail';
    const res = await register(app, valid(6));
    const data = await res.json();
    assert.equal(res.status, 200);
    assert.equal(data.ok, true);
    assert.equal(data.emailDelivery, 'delayed');
    let [row] = await rowsFor('persona.prova.6@example.test');
    assert.equal(row.confirmation_email_status, 'failed');
    assert.equal(row.internal_notification_status, 'failed');
    mail.mode = 'ok';
    mail.sent = [];
    const retry = await (await register(app, valid(6))).json();
    assert.equal(retry.emailDelivery, 'sent');
    [row] = await rowsFor('persona.prova.6@example.test');
    assert.equal(row.confirmation_email_status, 'sent');
    assert.equal(row.confirmation_email_attempts, 2);
  });

  await check('errore dell’archivio: nessuna conferma mostrata (503)', async () => {
    await db`alter table simposio_registrations rename to simposio_registrations_off`;
    try {
      const res = await register(app, valid(7));
      const data = await res.json();
      assert.equal(res.status, 503);
      assert.equal(data.code, 'storage_error');
      assert.notEqual(data.ok, true);
    } finally {
      await db`alter table simposio_registrations_off rename to simposio_registrations`;
    }
  });

  await check('limitazione abusi: oltre 20 invii in 10 minuti dallo stesso IP → 429', async () => {
    const statuses = [];
    for (let i = 0; i < 21; i++) statuses.push((await register(app, valid(100 + i), '10.9.9.9')).status);
    assert.ok(statuses.slice(0, 20).every((s) => s === 200));
    assert.equal(statuses[20], 429);
  });

  await check('area riservata ed export non accessibili senza sessione valida', async () => {
    let res = await fetch(`${app}/area-riservata/simposio/`, { redirect: 'manual' });
    assert.ok([307, 308, 303].includes(res.status), `atteso redirect, ricevuto ${res.status}`);
    assert.match(res.headers.get('location') ?? '', /\/area-riservata\/?$/);
    res = await fetch(`${app}/area-riservata/simposio/export/`);
    assert.equal(res.status, 401);
    const forged = sessionCookie(STAFF_USER).replace(/.$/, (c) => (c === 'A' ? 'B' : 'A'));
    res = await fetch(`${app}/area-riservata/simposio/export/`, { headers: { cookie: forged } });
    assert.equal(res.status, 401, 'firma alterata');
    res = await fetch(`${app}/area-riservata/simposio/export/`, { headers: { cookie: sessionCookie(STAFF_USER, -1000) } });
    assert.equal(res.status, 401, 'sessione scaduta');
    res = await fetch(`${app}/area-riservata/simposio/export/`, { headers: { cookie: sessionCookie('intruso@example.test') } });
    assert.equal(res.status, 401, 'utente non autorizzato');
    const page = await (await fetch(`${app}/area-riservata/`)).text();
    assert.match(page, /noindex/);
    assert.doesNotMatch(page, /persona\.prova/);
  });

  await check('export CSV con sessione valida: dati completi e celle neutralizzate', async () => {
    await register(app, valid(8, { fullName: '=HYPERLINK("http://x") Prova' }));
    const res = await fetch(`${app}/area-riservata/simposio/export/`, { headers: { cookie: sessionCookie(STAFF_USER) } });
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type') ?? '', /text\/csv/);
    assert.match(res.headers.get('cache-control') ?? '', /no-store/);
    const csv = await res.text();
    assert.match(csv, /"Data iscrizione";"Nome e cognome";"Email";"Cellulare"/);
    assert.match(csv, /"\+393330000001"/, 'telefono leggibile, senza apostrofo');
    assert.match(csv, /persona\.prova\.1@example\.test/);
    assert.match(csv, /"'=HYPERLINK/);
    assert.match(csv, /Ho già un’idea/);
  });

  await check('elenco operativo con sessione valida', async () => {
    const res = await fetch(`${app}/area-riservata/simposio/`, { headers: { cookie: sessionCookie(STAFF_USER) } });
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.match(html, /persona\.prova\.1@example\.test/);
    assert.match(html, /Presenza riconfermata/);
  });

  // Configurazioni mancanti
  const noStorage = await startNext(3108, { ...baseEnv });
  await check('senza archivio configurato: 503 esplicito, nessun successo simulato', async () => {
    const res = await register(noStorage, valid(9));
    const data = await res.json();
    assert.equal(res.status, 503);
    assert.equal(data.code, 'unavailable');
    const login = await fetch(`${noStorage}/area-riservata/simposio/export/`, { headers: { cookie: sessionCookie(STAFF_USER) } });
    assert.equal(login.status, 503);
  });

  const testSender = await startNext(3109, { ...fullEnv, SIMPOSIO_FROM_EMAIL: 'Prosperya <onboarding@resend.dev>' });
  await check('mittente di prova Resend: iscrizione salvata, email al partecipante non inviata e registrata come tale', async () => {
    mail.sent = [];
    const data = await (await register(testSender, valid(10))).json();
    assert.equal(data.ok, true);
    assert.equal(data.emailDelivery, 'delayed');
    const [row] = await rowsFor('persona.prova.10@example.test');
    assert.equal(row.confirmation_email_status, 'skipped');
    assert.equal(row.confirmation_email_detail, 'mittente_di_prova');
    assert.equal(mail.sent.filter((m) => m.to === 'persona.prova.10@example.test').length, 0);
  });

  const closed = await startNext(3110, { ...fullEnv, SIMPOSIO_REGISTRATIONS: 'closed' });
  await check('iscrizioni chiuse (SIMPOSIO_REGISTRATIONS=closed): API rifiuta con 409', async () => {
    const res = await register(closed, valid(11));
    assert.equal(res.status, 409);
    assert.equal((await rowsFor('persona.prova.11@example.test')).length, 0);
  });
} finally {
  for (const s of servers) s.kill();
  await db.end({ timeout: 1 });
  await dbServer.stop();
  await pg.close();
  mailServer.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} verifiche superate.`);
process.exit(failed.length ? 1 : 0);
