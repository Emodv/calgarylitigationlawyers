-- Calgary Litigation Lawyers: database schema.
-- Run once in Supabase > SQL Editor. Safe to re-run (idempotent where possible).

-- ---------------------------------------------------------------------------
-- lawyers: directory listings. Every row must cite a primary source.
-- A listing is public ONLY when is_verified = true, and verification requires
-- a recorded verification date and a verification source URL.
-- ---------------------------------------------------------------------------
create table if not exists public.lawyers (
  id                     uuid primary key default gen_random_uuid(),
  slug                   text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name                   text not null,
  firm_name              text,
  practice_areas         text[] not null default '{}',
  address                text,
  phone                  text,
  email                  text,
  website                text,
  source_url             text not null check (source_url ~ '^https://'),
  source_retrieved_at    timestamptz not null default now(),
  is_verified            boolean not null default false,
  verified_at            timestamptz,
  verified_source_url    text check (verified_source_url is null or verified_source_url ~ '^https://'),
  created_at             timestamptz not null default now(),
  constraint verified_requires_evidence check (
    is_verified = false or (verified_at is not null and verified_source_url is not null)
  )
);

alter table public.lawyers enable row level security;

drop policy if exists "Public can read verified lawyers" on public.lawyers;
create policy "Public can read verified lawyers"
  on public.lawyers for select
  to anon, authenticated
  using (is_verified = true);

revoke all on public.lawyers from anon, authenticated;
grant select on public.lawyers to anon, authenticated;

-- ---------------------------------------------------------------------------
-- leads: inbound enquiries. Contains personal data. No public access.
-- Only the service role (server-side API route) can read or write.
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id                     uuid primary key default gen_random_uuid(),
  score                  text not null check (score in ('Hot', 'Warm', 'Cold')),
  practice_area          text not null,
  urgency                text not null check (urgency in ('low', 'medium', 'high')),
  deadline_mentioned     boolean not null default false,
  summary                text,
  redacted_description   text not null,
  redaction_counts       jsonb not null default '{}'::jsonb,
  classification_status  text not null check (classification_status in ('ok', 'failed')),
  contact_name           text,
  contact_email          text check (contact_email is null or length(contact_email) <= 254),
  contact_phone          text,
  consent_at             timestamptz not null,
  status                 text not null default 'new' check (status in ('new', 'routed', 'closed')),
  created_at             timestamptz not null default now()
);

alter table public.leads enable row level security;

revoke all on public.leads from anon, authenticated;
-- Intentionally no policies on leads: RLS is on with no grants for anon or authenticated.

create index if not exists leads_score_created_idx on public.leads (score, created_at desc);
