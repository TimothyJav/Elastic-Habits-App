create table if not exists habit_notes (
  id uuid default gen_random_uuid() primary key,
  habit_id uuid references habits on delete cascade not null,
  user_id uuid not null,
  content text not null,
  created_at timestamptz default now()
);

create index if not exists habit_notes_habit_id_idx on habit_notes(habit_id);
create index if not exists habit_notes_user_id_idx on habit_notes(user_id);
