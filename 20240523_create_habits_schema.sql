-- Tabela nawyków z elastycznymi poziomami
create table habits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  level_full text not null,
  level_adjusted text not null,
  level_emergency text not null,
  created_at timestamptz default now()
);

-- Logi wykonania - kluczowe dla "No-Shame Streak"
create table habit_logs (
  id uuid default gen_random_uuid() primary key,
  habit_id uuid references habits on delete cascade not null,
  user_id uuid references auth.users not null,
  completed_at date default current_date,
  level_achieved text check (level_achieved in ('full', 'adjusted', 'emergency')) not null,
  -- Zapobiega dublowaniu wpisów tego samego dnia dla jednego nawyku
  unique(habit_id, completed_at)
);

-- RLS (Row Level Security) - dostęp tylko dla właściciela
alter table habits enable row level security;
alter table habit_logs enable row level security;