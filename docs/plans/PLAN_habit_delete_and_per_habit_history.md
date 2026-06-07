# PLAN_habit_delete_and_per_habit_history

## Cel
Ułatwić zarządzanie nawykami i poprawić czytelność historii postępów. Użytkownik powinien móc usunąć nieaktualny nawyk bez przypadkowego kliknięcia oraz widzieć historię ostatnich 28 dni dla konkretnego nawyku, a nie tylko zbiorczą aktywność całego dashboardu.

## Zakres
- Dodanie akcji usuwania nawyku z potwierdzeniem.
- Dodanie mini historii ostatnich 28 dni na każdej karcie nawyku.
- Usunięcie zdublowanego globalnego kalendarza aktywności.
- Usunięcie zdublowanego wykresu rozkładu poziomów, gdy tę samą rolę pełni podsumowanie tygodnia.
- Aktualizacja rejestrów SDD.

Poza zakresem:
- Archiwizacja nawyków zamiast usuwania.
- Przywracanie usuniętych nawyków.
- Nowa migracja bazy danych.

## Wymagania funkcjonalne
- Użytkownik widzi przycisk `X` w prawym górnym rogu karty nawyku.
- Kliknięcie usuwania wymaga potwierdzenia.
- Po potwierdzeniu nawyk jest usuwany z bazy razem z logami.
- Każda karta nawyku pokazuje ostatnie 28 dni tylko dla tego nawyku.
- Pod listą nawyków nie ma drugiego globalnego podsumowania ostatnich 28 dni.
- Dashboard nie dubluje podsumowania tygodnia osobnym wykresem rozkładu poziomów.

## Wymagania niefunkcjonalne
- Komunikat potwierdzenia jest własnym elementem UI, a nie natywnym alertem przeglądarki.
- Komunikat potwierdzenia nie powinien zawstydzać użytkownika.
- Usuwanie nie może przypadkowo usuwać nawyków innego użytkownika.
- UI pozostaje mobile-first i nie zwiększa tarcia codziennego oznaczania nawyku.
- Emergency pozostaje traktowane jako pełnoprawny sukces w historii.

## Kontekst techniczny
- Dane nawyków pochodzą z `getHabits`.
- Usuwanie realizuje server action w `lib/habitActions.ts`.
- `habit_logs` ma relację `on delete cascade`, więc logi usuwają się wraz z nawykiem.
- UI karty nawyku znajduje się w `components/HabitList.tsx`.

## Kroki implementacji
1. Dodać server action `deleteHabit`.
2. Dodać przycisk usuwania w karcie nawyku z potwierdzeniem.
3. Odświeżyć dashboard po usunięciu.
4. Dodać per-nawykową mini historię 28 dni.
5. Usunąć globalny kalendarz 28 dni spod listy nawyków.
6. Usunąć zdublowany wykres rozkładu poziomów spod podsumowania tygodnia.
7. Zaktualizować `implemented_plans.md` i `implemented_features.md`.

## Kryteria akceptacji
- `npm run lint` przechodzi bez błędów.
- `npm run typecheck` przechodzi.
- `npm run test` przechodzi.
- Usunięcie wymaga potwierdzenia.
- Potwierdzenie usuwania nie używa natywnego komunikatu przeglądarki.
- Historia w karcie nawyku nie miesza logów innych nawyków.
- Pod listą nawyków zostaje jedno zbiorcze podsumowanie tygodnia.

## Testy
- Uruchomić `npm run lint`.
- Uruchomić `npm run typecheck`.
- Uruchomić `npm run test`.
- Ręcznie sprawdzić usuwanie nawyku i anulowanie potwierdzenia.
