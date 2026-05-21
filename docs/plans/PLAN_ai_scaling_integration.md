# PLAN_ai_scaling_integration

## Cel
Dodanie lekkiej, dyskretnej integracji AI do automatycznego skalowania celów nawyków na poziom Emergency przy wykryciu spadku zaangażowania.

## Zakres
- AI sugeruje Emergency goal na podstawie historii logów
- Wykorzystanie istniejących szablonów z `templates.ts`
- Nie wchodzi: generowanie nowych szablonów, API zewnętrzne

## Wymagania funkcjonalne
1. `suggestEmergencyGoal(habitTitle)` zwraca najtrafniejszy szablon
2. Algorytm prostego dopasowania: 80% słów kluczowych match = sugestia
3. Przycisk "Użyj AI" w `AddHabitForm.tsx` dla automatycznego wypełnienia pól

## Wymagania niefunkcjonalne
- Offline-first - brak zależności od zewnętrznych API
- Działa w < 50ms (client-side)
- Zero konfiguracji - działa od razu

## Kontekst techniczny
- Dane: `EMERGENCY_TEMPLATES` z `templates.ts`
- Hook: `useAISuggestions()` z memoizacją
- Fallback: losowy szablon przy braku dopasowania

## Kroki implementacji
1. Utworzyć `lib/ai-scaling.ts` z funkcją `suggestEmergencyGoal(title)`
2. Dodać hook `useAISuggestions` z cache
3. Zintegrować przycisk AI w `AddHabitForm.tsx`
4. Dodać testy jednostkowe dla algorytmu dopasowywania

## Kryteria akceptacji
- [ ] Sugerowany Emergency goal odpowiada tematyce nawyku
- [ ] Fallback działa przy braku dopasowania
- [ ] Brak żądań do zewnętrznych serwerów

## Testy
- Test jednostkowy dla `suggestEmergencyGoal("Bieganie")` zwracający "1 świadomy oddech" z szablonu Medytacji