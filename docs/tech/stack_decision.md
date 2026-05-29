# Decyzja Stosu Technologicznego

## Architektura Stosu (2024)

### Warstwa Frontend
- **Framework:** Next.js 14 (App Router)
- **Stylizacja:** TailwindCSS + CSS Variables dla motywów
- **Wzorzec UI:** Server Components + Client Components ("use client")
- **Ikony:** Lucide React

### Warstwa Backend  
- **Baza danych:** Supabase PostgreSQL
- **Autoryzacja:** Supabase Auth (JWT-based)
- **Bezpieczeństwo:** Row Level Security (RLS) - polityki na poziomie tabel
- **Realtime:** WebSocket subscriptions dla live aktualizacji

### Infrastruktura
- **Deployment:** Vercel (Edge Functions)
- **PWA:** manifest.json + next-pwa plugin
- **Domena:** Subdomena Vercel (.vercel.app)

## Konwencje Kodu

### TypeScript
- Tryb strict włączony
- Zod do walidacji danych
- Wygenerowane typy z Supabase CLI

### Stylizacja
- Mobile-first breakpointy
- Utility-first CSS (Tailwind)
- Brak CSS-in-JS

### Nazewnictwo Plików
- PascalCase: komponenty (`HabitList.tsx`)
- camelCase: hooks, utils (`useAuth.ts`, `streakUtils.ts`)
- SCREAMING_SNAKE: stałe (`EMERGENCY_TEMPLATES`)