# Scenariusze Testów Integracyjnych

## Zakres testów integracyjnych

Testy integracyjne weryfikują współpracę między modułami aplikacji: API routes, Supabase (DB + Auth) oraz komponenty React.

## Moduły podlegające testom

| Moduł | Zależność | Typ testu |
|---|---|---|
| Supabase Auth | Supabase | Mock |
| API routes (log habit) | Supabase + Next.js | Mock / Integration |
| Pobieranie logów nawyków | Supabase + React Query | Integration |
| RLS polityki (Row Level Security) | Supabase PostgreSQL | Integration |

---

## TC-INT-001: Pobieranie nawyków użytkownika

- **Priorytet:** Critical
- **Moduł:** Pobieranie nawyków przez Supabase client
- **Warunek:** Użytkownik zalogowany, wywołuje `supabase.from('habits').select()`
- **Oczekiwany wynik:** Lista nawyków tylko dla danego `user_id`
- **Status:** 🟡 Nie przetestowane automatycznie — RLS weryfikowane ręcznie w Supabase

## TC-INT-002: Zapis logu nawyku z poziomem Emergency

- **Priorytet:** Critical
- **Moduł:** Zapis do `habit_logs` przez Supabase
- **Warunek:** Użytkownik zapisuje log z `level = 'emergency'`
- **Oczekiwany wynik:** Rekord zapisany w DB, `calculateStreak()` zwraca poprawną wartość
- **Status:** 🟡 Nie przetestowane automatycznie

## TC-INT-003: RLS — użytkownik A nie widzi danych użytkownika B

- **Priorytet:** Critical (bezpieczeństwo)
- **Moduł:** Supabase RLS polityki
- **Warunek:** Użytkownik A próbuje pobrać nawyki użytkownika B
- **Oczekiwany wynik:** Pusty wynik lub błąd 403
- **Status:** 🟡 Weryfikowane ręcznie w Supabase SQL Editor

## TC-INT-004: API — tworzenie nawyku zwraca 201

- **Priorytet:** High
- **Moduł:** API route `app/api/habits/route.ts` (jeśli istnieje)
- **Warunek:** POST z poprawnym JWT tokenem
- **Oczekiwany wynik:** Status 201, nawyk zapisany w DB
- **Status:** 🟡 Nie przetestowane automatycznie

## TC-INT-005: API — brak dostępu bez tokena

- **Priorytet:** Critical (bezpieczeństwo)
- **Moduł:** API route
- **Warunek:** POST bez nagłówka Authorization
- **Oczekiwany wynik:** Status 401 Unauthorized
- **Status:** 🟡 Nie przetestowane automatycznie

---

## Rekomendacje dla wykładowcy

1. Zainstalować `msw` (Mock Service Worker) do mockowania Supabase w testach integracyjnych
2. Dodać `lib/supabase/mocks/` z repozytoriami danych testowych
3. Uruchomić testy integracyjne w GitHub Actions jako required check przed merge
