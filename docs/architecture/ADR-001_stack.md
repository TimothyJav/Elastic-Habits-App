# Architecture Decision Records

## ADR-001: Next.js + Supabase Stack

**Status:** Accepted
**Date:** 2024-05-23
**Author:** Elastic Habits Architect

### Context
Aplikacja dla osób z ADHD wymaga:
- Szybkiego działania (redukcja tarcia)
- Prostej utrzymywalności
- Bezpieczeństwa danych
- Responsywnej mobilnej wersji

### Decision
Wybrano Next.js 14 (App Router) + Supabase jako stack:

**Frontend: Next.js 14**
- Server Components dla wydajności
- Built-in API routes dla prostoty
- App Router dla lepszej organizacji kodu

**Backend: Supabase**
- PostgreSQL z Row Level Security
- Gotowy system autoryzacji
- Realtime subscriptions

### Consequences
Pozytywne:
- Szybki development dzięki integracji
- Zero konfiguracji backendu
- Gotowy system auth z RLS
- Automatyczne generowanie typów

Negatywne:
- Vendor lock-in z Supabase
- Ograniczenia przy skalowaniu

### Alternatives Considered
- **Node.js + Express + PostgreSQL**: Więcej kodu, więcej błędów
- **Firebase**: Droższy przy dużym traffic
- **Rails**: Nie mobile-first