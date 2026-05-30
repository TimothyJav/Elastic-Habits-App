# Scenariusze Testów ADHD-Specyficznych

> Te scenariusze są pochodną z `docs/roles/tester/README.md` i `docs/my workflows/other workflows/assignment_requirements.md`.
> Każdy z nich testuje regułę biznesową specyficzną dla użytkowników ADHD.

---

## TC-ADHD-001: Emergency completion zwiększa streak o 1

**Reguła biznesowa:** Każde wykonanie nawyku (Full, Adjusted lub Emergency) = +1 do streak. Nigdy nie zmniejszaj streak za Emergency.

| Atrybut | Wartość |
|---|---|
| Priorytet | 🔴 Critical |
| Moduł | `streak-utils.ts` — `calculateStreak()` |
| Test jednostkowy | TC-004 w `test_scenarios_unit.md` |
| Status | ✅ Przechodzi |

### Scenariusz:

| Dzień | Poziom | Oczekiwany streak |
|---|---|---|
| 1 | Full | 1 |
| 2 | Full | 2 |
| 3 | **Emergency** | **3** |
| 4 | Full | 4 |

**Weryfikacja ręczna (manualna):**
1. Zaloguj się na `/dashboard`
2. Dodaj nawyk "Ćwiczenia"
3. Wykonaj nawyk na poziomie Emergency przez 3 kolejne dni
4. Sprawdź: wyświetlany streak = 3
5. Sprawdź: nie ma komunikatu "streak zresetowany" ani "porażka"

---

## TC-ADHD-002: Brak przycisku "Reset streak" w UI

**Reguła biznesowa:** Nieusuwalne resety streaków są zabronione (Emancypacja od Wstydu).

| Atrybut | Wartość |
|---|---|
| Priorytet | 🔴 Critical |
| Moduł | Wszystkie podstrony UI |
| Test E2E | E2E-002 w `test_scenarios_e2e.md` |
| Status | ✅ Weryfikowane ręcznie |

### Weryfikacja ręczna:

1. Otwórz DevTools → Elements
2. Wyszukaj `querySelectorAll('button, [role="button"]')` na `/dashboard`
3. Sprawdź: brak przycisku z tekstem zawierającym "reset streak"
4. Sprawdź: brak opcji w menu ustawień nawyku dotyczącej resetu

**Zakazane elementy UI:**
- `[name="Reset streak"]` ❌
- `[aria-label="Reset streak counter"]` ❌
- `<span>Resetuj ciągłość</span>` ❌

---

## TC-ADHD-003: Offline-first — logi zapisywane lokalnie

**Reguła biznesowa:** Aplikacja działa bez połączenia z internetem (Zero tarcia przy zbieraniu danych).

| Atrybut | Wartość |
|---|---|
| Priorytet | 🟡 High |
| Moduł | Service Worker, IndexedDB / localStorage |
| Test E2E | E2E-004 w `test_scenarios_e2e.md` |
| Status | 🟡 Nie przetestowane automatycznie |

### Scenariusz offline:

1. Wejście na `/dashboard` jako zalogowany użytkownik
2. Wyłączenie sieci (DevTools → Network → Offline)
3. Kliknięcie "Zakończ nawyk" na poziomie Emergency
4. Weryfikacja: log pojawia się w localStorage/IndexedDB
5. Włączenie sieci
6. Weryfikacja: log wysłany na Supabase bez ręcznej akcji użytkownika

### Edge case:
- Jeśli użytkownik zamknie przeglądarkę podczas offline, logi nie mogą zniknąć
- Jeśli użytkownik włączy sieć, wysyłka musi nastąpić automatycznie bez dodatkowych promptów

---

## TC-ADHD-004: Ładowanie strony w < 1s

**Reguła biznesowa:** Każda sekunda konfiguracji to ryzyko porzucenia aplikacji.

| Atrytot | Wartość |
|---|---|
| Priorytet | 🟡 High |
| Moduł | `next.config.mjs`, lazy loading komponentów |
| Test | Lighthouse (lub manualny w DevTools) |
| Status | 🟡 Nie przetestowane automatycznie |

### Metoda pomiaru:
1. Wejście na `/dashboard` jako nowy użytkownik (brak cache)
2. DevTools → Network → Disable cache
3. Odfreshuj stronę (Ctrl+Shift+R)
4. DevTools → Network → Timing → Sprawdź `DOMContentLoaded` i `load`
5. **Oczekiwany wynik:** `DOMContentLoaded` < 1s, `load` < 2s

### Typowy problem (do naprawienia jeśli występuje):
- Duże bundlowanie z `next build` (sprawdź w `app/_next/static/`)
- Brak `next/dynamic` dla komponentów nie krytycznych dla pierwszego renderu

---

## Podsumowanie statusu testów ADHD

| Scenariusz | Priorytet | status |
|---|---|---|
| TC-ADHD-001: Emergency = streak +1 | 🔴 Critical | ✅ Przechodzi |
| TC-ADHD-002: Brak reset streak | 🔴 Critical | ✅ Weryfikowane ręcznie |
| TC-ADHD-003: Offline-first | 🟡 High | 🟡 Nie przetestowane automatycznie |
| TC-ADHD-004: Ładowanie < 1s | 🟡 High | 🟡 Nie przetestowane automatycznie |
