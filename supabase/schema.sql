-- La carta: un restaurante, sus categorías y sus platos.
create table restaurants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  owner_id uuid references auth.users not null
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants on delete cascade not null,
  name text not null,
  position int not null default 0
);

create table dishes (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants on delete cascade not null,
  category_id uuid references categories on delete cascade not null,
  name text not null,
  description text not null default '',
  price_cents int not null check (price_cents >= 0),
  allergens text[] not null default '{}',
  image_url text,
  available boolean not null default true,
  recommended boolean not null default false,
  position int not null default 0
);

-- Seguridad: todos pueden leer la carta; solo el dueño puede cambiarla.
alter table restaurants enable row level security;
alter table categories enable row level security;
alter table dishes enable row level security;

create policy "carta pública" on restaurants for select using (true);
create policy "carta pública" on categories for select using (true);
create policy "carta pública" on dishes for select using (true);

create policy "solo el dueño" on dishes for all
  using (restaurant_id in (select id from restaurants where owner_id = auth.uid()))
  with check (restaurant_id in (select id from restaurants where owner_id = auth.uid()));

-- Tiempo real: avisar a las cartas abiertas cuando cambia un plato.
alter publication supabase_realtime add table dishes;
