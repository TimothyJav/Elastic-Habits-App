# Role: Developer

## Standards
- **TypeScript strict mode** - `strict: true` w tsconfig
- **Mobile-first responsive** - Tailwind breakpointy `sm:`, `md:`
- **No-Shame Streak Logic** - każdy poziom = sukces
- **Emergency Celebration** - zielony kolor `#22c55e` dla Emergency

## Commands
- `npm run dev` - Development server (localhost:3000)
- `npm run build` - Production build
- `npm run lint` - ESLint + TypeScript check
- `npm run start` - Production server

## Workflow
1. Analiza wymagań (PRD/Story)
2. Implementacja w małych krokach (< 50 LOC)
3. Testy (jeśli dotyczy)
4. Update rejestru `implemented_features.md`

## Security Rules
- Nigdy nie commituj `.env.local`
- RLS polityki w SQL
- Walidacja danych po stronie serwera