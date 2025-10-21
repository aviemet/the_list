create table list_items (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references lists(id) on delete cascade,
  media_item_id uuid not null references media_items(id) on delete cascade,
  position integer not null,
  notes text,
  added_at timestamptz not null default now(),
  constraint unique_item_per_list unique (list_id, media_item_id)
);

create index list_items_list_id_idx on list_items(list_id);
create index list_items_media_item_id_idx on list_items(media_item_id);
create index list_items_position_idx on list_items(list_id, position);

alter table list_items enable row level security;

create policy "Users can view list items from their lists"
  on list_items for select
  using (
    exists (
      select 1 from lists
      where lists.id = list_items.list_id
      and lists.user_id = auth.uid()
    )
  );

create policy "Users can view list items from public lists"
  on list_items for select
  using (
    exists (
      select 1 from lists
      where lists.id = list_items.list_id
      and lists.is_public = true
    )
  );

create policy "Users can insert list items into their lists"
  on list_items for insert
  with check (
    exists (
      select 1 from lists
      where lists.id = list_items.list_id
      and lists.user_id = auth.uid()
    )
  );

create policy "Users can update list items in their lists"
  on list_items for update
  using (
    exists (
      select 1 from lists
      where lists.id = list_items.list_id
      and lists.user_id = auth.uid()
    )
  );

create policy "Users can delete list items from their lists"
  on list_items for delete
  using (
    exists (
      select 1 from lists
      where lists.id = list_items.list_id
      and lists.user_id = auth.uid()
    )
  );

