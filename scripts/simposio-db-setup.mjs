// Crea (o aggiorna in modo idempotente) le tabelle dell’archivio iscrizioni.
// Uso: npm run simposio:db:setup   (legge SIMPOSIO_DATABASE_URL o DATABASE_URL, anche da .env.local)
import { readFile } from 'node:fs/promises';
import postgres from 'postgres';

const url = process.env.SIMPOSIO_DATABASE_URL || process.env.DATABASE_URL;
if (!url) {
  console.error('Imposta SIMPOSIO_DATABASE_URL o DATABASE_URL (vedi docs/simposio.md).');
  process.exit(1);
}

const sql = postgres(url, { prepare: false, max: 1, onnotice: () => {} });
try {
  const schema = await readFile(new URL('../db/simposio.sql', import.meta.url), 'utf8');
  await sql.unsafe(schema);
  const [{ count }] = await sql`select count(*)::int as count from simposio_registrations`;
  console.log(`Archivio pronto. Iscrizioni presenti: ${count}.`);
} catch (error) {
  console.error('Configurazione non riuscita:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await sql.end();
}
