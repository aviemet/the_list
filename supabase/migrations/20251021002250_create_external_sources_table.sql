create table external_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  display_name text not null,
  base_url text,
  api_documentation_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

