-- Archivio iscrizioni del Simposio Prosperya.
-- Idempotente: può essere eseguito più volte (npm run simposio:db:setup oppure
-- incollato nell’editor SQL del provider Postgres).

create table if not exists simposio_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id text not null,
  created_at timestamptz not null default now(),

  full_name text not null,
  email text not null,
  phone text not null,
  comune text,
  situation text,
  message text,

  -- Consenso facoltativo e separato a comunicazioni su futuri eventi e iniziative.
  marketing_consent boolean not null default false,
  marketing_consent_at timestamptz,
  privacy_notice_version text not null,

  status text not null default 'iscritto'
    check (status in ('iscritto', 'riconfermato', 'presente', 'annullato')),
  status_updated_at timestamptz,
  status_updated_by text,

  confirmation_email_status text not null default 'pending'
    check (confirmation_email_status in ('pending', 'sending', 'sent', 'failed', 'skipped')),
  confirmation_email_detail text,
  confirmation_email_attempts integer not null default 0,
  confirmation_email_claimed_at timestamptz,
  confirmation_email_sent_at timestamptz,

  internal_notification_status text not null default 'pending'
    check (internal_notification_status in ('pending', 'sending', 'sent', 'failed', 'skipped')),
  internal_notification_detail text,

  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,

  duplicate_attempts integer not null default 0,
  last_duplicate_at timestamptz,
  duplicate_notice_at timestamptz,

  constraint simposio_registrations_event_email unique (event_id, email)
);

create index if not exists simposio_registrations_event_created
  on simposio_registrations (event_id, created_at desc);

-- Limitazione degli abusi: contatori per finestra temporale, chiavi già anonimizzate (HMAC).
create table if not exists simposio_rate_limits (
  bucket text not null,
  window_start timestamptz not null,
  hits integer not null default 0,
  primary key (bucket, window_start)
);
