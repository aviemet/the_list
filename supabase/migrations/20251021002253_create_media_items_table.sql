create type media_type as enum ('movie', 'tv_show', 'book', 'comic', 'song', 'album');

create table media_items (
  id uuid primary key default gen_random_uuid(),
  media_type media_type not null,
  title text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table media_item_sources (
  id uuid primary key default gen_random_uuid(),
  media_item_id uuid not null references media_items(id) on delete cascade,
  external_source_id uuid not null references external_sources(id),
  external_id text not null,
  cached_data jsonb not null,
  last_fetched_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint unique_external_item unique (external_source_id, external_id)
);

create index media_items_media_type_idx on media_items(media_type);
create index media_item_sources_media_item_id_idx on media_item_sources(media_item_id);
create index media_item_sources_external_source_id_idx on media_item_sources(external_source_id);
create index media_item_sources_cached_data_idx on media_item_sources using gin(cached_data);

alter table media_items enable row level security;
alter table media_item_sources enable row level security;

create policy "Anyone can view media items"
  on media_items for select
  using (true);

create policy "Authenticated users can insert media items"
  on media_items for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update media items"
  on media_items for update
  using (auth.role() = 'authenticated');

create policy "Anyone can view media item sources"
  on media_item_sources for select
  using (true);

create policy "Authenticated users can insert media item sources"
  on media_item_sources for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update media item sources"
  on media_item_sources for update
  using (auth.role() = 'authenticated');

create trigger update_media_items_updated_at
  before update on media_items
  for each row
  execute function update_updated_at_column();

