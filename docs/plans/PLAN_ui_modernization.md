# PLAN_ui_modernization

## Cel
Nowoczesny, przyjazny interfejs ADHD z minimalnym tarterem i maksymalną celebracją postępów.

## Zakres
- System designu (kolory, typografia, spacing)
- Komponenty przycisków z micro-interakcjami
- Mobile-first navigation
- Loading states i empty states
- Nie wchodzi: zmiana architektury, nowe funkcje

## Wymagania funkcjonalne
1. **Design System:** Spójna paleta ADHD-friendly (niskie nasycenie, wysoki kontrast)
2. **Komponenty:** Przyciski z haptic feedback i animacjami skalowania
3. **Nawigacja:** Bottom nav dla mobile, glass morphism effect
4. **Stany:** Skeleton loaders, przyjazne empty states z CTA
5. **Dark Mode:** Domyślny, z zachowaniem dla oczu

## Wymagania niefunkcjonalne
- Mobile-first (dotykowe targets ≥44px)
- Animacje 60fps, prefer-reduced-motion
- Accessibility (ARIA, focus states)
- Ładowanie komponentów lazy

## Kontekst techniczny
- TailwindCSS (rozszerzenia w config)
- CSS variables dla motywów
- motion-safe: transition classes

## Kroki implementacji
1. Dodać rozszerzenia Tailwind (colors, fontFamily, animation)
2. Utworzyć `components/ui/` z Button, Card, LoadingSpinner
3. Zastąpić istniejące komponenty nowymi
4. Dodać `app/loading.tsx` i `app/not-found.tsx`
5. Zaimplementować bottom nav w `layout.tsx`

## Kryteria akceptacji
- [ ] Wszystkie przyciski >44px na mobile
- [ ] Dark mode działa bez problemów
- [ ] Animacje wyłączają się z `prefers-reduced-motion`
- [ ] Lighthouse performance >90

## Testy
- Test: snapshot komponentów UI
- Test: accessibility check (axe)