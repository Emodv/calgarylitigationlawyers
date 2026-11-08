-- Calgary Litigation Lawyers: database schema. Run once in Supabase > SQL Editor.
-- Re-running on an existing database: drop the tables first (no production data yet).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- lawyers: directory listings. Public only when verified.
-- Verification is free and independent of any advertising tier.
-- ---------------------------------------------------------------------------
create table public.lawyers (
  id                     uuid primary key default gen_random_uuid(),
  slug                   text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name                   text not null,
  firm_name              text,
  practice_areas         text[] not null default '{}'
    check (practice_areas <@ array['Commercial Litigation','Civil Litigation','Estate & Trust','Employment','Insolvency']::text[]),
  law_society_number     text check (law_society_number is null or law_society_number ~ '^[A-Za-z0-9-]{3,20}$'),
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
    is_verified = false
    or (verified_at is not null and verified_source_url is not null and law_society_number is not null)
  )
);

alter table public.lawyers enable row level security;
create policy "Public can read verified lawyers" on public.lawyers
  for select to anon, authenticated using (is_verified = true);
revoke all on public.lawyers from anon, authenticated;
grant select on public.lawyers to anon, authenticated;

-- ---------------------------------------------------------------------------
-- leads: consultation requests. Personal data. Server role only.
-- issue_summary holds REDACTED text. The raw description is never stored.
-- ---------------------------------------------------------------------------
create table public.leads (
  id                     uuid primary key default gen_random_uuid(),
  lawyer_id              uuid references public.lawyers(id) on delete set null,
  client_name            text,
  client_email           text check (client_email is null or length(client_email) <= 254),
  client_phone           text,
  practice_area          text not null
    check (practice_area in ('Commercial Litigation','Civil Litigation','Estate & Trust','Employment','Insolvency','Other / Unclear')),
  issue_summary          text not null,
  ai_redacted_summary    text,
  ai_lead_score          text not null check (ai_lead_score in ('Hot','Warm','Cold')),
  urgency                text check (urgency is null or urgency in ('low','medium','high')),
  deadline_mentioned     boolean not null default false,
  redaction_counts       jsonb not null default '{}'::jsonb,
  classification_status  text not null check (classification_status in ('ok','failed')),
  consent_at             timestamptz not null,
  status                 text not null default 'new' check (status in ('new','contacted','routed','closed')),
  created_at             timestamptz not null default now()
);

alter table public.leads enable row level security;
revoke all on public.leads from anon, authenticated;
-- No policies on leads: anon and authenticated have no access. Only the service role can read or write.

create index leads_score_created_idx on public.leads (ai_lead_score, created_at desc);
create index leads_lawyer_idx on public.leads (lawyer_id);
