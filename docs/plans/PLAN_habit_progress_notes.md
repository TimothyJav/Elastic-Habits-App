# PLAN_habit_progress_notes

## Cel
Umożliwić użytkownikowi zapisywanie krótkich refleksji o pracy nad konkretnym nawykiem. Notatki mają wspierać samoobserwację bez oceniania, szczególnie przy trudnościach z regularnością, zmianach energii lub nowych przemyśleniach.

## Zakres
- Dodanie tabeli `habit_notes` w schemacie Supabase.
- Dodanie server action do zapisu notatki.
- Dodanie przycisku „Dodaj notatkę” pod historią 28 dni każdego nawyku.
- Wyświetlenie ostatnich notatek przy konkretnym nawyku.
- Aktualizacja rejestrów SDD.

Poza zakresem:
- Edycja i usuwanie notatek.
- Zaawansowany dziennik z tagami.
- Analiza notatek przez AI.

## Wymagania funkcjonalne
- Użytkownik widzi przycisk „Dodaj notatkę” pod historią konkretnego nawyku.
- Kliknięcie otwiera własny dialog z polem tekstowym.
- Pusta notatka nie może zostać zapisana.
- Po zapisie notatka jest przypisana do konkretnego nawyku i użytkownika.
- Karta nawyku pokazuje ostatnie notatki dotyczące tylko tego nawyku.

## Wymagania niefunkcjonalne
- Komunikaty są wspierające i neutralne.
- UI pozostaje mobile-first.
- Notatki nie powinny blokować podstawowego przepływu oznaczania nawyku.
- Dane innego użytkownika nie mogą zostać przypadkowo zapisane do nie swojego nawyku.

## Kontekst techniczny
- Next.js App Router.
- Dane zapisywane przez Supabase server action.
- `habit_notes` ma relację `habit_id references habits on delete cascade`.
- Widok karty nawyku znajduje się w `components/HabitList.tsx`.

## Kroki implementacji
1. Dodać tabelę `habit_notes` do głównego schematu SQL.
2. Dodać osobny plik migracji dla istniejącej bazy.
3. Dodać `createHabitNote` w `lib/habitActions.ts`.
4. Rozszerzyć `getHabits` o pobieranie notatek.
5. Dodać dialog notatki i listę ostatnich notatek w karcie nawyku.
6. Zaktualizować `implemented_plans.md` i `implemented_features.md`.

## Kryteria akceptacji
- `npm run lint` przechodzi bez błędów.
- `npm run typecheck` przechodzi.
- `npm run test` przechodzi.
- Notatka zapisuje się dla właściwego nawyku.
- Notatki jednego nawyku nie mieszają się z innymi.

## Testy
- Uruchomić `npm run lint`.
- Uruchomić `npm run typecheck`.
- Uruchomić `npm run test`.
- Ręcznie sprawdzić dodanie notatki pod wybranym nawykiem.
