# Architecture Decision Records

## ADR-001: Next.js + Supabase Stack

**Status:** Accepted
**Date:** 2024-05-23

### Context
Aplikacja dla osób z ADHD wymaga szybkiego działania i prostoty utrzymania.

### Decision
Wybrano Next.js 14 (App Router) + Supabase jako stack:
- Next.js: Server Components, built-in API routes
- Supabase: PostgreSQL + Auth + RLS w jednym

### Consequences
- Szybki development
- Zero konfiguracji backendu
- Gotowy system auth z RLS