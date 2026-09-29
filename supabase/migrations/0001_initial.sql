create extension if not exists pgcrypto;

create table brands (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null
);

create table films (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand_id uuid references brands(id),
  film_type text not null,
  iso integer not null check (iso > 0),
  process text not null,
  description text,
  grain text,
  contrast text,
  saturation text,
  sharpness text,
  exposure_latitude text,
  manufacturer_url text,
  datasheet_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table film_formats (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table film_format_relations (
  film_id uuid references films(id) on delete cascade,
  format_id uuid references film_formats(id) on delete cascade,
  primary key (film_id, format_id)
);

create table cameras (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand_id uuid references brands(id),
  release_year integer,
  camera_type text,
  film_format text,
  lens_mount text,
  shutter_type text,
  shutter_speed_min text,
  shutter_speed_max text,
  exposure_modes text[],
  metering text,
  flash_sync text,
  battery text,
  weight_g integer,
  dimensions text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table technique_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null
);

create table techniques (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category_id uuid references technique_categories(id),
  difficulty text,
  reading_minutes integer,
  summary text,
  body jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table external_media (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('film','camera','technique')),
  entity_id uuid not null,
  image_url text not null,
  thumbnail_url text,
  source_name text not null,
  source_url text not null,
  creator text,
  license text,
  attribution_required boolean not null default true,
  alt_text text not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table external_sources (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('film','camera','technique')),
  entity_id uuid not null,
  title text not null,
  url text not null,
  source_type text,
  notes text,
  created_at timestamptz not null default now()
);

create index films_search_idx on films using gin (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(description,'')));
create index cameras_search_idx on cameras using gin (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(description,'')));
create index techniques_search_idx on techniques using gin (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(summary,'')));
