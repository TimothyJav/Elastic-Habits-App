# Strategia Testowania — Elastic Habits

## Stack Narzędzi (rzeczywisty)

| Typ testów | Narzędzie | Użycie w projekcie |
|---|---|---|
| Unit Tests | Vitest 4.x | ✅ Aktywnie używane |
| Integration Tests | Vitest (mock) | ✅ Część unit testów |
| E2E Tests | Playwright 1.x | 🟡 Zaplanowane, nie implementowane |
| CI/CD | GitHub Actions | 🟡 Brak workflow, testy lokalne |
| Coverage | Vitest Coverage | 🟡 Nie skonfigurowany |

## Poziomy Testów

### 1. Unit Tests — obecny stan
- **Lokalizacja kodu:** `__tests__/` (root)
- **Pliki testowe:**
  - `__tests__/streak-utils.test.ts` — 5 testów
  - `__tests__/ai-scaling.test.ts` — 4 testów
- **Razem:** 9 testów przechodzących
- **Uruchomienie:** `npm run test`

### 2. Integration Tests — obecny stan
- Brak dedykowanych plików integracyjnych
- Supabase queries są mockowane w unit testach
- API routes nie mają testów integracyjnych

### 3. E2E Tests — brak implementacji
- Playwright wymieniony w `docs/roles/tester/README.md`, ale nie zainstalowany w `package.json`
- Scenariusze zdefiniowane w `test_scenarios_e2e.md`

## ADHD-Specyficzne Wymagania Testowe

| Wymaganie | Priorytet | Status |
|---|---|---|
| Emergency completion = streak +1 | Critical | ✅ Przetestowane |
| Brak przycisku "Reset streak" w UI | Critical | ✅ Weryfikowane ręcznie |
| Offline-first - logi dostępne bez sieci | High | 🟡 Nie przetestowane |
| Szybkie ładowanie < 1s | High | 🟡 Nie przetestowane automatycznie |
| Loading states i empty states | Medium | ✅ Weryfikowane ręcznie |
| Bottom nav responsywny (≥44px touch target) | Medium | ✅ Weryfikowane ręcznie |

## Kryteria Akceptacji Testów (według PLAN_ui_modernization.md)

- [x] Build: compiled successfully (`npm run build`)
- [x] TypeScript: no errors (`npm run typecheck`)
- [x] Vitest: 9/9 tests passed (`npm run test`)
