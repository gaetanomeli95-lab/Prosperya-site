import 'server-only';
import postgres from 'postgres';

/**
 * Connessione all’archivio Postgres delle iscrizioni.
 * Accetta SIMPOSIO_DATABASE_URL oppure DATABASE_URL (impostata dall’integrazione Neon di Vercel).
 */

let client: postgres.Sql | null = null;

export function databaseUrl(): string | null {
  return process.env.SIMPOSIO_DATABASE_URL || process.env.DATABASE_URL || null;
}

export function isStorageConfigured(): boolean {
  return Boolean(databaseUrl());
}

export class StorageNotConfiguredError extends Error {
  constructor() {
    super('Archivio iscrizioni non configurato');
  }
}

export function sql(): postgres.Sql {
  const url = databaseUrl();
  if (!url) throw new StorageNotConfiguredError();
  if (!client) {
    client = postgres(url, {
      // Compatibile con i pooler (PgBouncer/Neon) e con l’esecuzione serverless.
      prepare: false,
      max: Math.min(Math.max(Number(process.env.SIMPOSIO_DB_POOL_MAX) || 3, 1), 10),
      idle_timeout: 20,
      connect_timeout: 8,
      onnotice: () => {},
    });
  }
  return client;
}
