-- ====================================================
-- WAYFINDER SUPABASE MIGRATION SETUP
-- Run this script in the SQL Editor of your Supabase Dashboard
-- ====================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ----------------------------------------------------
-- 1. PROFILES TABLE
-- ----------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  nationality text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row-Level Security
alter table public.profiles enable row level security;

-- Drop existing policies if they exist to avoid duplicate errors
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

-- Create policies
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- ----------------------------------------------------
-- 2. USER PREFERENCES TABLE
-- ----------------------------------------------------
create table if not exists public.user_preferences (
  id uuid references public.profiles(id) on delete cascade primary key,
  preferred_travel_style text check (preferred_travel_style in ('Turismo', 'Estudos', 'Trabalho', 'Emigração', 'Nómada Digital')),
  preferred_destinations text[], -- Array of country slugs
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_preferences enable row level security;

-- Drop existing policies
drop policy if exists "Preferences are viewable by owner" on public.user_preferences;
drop policy if exists "Users can update their own preferences" on public.user_preferences;
drop policy if exists "Users can insert their own preferences" on public.user_preferences;

-- Create policies
create policy "Preferences are viewable by owner" on public.user_preferences
  for select using (auth.uid() = id);

create policy "Users can update their own preferences" on public.user_preferences
  for update using (auth.uid() = id);

create policy "Users can insert their own preferences" on public.user_preferences
  for insert with check (auth.uid() = id);

-- ----------------------------------------------------
-- 3. COUNTRIES TABLE
-- ----------------------------------------------------
create table if not exists public.countries (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  iso_code varchar(3) not null unique,
  capital text not null,
  continent text not null,
  population bigint not null,
  languages text not null,
  currency text not null,
  
  -- Travel & Legal Requirements
  visa_requirements text not null,
  passport_requirements text not null,
  etias_requirements text not null,
  vaccine_requirements text not null,
  
  -- Safety Metrics
  safety_score int not null check (safety_score between 1 and 10),
  emergency_numbers text not null,
  travel_warnings text,
  
  -- Economy & Budgets
  avg_hotel_price numeric not null,
  avg_meal_price numeric not null,
  avg_transport_cost numeric not null,
  cost_living_index int not null check (cost_living_index between 1 and 120),
  
  -- Climate Details
  climate_type text not null,
  climate_details text not null,
  
  -- Tourism & Cities
  top_attractions jsonb not null, -- Array of objects: [{name, desc, image}]
  major_cities text[] not null,
  best_time_visit text not null,
  
  -- Practical Metrics
  power_plug_type text not null,
  internet_quality_score int not null check (internet_quality_score between 1 and 10),
  transport_quality_score int not null check (transport_quality_score between 1 and 10),
  healthcare_quality_score int not null check (healthcare_quality_score between 1 and 10),
  
  -- Aesthetics
  image_url text,
  flag_emoji text,
  tagline text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.countries enable row level security;

-- Drop policies
drop policy if exists "Countries are viewable by everyone" on public.countries;

-- Create policies
create policy "Countries are viewable by everyone" on public.countries
  for select using (true);

-- Indexes for performance & quick search
create index if not exists idx_countries_slug on public.countries(slug);
create index if not exists idx_countries_name on public.countries(name);
create index if not exists idx_countries_continent on public.countries(continent);

-- ----------------------------------------------------
-- 4. FAVORITES TABLE
-- ----------------------------------------------------
create table if not exists public.favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  country_id uuid references public.countries(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, country_id)
);

-- Enable RLS
alter table public.favorites enable row level security;

-- Drop policies
drop policy if exists "Favorites are viewable by owner" on public.favorites;
drop policy if exists "Users can add their own favorites" on public.favorites;
drop policy if exists "Users can remove their own favorites" on public.favorites;

-- Create policies
create policy "Favorites are viewable by owner" on public.favorites
  for select using (auth.uid() = user_id);

create policy "Users can add their own favorites" on public.favorites
  for insert with check (auth.uid() = user_id);

create policy "Users can remove their own favorites" on public.favorites
  for delete using (auth.uid() = user_id);

create index if not exists idx_favorites_user on public.favorites(user_id);

-- ----------------------------------------------------
-- 5. COMPARISONS TABLE
-- ----------------------------------------------------
create table if not exists public.comparisons (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  country_a_id uuid references public.countries(id) on delete cascade not null,
  country_b_id uuid references public.countries(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.comparisons enable row level security;

-- Drop policies
drop policy if exists "Comparisons are viewable by owner" on public.comparisons;
drop policy if exists "Users can save their own comparisons" on public.comparisons;

-- Create policies
create policy "Comparisons are viewable by owner" on public.comparisons
  for select using (auth.uid() = user_id);

create policy "Users can save their own comparisons" on public.comparisons
  for insert with check (auth.uid() = user_id);

create index if not exists idx_comparisons_user on public.comparisons(user_id);

-- ----------------------------------------------------
-- 6. AUTOMATED AUTH SIGNUP TRIGGER SETUP
-- ----------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Provision Profile
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80')
  );
  
  -- Provision Default Preferences
  insert into public.user_preferences (id, preferred_travel_style, preferred_destinations)
  values (new.id, 'Turismo', '{}');
  
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if it exists before creating
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
