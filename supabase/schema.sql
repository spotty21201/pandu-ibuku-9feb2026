create extension if not exists pgcrypto;

create table if not exists public.articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null,
  domain text not null,
  content text,
  excerpt text,
  cover_image text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  author text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (domain, slug)
);

alter table public.articles enable row level security;

drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles"
on public.articles
for select
to anon, authenticated
using (status = 'published');

-- Service role key bypasses RLS for admin API routes.
