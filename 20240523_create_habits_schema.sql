-- Schemat MVP dla trybu demo bez logowania.
-- Wersja produkcyjna powinna ponownie podpiac user_id do auth.users i RLS.

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

create index habits_user_id_idx on habits(user_id);
create index habit_logs_user_id_idx on habit_logs(user_id);
create index habit_notes_habit_id_idx on habit_notes(habit_id);
create index habit_notes_user_id_idx on habit_notes(user_id);
