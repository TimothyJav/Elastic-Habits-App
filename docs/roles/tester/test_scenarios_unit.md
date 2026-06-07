# Scenariusze Testów Jednostkowych (Unit)

## Lokalizacja implementacji

| Moduł | Ścieżka | Opis |
|---|---|---|
| `calculateStreak()` | `streak-utils.ts:1` | Oblicza długość ciągłości nawyków |
| `suggestEmergencyGoal()` | `lib/ai-scaling.ts:3` | Sugeruje cel Emergency na podstawie tytułu nawyku |
| `useAISuggestions()` | `lib/ai-scaling.ts:24` | Hook z memoizacją sugestii AI |

## Plik testowy: `__tests__/streak-utils.test.ts`

### TC-001: Puste logi zwracają streak 0
- **Priorytet:** Critical
- **Warunek:** `calculateStreak([])`
- **Oczekiwany wynik:** `0`
- **Status:** ✅ Przechodzi

### TC-002: Ostatni log starszy niż 2 dni wygasza streak
- **Priorytet:** Critical
- **Warunek:** Jeden log z 2 dni temu
- **Oczekiwany wynik:** `0`
- **Status:** ✅ Przechodzi

### TC-003: Kolejne dni z logami zwiększają streak
- **Priorytet:** Critical
- **Warunek:** Logi z dzisiaj, wczoraj i przedwczoraj
- **Oczekiwany wynik:** `3`
- **Status:** ✅ Przechodzi

### TC-004: Poziom Emergency nie psuje streak
- **Priorytet:** Critical (No-Shame Rule)
- **Warunek:** Logi z poziomem Emergency na kolejne dni
- **Oczekiwany wynik:** Streak rośnie (poziom jest ignorowany)
- **Status:** ✅ Przechodzi

### TC-005: Przerwa 2+ dni resetuje streak
- **Priorytet:** Critical
- **Warunek:** Log z dzisiaj i log z 3 dni temu
- **Oczekiwany wynik:** `1` (tylko dzisiejszy dzień)
- **Status:** ✅ Przechodzi

---

## Plik testowy: `__tests__\ai-scaling.test.ts`

### TC-006: Dopasowanie po tytule nawyku
- **Priorytet:** High
- **Warunek:** `suggestEmergencyGoal('Medytacja')`
- **Oczekiwany wynik:** Szablon Medytacja, goal: `'1 świadomy oddech'`
- **Status:** ✅ Przechodzi

### TC-007: Fallback dla chodzenia/biegania
- **Priorytet:** High
- **Warunek:** `suggestEmergencyGoal('Bieganie')`
- **Oczekiwany wynik:** Szablon Medytacja, goal: `'1 świadomy oddech'`
- **Status:** ✅ Przechodzi

### TC-008: Losowy fallback dla nieznanego nawyku
- **Priorytet:** Medium
- **Warunek:** `suggestEmergencyGoal('NieznanyNawykXYZ123')`
- **Oczekiwany wynik:** Jeden z 20 szablonów z `EMERGENCY_TEMPLATES`
- **Status:** ✅ Przechodzi

### TC-009: Memoizacja sugestii
- **Priorytet:** Medium
- **Warunek:** `useAISuggestions().suggestEmergencyGoal('Kodowanie')` wywołane 2×
- **Oczekiwany wynik:** Ta sama wartość obu razy (memoizacja)
- **Status:** ✅ Przechodzi

---

## Uruchomienie testów

```bash
npm run test       # Jednorazowe uruchomienie
npm run test:watch # Tryb watch dla dewelopmentu
```

## Pokrycie kodu (coverage)

- **`streak-utils.ts`:** 100% (5 testów pokrywa wszystkie gałęzie)
- **`lib/ai-scaling.ts`:** ~90% (brakuje edge-case z pustym stringiem)
- **Rekomendacja:** Dodać TC-010: pusty string jako tytuł nawyku → fallback lub null
