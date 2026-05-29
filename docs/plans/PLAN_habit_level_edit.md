# PLAN_habit_level_edit

## Cel
Pozwolić użytkownikowi na ręczną edycję wygenerowanych przez AI poziomów nawyku (full, adjusted, emergency) przed zapisaniem.

## Zakres
- Edycja pól tekstowych dla każdego poziomu
- Nie wchodzi: edycja istniejących nawyków w dashboard

## Wymagania funkcjonalne
1. **Inline editing** - pola tekstowe dla każdego poziomu po wygenerowaniu przez AI
2. **Zachowanie UX** - przyciski zachowują dotychczasowy wygląd i układ

## Wymagania niefunkcjonalne
- Mobile-first
- ADHD-friendly - minimalna liczba kliknięć

## Kontekst techniczny
- React state w `AddHabitForm.tsx`
- Obecny stan `levels` trzymany w useState

## Kroki implementacji
1. Dodaj `editingMode` state zamiast `setLevels(null)` na przycisku "Edytuj"
2. Pokazuj pola tekstowe zamiast <p> dla każdego poziomu
3. Zachowaj przycisk "Zatwierdź i zacznij"

## Kryteria akceptacji
- [ ] Użytkownik może modyfikować tekst każdego poziomu
- [ ] Interfejs pozostaje czytelny na mobile
- [ ] Build przechodzi bez błędów

## Testy
- Ręczne: zmiana treści poziomów i zapis