# Wytyczne UI - Elastic Habits

## Zasady Podstawowe
- **Nowoczesny, profesjonalny, standardy topowych aplikacji** - Clean, minimalistyczny, mobile-first design
- **Przyjazny ADHD** - Wysoki kontrast, duże obszary dotykowe, natychmiastowa informacja zwrotna
- **UX bez wstydu** - Celebruj wszystkie akcje, nigdy nie karanie ani oskarżenie

## Styl Wizualny

### Paleta Kolorów
```css
/* Tła */
--bg-primary: #0a0f1a;        /* slate-950 */
--bg-secondary: #1e293b;      /* slate-900 */
--bg-card: #0f172a;           /* slate-900/60 */

/* Akcenty */
--primary-500: #22c55e;       /* Zielony sukcesu */
--primary-600: #16a34a;
--secondary-500: #3b82f6;     /* Niebieski */
--emergency-500: #f59e0b;     /* Złoto celebracji */

/* Tekst */
--text-primary: #f8fafc;      /* slate-100 */
--text-secondary: #cbd5e1;    /* slate-300 */
--text-tertiary: #94a3b8;     /* slate-400 */
```

### Typografia
- **Font**: System stack (`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto`)
- **Hierarchia**: 
  - Tytuły stron: `text-2xl font-bold`
  - Nagłówki sekcji: `text-lg font-bold`
  - Treść: `text-base`
  - Etykiety: `text-sm font-medium`

### System Odstępów
- Kontener: `max-w-4xl mx-auto p-4`
- Padding kart: `p-6`
- Przyciski: `px-4 py-2` (md), `px-6 py-3` (lg)
- Przerwy: `gap-4` dla flex, `space-y-4` dla pionowych stosów

## Standardy Komponentów

### Przyciski
```tsx
// Primary - akcje, główne CTA
className="bg-primary-600 text-white hover:bg-primary-700 rounded-xl"

// Secondary - alternatywne akcje
className="bg-secondary-600 text-white hover:bg-secondary-700 rounded-xl"

// Outline - akcje pomocnicze
className="border border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 rounded-xl"

// Emergency - tryb celebracji (ZIELONY!)
className="bg-emergency-600 text-white hover:bg-emergency-700 rounded-xl"
```

### Karty
```tsx
className="w-full bg-slate-900/60 rounded-2xl shadow-2xl border border-slate-800"
```

### Pola Wprowadzania
```tsx
className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
```

## Wzorce Layoutu

### Struktura Strony
```tsx
<div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
  <div className="max-w-4xl mx-auto p-4 pb-20">
    {/* Treść */}
  </div>
  {/* Stała nawigacja dolna */}
</div>
```

### Przełącznik Emergency (3-poziomowy)
- Fioletowy: Pełny cel
- Niebieski: Cel dostosowany
- Zielony: Tryb awaryjny (kolory celebracji)
- Stan wybrany: `ring-2 ring-white/30 scale-105`
- Confetti przy wyborze (25-100 cząstek w zależności od poziomu)

### Nawigacja
- Stała belka dolna z efektem blur
- 2 główne zakładki: Start (🏠) / Tablica (📊)
- Stan aktywny: `text-primary-400`

## Wzorce Interakcji
- **Feedback przy dotknięciu**: `active:scale-95` lub `active:scale-[0.98]`
- **Hover**: `hover:scale-105` (motion-safe)
- **Przejścia**: `transition-all duration-200`
- **Haptic**: Włączone na urządzeniach mobilnych

## Nie Używać
- Białe tła (`#ffffff`) - psuje ciemny motyw
- Domyślnych styli przeglądarki - zawsze używać klas Tailwind
- Małych obszarów dotykowych (< 44px)
- Komunikatów o "porażkach" ("You failed", "Missed streak")
- Skomplikowanych formularzy - minimalizuj pola