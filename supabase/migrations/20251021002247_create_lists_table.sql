create table lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index lists_user_id_idx on lists(user_id);
create index lists_is_public_idx on lists(is_public) where is_public = true;

alter table lists enable row level security;

create policy "Users can view their own lists"
  on lists for select
  using (auth.uid() = user_id);

create policy "Users can view public lists"
  on lists for select
  using (is_public = true);

create policy "Users can insert their own lists"
  on lists for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own lists"
  on lists for update
  using (auth.uid() = user_id);

create policy "Users can delete their own lists"
  on lists for delete
  using (auth.uid() = user_id);

create function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_lists_updated_at
  before update on lists
  for each row
  execute function update_updated_at_column();

