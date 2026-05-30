# PLAN_daily_focus_dashboard

## Cel
Nadać aplikacji bardziej kompletny i profesjonalny charakter przez dodanie codziennego panelu pracy z nawykami. Użytkownik powinien od razu widzieć, co może zrobić dzisiaj, jaki ma poziom energii i jak Emergency wspiera ciągłość bez wstydu.

## Zakres
- Dashboard „Dzisiaj” z podsumowaniem aktywności.
- Szybki check-in energii użytkownika.
- Profesjonalniejsze karty nawyków z poziomami Full, Adjusted i Emergency.
- Szablony popularnych nawyków w formularzu dodawania.
- Aktualizacja rejestrów SDD.

Poza zakresem:
- Pełny system kont użytkowników.
- Implementacja E2E Playwright.
- Nowe tabele w bazie danych.

## Wymagania funkcjonalne
- Użytkownik widzi liczbę nawyków, wykonania dzisiaj, wykonania tygodniowe i liczbę użyć Emergency.
- Użytkownik może wybrać poziom energii na dziś.
- Każdy zapisany nawyk pokazuje, czy został już wykonany dzisiaj.
- Formularz dodawania oferuje gotowe szablony nawyków.
- Oznaczenie Full, Adjusted lub Emergency zapisuje log tak jak dotychczas.

## Wymagania niefunkcjonalne
- Interfejs mobile-first.
- Brak czerwonych komunikatów porażki i mechanizmów kary.
- Emergency jest opisane jako sukces, nie jako tryb gorszy.
- Zmiana nie wymaga migracji bazy danych.

## Kontekst techniczny
- Next.js App Router.
- Dane pobierane przez `getHabits`.
- Logi zapisywane przez `logHabitCompletion`.
- UI oparty o Tailwind CSS i istniejące komponenty.

## Kroki implementacji
1. Dodać komponent daily dashboard z kartami statystyk.
2. Rozbudować listę nawyków o widok „Dzisiaj”.
3. Dodać check-in energii jako lokalny stan UI.
4. Dodać szablony nawyków w `AddHabitForm`.
5. Zaktualizować rejestry `implemented_plans.md` i `implemented_features.md`.

## Kryteria akceptacji
- Dashboard nie wygląda jak pusty ekran z dwoma przyciskami.
- Użytkownik widzi konkretne akcje na dziś.
- Emergency jest dostępne bez dodatkowej konfiguracji.
- Puste stany zachęcają do działania bez zawstydzania.
- `npm run typecheck` przechodzi.

## Testy
- Uruchomić `npm run typecheck`.
- Uruchomić `npm run test`.
- Sprawdzić ręcznie pusty dashboard i dashboard z nawykami.
