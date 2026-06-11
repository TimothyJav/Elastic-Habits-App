-- Schemat z RLS (Row Level Security) dla izolacji danych użytkowników
-- Włącz "Allow anonymous sign-ins" w Supabase → Authentication → Configuration → Providers

drop table if exists habit_notes;
drop table if exists habit_logs;
drop table if exists habits;

create table habits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null,
  title text not null,
  level_full text not null,
  level_adjusted text not null,
  level_emergency text not null,
  created_at timestamptz default now()
);

create table habit_logs (
  id uuid default gen_random_uuid() primary key,
  habit_id uuid references habits on delete cascade not null,
  user_id uuid not null,
  completed_at date default current_date,
  level_achieved text check (level_achieved in ('full', 'adjusted', 'emergency')) not null,
  unique(habit_id, completed_at)
);

create table habit_notes (
  id uuid default gen_random_uuid() primary key,
  habit_id uuid references habits on delete cascade not null,
  user_id uuid not null,
  content text not null,
  created_at timestamptz default now()
);

-- Indeksy
create index habits_user_id_idx on habits(user_id);
create index habit_logs_user_id_idx on habit_logs(user_id);
create index habit_notes_habit_id_idx on habit_notes(habit_id);
create index habit_notes_user_id_idx on habit_notes(user_id);

-- Polityki RLS - izolacja danych użytkowników
alter table habits enable row level security;
alter table habit_logs enable row level security;
alter table habit_notes enable row level security;

-- WAŻNE: warunek musi brzmieć "user_id = auth.uid()", a NIE
-- "... or auth.uid() is not null" — ten drugi człon pozwalał KAŻDEMU
-- zalogowanemu użytkownikowi czytać dane wszystkich (brak izolacji).
-- INSERT również sprawdza user_id = auth.uid(), żeby nie dało się
-- wstawić wiersza podszywając się pod cudze konto.

-- Polityki dla habits
create policy "Users can insert their own habits"
  on habits for insert with check (user_id = auth.uid());

create policy "Users can view their own habits"
  on habits for select using (user_id = auth.uid());

create policy "Users can update their own habits"
  on habits for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Users can delete their own habits"
  on habits for delete using (user_id = auth.uid());

-- Polityki dla habit_logs
create policy "Users can insert their own logs"
  on habit_logs for insert with check (user_id = auth.uid());

create policy "Users can view their own logs"
  on habit_logs for select using (user_id = auth.uid());

-- UPDATE jest potrzebne, bo logHabitCompletion robi upsert (onConflict),
-- który przy istniejącym wpisie wykonuje UPDATE.
create policy "Users can update their own logs"
  on habit_logs for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Users can delete their own logs"
  on habit_logs for delete using (user_id = auth.uid());

-- Polityki dla habit_notes
create policy "Users can insert their own notes"
  on habit_notes for insert with check (user_id = auth.uid());

create policy "Users can view their own notes"
  on habit_notes for select using (user_id = auth.uid());

create policy "Users can update their own notes"
  on habit_notes for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Users can delete their own notes"
  on habit_notes for delete using (user_id = auth.uid());
