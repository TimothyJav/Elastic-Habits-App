# PLAN_reliable_habit_level_generation

## Cel
Poprawić generowanie poziomów nawyków tak, aby sugestie były przewidywalne, trafniejsze i mniej ryzykowne dla pierwszego wrażenia użytkownika.

## Zakres
- Usunięcie losowego fallbacku.
- Dodanie deterministycznego dopasowania po kategoriach i słowach kluczowych.
- Dodanie neutralnego fallbacku opartego o wpisany przez użytkownika cel.
- Aktualizacja testów jednostkowych i rejestrów SDD.

Poza zakresem:
- Nowy prompt lub endpoint AI.
- Migracje bazy danych.
- Personalizacja na podstawie historii użytkownika.

## Wymagania funkcjonalne
- To samo wejście zawsze daje tę samą sugestię.
- Znane kategorie, np. ruch, sprzątanie, nauka, sen, woda, kodowanie, mają dopasowane poziomy.
- Nieznany nawyk nie dostaje losowej sugestii z innej kategorii.
- Fallback zachowuje intencję użytkownika w poziomie Full.

## Wymagania niefunkcjonalne
- Sugestie muszą być ADHD-friendly i bez tonu oceniającego.
- Emergency ma być małym, konkretnym krokiem, a nie karą.
- Implementacja musi działać offline.

## Kontekst techniczny
- Logika znajduje się w `lib/ai-scaling.ts`.
- Formularz dodawania korzysta z `suggestHabitLevels`.
- Testy są w `__tests__/ai-scaling.test.ts`.

## Kroki implementacji
1. Zdefiniować katalog kategorii i słów kluczowych.
2. Dodać normalizację tekstu użytkownika.
3. Zastąpić losowy fallback neutralnym fallbackiem.
4. Zaktualizować testy.
5. Zaktualizować rejestry SDD.

## Kryteria akceptacji
- Dla nieznanego nawyku wynik nie pochodzi z losowego szablonu.
- Dla popularnych kategorii wynik jest stabilny.
- Testy jednostkowe przechodzą.
- `npm run typecheck` przechodzi.

## Testy
- `npm.cmd run typecheck`
- `npm.cmd run test`
