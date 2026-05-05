# AI Agent Workflow: Elastic Habits Implementation

Ten dokument definiuje ustandaryzowany proces pracy dla agenta AI wspierającego budowę aplikacji Elastic Habits. Celem jest minimalizacja długu technicznego i maksymalizacja retencji użytkownika (ADHD Alex).

## 1. Zasady Ogólne (Guardrails)
- **Stack:** Next.js 14 (App Router), Supabase (Auth/DB), TailwindCSS, OpenAI (gpt-4o-mini).
- **Mobile-First:** Każdy komponent UI musi być zaprojektowany pod obsługę kciukiem na telefonie.
- **Low-Friction:** Minimalizuj liczbę kliknięć potrzebną do odhaczenia nawyku.
- **Shame-Free:** Logika aplikacji nigdy nie może "karać" użytkownika za użycie trybu Emergency.

## 2. Cykl Pracy Agenta (Iterative Loop)

Przy każdym nowym zadaniu (Feature/Bug), Agent musi przejść przez następujące kroki:

### Krok 1: Analiza Kontekstu (Context Discovery)
- Sprawdź `documentation/ice-ranking.md`, aby upewnić się, że zadanie ma wysoki priorytet.
- Odnieś się do `documentation/kill-the-idea-elastic-habits.md`, aby sprawdzić, czy rozwiązanie nie wpada w opisane pułapki (np. zbyt skomplikowane AI).

### Krok 2: Projektowanie Danych (Data Modeling)
- Zmiany w bazie danych muszą być zgodne ze schematem w `20240523_create_habits_schema.sql`.
- Zawsze używaj RLS (Row Level Security).

### Krok 3: Implementacja Logiki (Logic First)
- Wykorzystuj Server Actions do komunikacji z bazą.
- Logika streaków musi opierać się na `streak-utils.ts`, uwzględniając elastyczność poziomów (Full/Adjusted/Emergency traktowane są jako sukces).

### Krok 4: Budowa UI (Dopamine-Centric UX)
- Używaj TailwindCSS.
- **Zasada 2 sekund:** Decyzja o zmianie poziomu na Emergency nie może zająć więcej niż 2 sekundy.
- Dodawaj mikro-interakcje (np. konfetti z `canvas-confetti`) przy sukcesach.

## 3. Priorytety Implementacji (Roadmap Alignment)

Agent powinien kierować użytkownika według poniższej kolejności, chyba że instrukcja mówi inaczej:

1.  **Fundamenty:** Auth + Podstawowy CRUD nawyków.
2.  **The Heart (Emergency Switch):** Logika przełączania poziomów trudności i zapisywania logów.
3.  **Visual Feedback:** Dashboard z systemem "No-Shame Streaks".
4.  **AI Engine:** Integracja z OpenAI do generowania poziomów (z cachingiem).
5.  **Retention Tools:** PWA Setup + Web Push Notifications.

## 4. Wytyczne Kodowania (Style Guide)
- **Type Safety:** Obowiązkowy TypeScript. Interfejsy generowane z Supabase CLI.
- **Server Components:** Używaj RSC (React Server Components) tam, gdzie to możliwe, dla szybkości ładowania.
- **Error Handling:** Każda akcja AI musi mieć fallback do ręcznie przygotowanych szablonów (zgodnie z `ice-ranking.md`).

## 5. Checklista przed "Done"
- [ ] Czy funkcja działa poprawnie na urządzeniu mobilnym (RWD)?
- [ ] Czy obsłużono stan "Low Energy" użytkownika (czy proces nie jest zbyt męczący)?
- [ ] Czy zapytania do bazy są zoptymalizowane pod Supabase?
- [ ] Czy kod jest udokumentowany w sposób jasny dla Solo-Deva?

---
*Workflow stworzony w celu uniknięcia "ADHD Retention Trap" i optymalizacji budżetu 75h.*