# Opis Projektu: Elastic Habits

## Problem
Osoby z ADHD często wpadają w pułapkę "wszystko albo nic". Tradycyjne aplikacje do nawyków narzucają sztywne cele, które w gorsze dni (low dopamine/executive dysfunction days) są nieosiągalne, co prowadzi do porzucenia systemu i poczucia porażki.

## Rozwiązanie (SaaS)
Aplikacja, która nie tylko śledzi nawyki, ale **dynamicznie dostosowuje ich poziom trudności**.

### Kluczowa Funkcja: Adaptive Scaling (Elastyczne Zadania)
Użytkownik przy każdym zadaniu ma 3 poziomy trudności:
1. **Full Version:** "Posprzątaj cały dom" (30 min).
2. **Adjusted:** "Posprzątaj kuchnię" (10 min).
3. **Emergency/Low Energy:** "Podnieś 3 rzeczy z podłogi" (1 min).

Aplikacja rano lub w momencie prokrastynacji pyta: "Jak stoisz z energią?". Na podstawie odpowiedzi (lub braku aktywności) sugeruje przejście na niższy poziom, aby **utrzymać nawyk bez przeciążania układu nerwowego**.

## Target Audience
- Studenci z problemami z organizacją.
- Osoby z diagnozą ADHD (lub podejrzeniem).
- Ludzie pracujący kreatywnie, cierpiący na wypalenie.

## Model Biznesowy
- **Freemium:** Podstawowe śledzenie za darmo.
- **Premium:** Inteligentne podpowiedzi AI, personalizowane plany "Emergency", integracja z kalendarzem.
- **Pay-per-habit (Eksperymentalnie):** Jednorazowy zakup "scenariusza" dla konkretnego trudnego nawyku (np. "Poranna rutyna dla opornych") za ok. 20 zł.

## Technologie
- **Frontend:** Next.js 14 (App Router), React, TailwindCSS.
- **Backend:** Supabase + Next.js Server Actions.
- **AI:** Integracja z LLM (np. OpenAI) do zamiany dużych celów na mikro-zadania.
