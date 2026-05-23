# PLAN_dashboard_visualization

## Cel
Stworzenie dashboardu wizualizującego postępy nawyków i streaki dla użytkownika ADHD.

## Zakres
- Wykresy postępów dziennych/tygodniowych
- Wizualizacja aktualnych streaków
- Nie wchodzi: zaawansowana analityka, eksport danych

## Wymagania funkcjonalne
1. Wyświetlanie listy nawyków z ostatnim poziomem ukończenia
2. Wizualizacja ciągłości (streaki) na wykresie słupkowym/kalendarzu
3. Podsumowanie tygodniowe z liczbą dni na każdym poziomie (Full/Adjusted/Emergency)

## Wymagania niefunkcjonalne
- Ładowanie w < 1s (Performance)
- Mobile-first responsywność
- Zero stanu "pusty dashboard" - domyślne wiadomości zachęcające

## Kontekst techniczny
- Dane z `habit_logs` (Supabase)
- Hook `useHabitsData()` dla pobierania logów
- Komponenty: `HabitChart.tsx`, `StreakCalendar.tsx`, `WeeklySummary.tsx`

## Kroki implementacji
1. Utworzyć hook `useHabitLogs(habitId, userId)`
2. Stworzyć komponent `HabitChart` z wykresem poziomów
3. Dodać `StreakCalendar` w formacie heatmap
4. Zaimplementować `WeeklySummary` z podsumowaniem tygodnia
5. Zintegrować z `app/dashboard/page.tsx`

## Kryteria akceptacji
- [ ] Dashboard ładuje się w < 1s
- [ ] Przycisk "Reset streak" nie istnieje (No-Shame)
- [ ] Poziom Emergency wyświetlany zielonym kolorem (celebracja sukcesu)

## Testy
- Test integracyjny sprawdzający renderowanie wykresu
- Test snapshot dla kluczowych komponentów