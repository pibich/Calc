-- Run this in Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

drop policy if exists "profile_select_own" on public.profiles;
create policy "profile_select_own"
  on public.profiles
  for select
  using (auth.uid() = id);

drop policy if exists "profile_insert_own" on public.profiles;
create policy "profile_insert_own"
  on public.profiles
  for insert
  with check (auth.uid() = id);

drop policy if exists "profile_update_own" on public.profiles;
create policy "profile_update_own"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Clan recruitment posts (readable by anyone; write only by owner)
create table if not exists public.clan_recruitment_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  leader_name text not null,
  clan_name text not null,
  clan_level integer not null default 1 check (clan_level >= 0 and clan_level <= 999),
  slots_text text not null,
  contact text not null,
  is_recruiting boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clan_recruitment_posts_created_at_idx
  on public.clan_recruitment_posts (created_at desc);

create or replace function public.set_clan_recruitment_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists clan_recruitment_posts_set_updated_at on public.clan_recruitment_posts;
create trigger clan_recruitment_posts_set_updated_at
  before update on public.clan_recruitment_posts
  for each row execute function public.set_clan_recruitment_updated_at();

alter table public.clan_recruitment_posts enable row level security;

drop policy if exists "clan_posts_select_all" on public.clan_recruitment_posts;
create policy "clan_posts_select_all"
  on public.clan_recruitment_posts
  for select
  using (true);

drop policy if exists "clan_posts_insert_own" on public.clan_recruitment_posts;
create policy "clan_posts_insert_own"
  on public.clan_recruitment_posts
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "clan_posts_update_own" on public.clan_recruitment_posts;
create policy "clan_posts_update_own"
  on public.clan_recruitment_posts
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "clan_posts_delete_own" on public.clan_recruitment_posts;
create policy "clan_posts_delete_own"
  on public.clan_recruitment_posts
  for delete
  using (auth.uid() = user_id);

-- Length limits (defense in depth; matches recruit form + js/recruit.js FIELD_LIMITS).
-- Safe to run once on existing projects.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'clan_recruitment_posts_text_limits'
      and conrelid = 'public.clan_recruitment_posts'::regclass
  ) then
    alter table public.clan_recruitment_posts
      add constraint clan_recruitment_posts_text_limits check (
        char_length(leader_name) between 1 and 120
        and char_length(clan_name) between 1 and 120
        and char_length(slots_text) between 1 and 200
        and char_length(contact) between 1 and 500
      );
  end if;
end $$;
