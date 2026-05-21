# PLAN_initial_setup

## Cel
Skonfigurowanie projektu Next.js 14 z TailwindCSS i podstawowym połączeniem Supabase.

## Zakres
- Inicjalizacja `create-next-app`
- Setup TailwindCSS
- Konfiguracja Supabase client
- Nie wchodzi: deployment, testy

## Wymagania funkcjonalne
1. **Project Structure:** App Router, foldery `app/`, `lib/`
2. **Tailwind:** Konfiguracja z `tailwind.config.ts`
3. **Supabase Client:** `lib/supabase.ts` z typami

## Wymagania niefunkcjonalne
- TypeScript strict mode
- Mobile-first setup
- Environment variables w `.env.local.example`

## Kontekst techniczny
- Next.js 14.2+
- TailwindCSS 3.x
- Supabase JS client v2

## Kroki implementacji
1. `npx create-next-app@latest` z TypeScript
2. `npm install -D tailwindcss postcss autoprefixer`
3. `npx tailwindcss init -p`
4. Skonfigurować `supabase.ts`
5. Dodanie zmiennych `.env.local`

## Kryteria akceptacji
- [ ] `npm run dev` uruchamia aplikację
- [ ] Tailwind styles działają
- [ ] Supabase client działa z auth

## Testy
- Test: aplikacja uruchamia się na localhost:3000