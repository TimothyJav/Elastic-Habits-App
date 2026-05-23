# Tech Stack Decision

## Stack Architecture (2024)

### Frontend Layer
- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS + CSS Variables dla motywów
- **UI Pattern:** Server Components + Client Components ("use client")
- **Icons:** Lucide React

### Backend Layer  
- **Database:** Supabase PostgreSQL
- **Auth:** Supabase Auth (JWT-based)
- **Security:** Row Level Security (RLS) - polityki na poziomie tabel
- **Realtime:** WebSocket subscriptions dla live updates

### Infrastructure
- **Deployment:** Vercel (Edge Functions)
- **PWA:** manifest.json + next-pwa plugin
- **Domain:** Vercel subdomena (.vercel.app)

## Code Conventions

### TypeScript
- Strict mode enabled
- Zod dla walidacji danych
- Generated types z Supabase CLI

### Styling
- Mobile-first breakpointy
- Utility-first CSS (Tailwind)
- Brak customowych CSS-in-JS

### File Naming
- PascalCase: komponenty (`HabitList.tsx`)
- camelCase: hooks, utils (`useAuth.ts`, `streakUtils.ts`)
- SCREAMING_SNAKE: stałe (`EMERGENCY_TEMPLATES`)