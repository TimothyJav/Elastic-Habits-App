  -- Reset bazy danych (usuwa stare tabele, jeśli istnieją)
  drop table if exists habit_logs;
  drop table if exists habits;

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

  -- Polityki dla tabeli 'habits'
  create policy "Users can manage their own habits"
    on habits for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

  -- Polityki dla tabeli 'habit_logs'
  create policy "Users can manage their own logs"
    on habit_logs for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

  -- Opcjonalnie: Automatyczne przypisywanie user_id przy insercie (ułatwia pracę z Server Actions)
  -- alter table habits alter column user_id set default auth.uid();
  -- alter table habit_logs alter column user_id set default auth.uid();