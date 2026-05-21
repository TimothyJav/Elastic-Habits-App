# PLAN_database_schema

## Cel
Zaprojektowanie i utworzenie schematu bazy danych dla nawyków z obsługą trzech poziomów trudności i Row Level Security.

## Zakres
- Tabele: `habits`, `habit_logs`
- RLS polityki
- Nie wchodzi: migracje, seed danych

## Wymagania funkcjonalne
1. **Habits Table:** id, user_id, title, full_goal, adjusted_goal, emergency_goal
2. **Habit Logs:** id, habit_id, user_id, level, created_at
3. **RLS:** Użytkownik widzi tylko swoje dane

## Wymagania niefunkcjonalne
- Indeksy na user_id dla szybkiego querying
- Trigger na aktualizację updated_at (jeśli potrzebne)

## Kontekst techniczny
- Supabase PostgreSQL
- SQL w pliku `20240523_create_habits_schema.sql`
- Typy: `level` enum('full','adjusted','emergency')

## Kroki implementacji
1. Utworzyć tabelę `habits` z kolumnami
2. Utworzyć tabelę `habit_logs` z FK do habits
3. Dodać RLS polityki
4. Utworzyć indeksy

## Kryteria akceptacji
- [ ] Zapytania działają < 100ms
- [ ] RLS chroni dane między użytkownikami
- [ ] Migracja przechodzi bez błędów

## Testy
- Test SQL schema w Supabase
- Test RLS - użytkownik A nie widzi danych B