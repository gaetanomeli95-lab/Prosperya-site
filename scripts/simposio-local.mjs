// Ambiente locale di prova per vedere pagina, modulo e area riservata senza servizi esterni:
// Postgres in memoria + finto provider email (le email vengono stampate in console, non inviate).
// Uso: npm run build && node scripts/simposio-local.mjs   → http://localhost:3200/simposio/
// Credenziali area riservata di prova: prova@example.test / password-locale-123
import { spawn } from 'node:child_process';
import { randomBytes, scrypt } from 'node:crypto';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';

const pg = await PGlite.create();
await pg.exec(await readFile(new URL('../db/simposio.sql', import.meta.url), 'utf8'));
const dbServer = new PGLiteSocketServer({ db: pg, port: 54349, host: '127.0.0.1', maxConnections: 4 });
await dbServer.start();

createServer((req, res) => {
  let body = '';
  req.on('data', (c) => { body += c; });
  req.on('end', () => {
    const mail = JSON.parse(body || '{}');
    console.log(`[email simulata] a ${mail.to} · ${mail.subject}`);
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ id: `locale-${Date.now()}` }));
  });
}).listen(54350, '127.0.0.1');

const salt = randomBytes(16);
const hash = await promisify(scrypt)('password-locale-123', salt, 32);
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3200'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    DATABASE_URL: 'postgres://postgres:postgres@127.0.0.1:54349/postgres',
    SIMPOSIO_DB_POOL_MAX: '1',
    RESEND_API_KEY: 're_locale',
    RESEND_BASE_URL: 'http://127.0.0.1:54350',
    SIMPOSIO_FROM_EMAIL: 'Prosperya Eventi <eventi@example.test>',
    SIMPOSIO_NOTIFICATION_EMAIL: 'organizzazione@example.test',
    AREA_RISERVATA_SECRET: randomBytes(32).toString('base64url'),
    AREA_RISERVATA_UTENTI: `prova@example.test=scrypt$${salt.toString('base64url')}$${hash.toString('base64url')}`,
  },
});
const stop = async () => { child.kill(); await dbServer.stop(); await pg.close(); process.exit(0); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
