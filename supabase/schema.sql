-- Nova Works dashboard database.
-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.

-- 1. Who may use the dashboard -------------------------------------------
create table if not exists public.admins (
  email text primary key
);

-- CHANGE THIS to the email you will log in with:
insert into public.admins (email) values ('your-email@example.com')
on conflict do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table public.admins enable row level security;
-- (no policies: the admins list can't be read or changed from the website)

-- 2. Projects (portfolio) ---------------------------------------------------
create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null,
  client       text default '',
  category     text not null default 'client' check (category in ('client', 'venture', 'open-source')),
  status       text not null default 'upcoming' check (status in ('live', 'in-progress', 'upcoming')),
  sector       text default '',
  year         int,
  featured     boolean not null default false,
  hidden       boolean not null default false,
  sort_order   int not null default 100,
  summary      text default '',
  problem      text default '',
  solution     text default '',
  disciplines  text[] not null default '{}',
  deliverables text[] not null default '{}',
  stack        text[] not null default '{}',
  link         text default '',
  cover_url    text default '',
  sections     jsonb not null default '[]',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Anyone can view public projects" on public.projects;
create policy "Anyone can view public projects" on public.projects
  for select using (hidden = false);

drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects" on public.projects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- 3. Enquiries (contact form) ----------------------------------------------
create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 120),
  company     text check (char_length(company) <= 160),
  email       text not null check (char_length(email) between 3 and 200),
  phone       text check (char_length(phone) <= 40),
  area        text,
  message     text not null check (char_length(message) between 1 and 5000),
  status      text not null default 'new' check (status in ('new', 'replied', 'archived')),
  reply       text,
  replied_at  timestamptz,
  created_at  timestamptz not null default now()
);

alter table public.enquiries enable row level security;

drop policy if exists "Anyone can send an enquiry" on public.enquiries;
create policy "Anyone can send an enquiry" on public.enquiries
  for insert to anon, authenticated
  with check (status = 'new' and reply is null and replied_at is null);

drop policy if exists "Admins read enquiries" on public.enquiries;
create policy "Admins read enquiries" on public.enquiries
  for select to authenticated using (public.is_admin());

drop policy if exists "Admins update enquiries" on public.enquiries;
create policy "Admins update enquiries" on public.enquiries
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins delete enquiries" on public.enquiries;
create policy "Admins delete enquiries" on public.enquiries
  for delete to authenticated using (public.is_admin());

-- 4. Image and video storage -------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

drop policy if exists "Admins upload portfolio media" on storage.objects;
create policy "Admins upload portfolio media" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio' and public.is_admin());

drop policy if exists "Admins change portfolio media" on storage.objects;
create policy "Admins change portfolio media" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio' and public.is_admin());

drop policy if exists "Admins delete portfolio media" on storage.objects;
create policy "Admins delete portfolio media" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio' and public.is_admin());
