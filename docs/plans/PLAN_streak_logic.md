# PLAN_streak_logic

## Cel
Zaimplementowanie logiki obliczania ciągłości nawyków (streak) która traktuje każdy poziom ukończenia jako sukces - brak kar za Emergency.

## Zakres
- Funkcja `calculateStreak(logs)` w `streak-utils.ts`
- Obsługa trzech poziomów: Full, Adjusted, Emergency
- Nie wchodzi: reset przy 0 dniach

## Wymagania funkcjonalne
1. **No-Shame Rule:** Każdy dzień z logiem = +1 do streaku
2. **Level Weight:** Wszystkie poziomy = równy wkład
3. **Gap Handling:** Przerwa > 24h = reset

## Wymagania niefunkcjonalne
- Obliczenia client-side w < 50ms
- Offline-first zapis logów

## Kontekst techniczny
- Dane z `habit_logs` z kolumną `level` (full/adjusted/emergency)
- Algorytm: sortowanie logów po dacie, iteracja z licznikiem

## Kroki implementacji
1. Stworzyć `streak-utils.ts` z `calculateStreak()`
2. Dodać typy dla logów i wyniku
3. Implementować algorytm z No-Shame logiką

## Kryteria akceptacji
- [ ] Emergency zwiększa streak o 1
- [ ] Brak przycisku "reset streak" w UI
- [ ] Streak nie spada przy Emergency

## Testy
- Test: 3 dni Full + 1 Emergency = streak 4
- Test: przerwa 48h = reset streak