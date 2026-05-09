# System Overview

## Cel
Aplikacja wspierająca budowę nawyków u osób z ADHD poprzez adaptacyjne skalowanie trudności (Adaptive Scaling).

## Architektura
- **Frontend:** Next.js 14 (App Router) serwowany na Vercel.
- **Backend:** Next.js Server Actions (logic) + Supabase (database/auth).
- **AI Engine:** OpenAI API (gpt-4o-mini) do generowania mikro-zadań.

## Kluczowe Przepływy
1. Użytkownik tworzy nawyk -> AI generuje 3 poziomy trudności.
2. Użytkownik loguje postęp -> System sprawdza poziom i aktualizuje streak w `habit_logs`.
3. Brak energii -> Użytkownik jednym kliknięciem aktywuje "Emergency Mode".
