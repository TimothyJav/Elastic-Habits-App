# Scenariusze Testów E2E (End-to-End)

> **Uwaga:** Testy E2E nie są jeszcze implementowane w projekcie. Playwright wymieniony w `docs/roles/tester.md` nie jest zainstalowany w `package.json`. Poniższe scenariusze są zdefiniowane jako szablony do implementacji.

## Priorytetyzacja (ICE)

| Scenariusz | Wpływ | Pewność | Wysiłek | Priorytet |
|---|---|---|---|---|
| E2E-001: Login → Habit → Log Emergency | High | High | Medium | 🔴 Critical |
| E2E-002: Brak reset streak w UI | High | High | Low | 🔴 Critical |
| E2E-003: Emergency Switch zmienia poziom | High | High | Low | 🟡 High |
| E2E-004: Offline-first zapis | Medium | Medium | High | 🟡 High |
| E2E-005: PWA instalacja | Low | High | Low | 🟢 Low |

---

## E2E-001: Pełny flow — Login → Dodawanie nawyku → Log Emergency → Weryfikacja streak

**Scenariusz:** Użytkownik (ADHD Alex) loguje się, dodaje nawyk "Medytacja", zapisuje Emergency completion, weryfikuje że streak = 1 i nie ma przycisku reset.

### Kroki:
1. Wejście na `/login`
2. Wpisanie emaila i hasła
3. Kliknięcie "Zaloguj się"
4. Przekierowanie na `/dashboard`
5. Kliknięcie "Dodaj nawyk"
6. Wpisanie tytułu: "Medytacja", cel Full: "30 min"
7. Kliknięcie "Zapisz"
8. Kliknięcie na Emergency switch → wybór "Emergency"
9. Kliknięcie "Zakończ nawyk"
10. Weryfikacja: wyświetlany streak = 1
11. Weryfikacja: brak przycisku "Reset streak"
12. Weryfikacja: poziom Emergency wyświetlany w kolorze pomarańczowym (celebracja)

### Oczekiwane wyniki:
- Streak = 1 (wzrost, nie spadek)
- Poziom Emergency nie jest oznaczony jako "porażka"
- Przycisk "Reset streak" nie istnieje w DOM

---

## E2E-002: Weryfikacja braku przycisku reset streak

**Scenariusz:** Wyszukanie w DOM przycisku "Reset streak" lub podobnego tekstu.

### Kroki:
1. Wejście na `/dashboard` jako zalogowany użytkownik
2. Przeszukanie DOM pod kątem: `getByRole('button', { name: /reset/i })` lub `getByText(/reset streak/i)`

### Oczekiwany wynik:
- Element nie istnieje — test przechodzi tylko jeśli `expect(...).not.toBeInTheDocument()`

---

## E2E-003: Emergency Switch zmienia poziom nawyku

**Scenariusz:** Weryfikacja cyklu Full → Adjusted → Emergency → Full.

### Kroki:
1. Wejście na `/dashboard`
2. Pobranie aktualnego poziomu z DOM
3. Kliknięcie Emergency Switch (poziom Full)
4. Weryfikacja: poziom zmienił się na Adjusted
5. Kliknięcie ponowne →Emergency
6. Weryfikacja: poziom zmienił się na Emergency
7. Kliknięcie ponowne → Full
8. Weryfikacja: poziom wrócił do Full

### Oczekiwany wynik:
- Cykl działa poprawnie
- Po każdym kliknięciu DOM odświeża się w < 100ms

---

## E2E-004: Offline-first przypisanie streak

**Scenariusz:** Wylogowanie się z sieci, zapisanie logu nawyku, ponowne połączenie — streak powinien się zapisać.

> **Wymaganie:** Aplikacja działa jako PWA z Service Worker.

### Kroki:
1. Wejście na `/dashboard` jako zalogowany użytkownik
2. Przejście w tryb offline (DevTools → Network → Offline)
3. Kliknięcie "Zakończ nawyk" (poziom Emergency)
4. Weryfikacja: log został zapisany lokalnie (IndexedDB / localStorage)
5. Przejście w tryb online
6. Odświeżenie strony
7. Weryfikacja: log wysłany na serwer, streak = 1

---

## E2E-005: Instalacja PWA

**Scenariusz:** Użytkownik instaluje aplikację jako PWA na urządzeniu mobilnym.

### Kroki:
1. Wejście na `/` z przeglądarki mobilnej (Chrome Android / Safari iOS)
2. Wykrycie wyświetlenia "Dodaj do ekranu głównego"
3. Kliknięcie "Dodaj"
4. Sprawdzenie: aplikacja dostępna jako ikona na ekranie
5. Otwarcie aplikacji z PWA
6. Weryfikacja: działa bez paska adresu przeglądarki

---

## Status implementacji E2E

| Scenariusz | Status | Uwagi |
|---|---|---|
| E2E-001 | 🟡 Brak | Główny flow użytkownika |
| E2E-002 | 🟡 Brak | Wymagany dla certyfikacji No-Shame |
| E2E-003 | 🟡 Brak | Wymagany dla Emergency Switch UI |
| E2E-004 | 🟡 Brak | Zależy od implementacji offline-first |
| E2E-005 | 🟡 Brak | Zależy od konfiguracji `manifest.json` |

## Konfiguracja Playwright (do implementacji)

```json
// package.json — do dodania
{
  "devDependencies": {
    "@playwright/test": "^1.47.0"
  }
}
```

```typescript
// playwright.config.ts — do utworzenia w root
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

```bash
# Wymagane skrypty do package.json
"playwright:install": "playwright install chromium"
"test:e2e": "playwright test"
"test:e2e:ui": "playwright test --ui"
```
