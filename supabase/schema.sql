-- Emergency Tree Board initial Supabase schema
-- Run in a dedicated Supabase project after reviewing all policies.

create extension if not exists pgcrypto;

create type public.emergency_operating_level as enum (
  'normal',
  'monitoring',
  'activated',
  'recovery'
);

create type public.emergency_report_category as enum (
  'blocked-road',
  'tree-on-structure',
  'whole-tree-failure',
  'large-limb-failure',
  'split-or-severe-lean',
  'utility-conflict',
  'other'
);

create type public.emergency_urgency as enum (
  'high',
  'moderate',
  'information'
);

create type public.emergency_verification_status as enum (
  'submitted',
  'screening',
  'needs-information',
  'verified',
  'official-source',
  'resolved',
  'rejected',
  'duplicate'
);

create table public.emergency_events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  operating_level public.emergency_operating_level not null default 'normal',
  starts_at timestamptz,
  ends_at timestamptz,
  public_summary text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.emergency_reports (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.emergency_events(id) on delete set null,
  category public.emergency_report_category not null,
  urgency public.emergency_urgency not null,
  verification_status public.emergency_verification_status not null default 'submitted',
  observed_at timestamptz,
  description text not null check (char_length(description) between 20 and 4000),
  location_description text not null,
  private_address text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  public_latitude numeric(9,6),
  public_longitude numeric(9,6),
  reporter_name text,
  reporter_email text,
  reporter_phone text,
  permission_to_contact boolean not null default false,
  safe_documentation_confirmed boolean not null default false,
  public_summary text,
  moderator_notes text,
  published_at timestamptz,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint emergency_reports_coordinates_pair check (
    (latitude is null and longitude is null) or
    (latitude is not null and longitude is not null)
  ),
  constraint emergency_reports_public_coordinates_pair check (
    (public_latitude is null and public_longitude is null) or
    (public_latitude is not null and public_longitude is not null)
  )
);

create table public.emergency_report_photos (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.emergency_reports(id) on delete cascade,
  storage_path text not null,
  original_filename text,
  alt_text text,
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);

create index emergency_reports_event_idx on public.emergency_reports(event_id);
create index emergency_reports_status_idx on public.emergency_reports(verification_status);
create index emergency_reports_category_idx on public.emergency_reports(category);
create index emergency_reports_created_idx on public.emergency_reports(created_at desc);

alter table public.emergency_events enable row level security;
alter table public.emergency_reports enable row level security;
alter table public.emergency_report_photos enable row level security;

-- Public users may only read explicitly public events.
create policy "Public can read public emergency events"
on public.emergency_events for select
using (is_public = true);

-- Public users may only read moderated reports with safe public coordinates.
create policy "Public can read verified emergency reports"
on public.emergency_reports for select
using (
  verification_status in ('verified', 'official-source', 'resolved')
  and published_at is not null
  and public_latitude is not null
  and public_longitude is not null
);

-- Public users may only read photos approved for publication and attached to a public report.
create policy "Public can read approved emergency photos"
on public.emergency_report_photos for select
using (
  is_public = true
  and exists (
    select 1
    from public.emergency_reports report
    where report.id = emergency_report_photos.report_id
      and report.verification_status in ('verified', 'official-source', 'resolved')
      and report.published_at is not null
  )
);

-- Do not add anonymous insert policies until server-side validation,
-- rate limiting, spam prevention, upload scanning, and moderation are active.
