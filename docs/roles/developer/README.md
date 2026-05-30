# Developer

## Odpowiedzialność
- Implementacja funkcji zgodnie z planami SDD.
- Utrzymanie jakości kodu i zgodności ze stackiem.
- Aktualizacja rejestrów po wdrożeniu funkcjonalności.

## Standardy
- **TypeScript strict mode** - `strict: true` w `tsconfig`.
- **Mobile-first responsive** - Tailwind breakpointy `sm:` i `md:`.
- **No-Shame Streak Logic** - każdy poziom wykonania jest sukcesem.
- **Emergency Celebration** - poziom Emergency ma pozytywny feedback.

## Komendy
- `npm run dev` - serwer developerski.
- `npm run build` - build produkcyjny.
- `npm run lint` - linting i kontrola TypeScript.
- `npm run start` - serwer produkcyjny.

## Workflow
1. Analiza planu lub wymagania.
2. Implementacja w małych krokach.
3. Testy, jeśli dotyczą zmiany.
4. Aktualizacja `implemented_features.md` i `implemented_plans.md`.

## Zasady bezpieczeństwa
- Nie commitować `.env.local`.
- Stosować RLS w Supabase.
- Walidować dane po stronie serwera.

## Powiązane dokumenty
- [Plany funkcjonalności](../../plans)
- [Zaimplementowane funkcje](../../../implemented_features.md)
- [Zaimplementowane plany](../../../implemented_plans.md)
