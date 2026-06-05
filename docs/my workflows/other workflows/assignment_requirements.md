# Instrukcje Projektowe (Wymagania na Zaliczenie)

**Status:** Notatka / Reference
**Zadanie:** Publikacja aplikacji i wdrożenie metodologii SDD.

## 1. Zadania Główne
- Opublikuj aplikację np. na Vercel lub Github Pages.
- Dołącz kod źródłowy wraz z dokumentacją w `README.md`, wraz z linkiem do opublikowanej strony.

## 2. 📘 Spec Driven Development – instrukcja pracy projektowej
### Założenia metody
Spec Driven Development (SDD) to podejście, w którym:
- Specyfikacja (plan) poprzedza implementację.
- Każda funkcjonalność ma jawny, wersjonowany opis.
- Implementacja jest deterministycznie generowana lub wspierana przez AI.
- Repozytorium stanowi źródło prawdy (single source of truth).

### Struktura repozytorium (Wymagana)
```text
/docs
  /architecture
  /business
  /tech
  /plans
  /roles
    /product_owner
    /ux_ui
    /architect
    /developer
    /tester
implemented_features.md
implemented_plans.md
README.md
```

## 3. Dokumentacja – katalog /docs
### 3.1 Architektura (/docs/architecture)
Zawiera opis systemu, diagramy (C4, UML) i ADR (Architecture Decision Records).

### 3.2 Wymagania biznesowe (/docs/business)
Zawiera cele produktu, user stories, przypadki użycia i ograniczenia.

### 3.3 Stos technologiczny (/docs/tech)
Zawiera stack, uzasadnienie wyborów i konwencje.

### 3.4 Plany (/docs/plans)
Najważniejszy katalog. Każdy plik `PLAN_<nazwa>.md` = jedna mała funkcjonalność.

## 4. Struktura planu (obowiązkowa)
1. **Cel** – opis biznesowy.
2. **Zakres** – co wchodzi / nie wchodzi.
3. **Wymagania funkcjonalne**.
4. **Wymagania niefunkcjonalne** (UX, bezpieczeństwo).
5. **Kontekst techniczny** (API, dane).
6. **Kroki implementacji**.
7. **Kryteria akceptacji**.
8. **Testy**.

## 5. Rejestry projektu
- `implemented_plans.md`: Lista kontrolna planów [x].
- `implemented_features.md`: Opis statusu funkcjonalności (np. DONE).

## 6. Workflow pracy z AI
### 6.1 Workflow: plan
- Wejście: Opis funkcjonalności.
- Wyjście: Plik `/docs/plans/PLAN_*.md`.

### 6.2 Workflow: implement
- Wejście: Plik planu.
- Wyjście: Kod + testy + aktualizacja dokumentacji (rejestrów).

## 7. Role projektowe
- **Product Owner**: Wizja, backlog, priorytety.
- **UX/UI**: Makiety, zasady UX.
- **Architect**: Decyzje techniczne, modele.
- **Developer**: Standardy kodu, workflow.
- **Tester**: Scenariusze testowe, edge-case.

## 8. Proces pracy
1. Zdefiniuj wymaganie (PO).
2. Stwórz plan.
3. Zatwierdź plan.
4. Uruchom implementację.
5. Dodaj testy.
6. Zaktualizuj dokumentację.
7. Commit + PR.

## 9. Zasady krytyczne
- **Nie implementujemy bez planu.**
- Plan = kontrakt.
- Jedna funkcjonalność = jeden plan.
- Repozytorium musi być samodokumentujące się.
- AI nie zastępuje myślenia – tylko egzekwuje plan.

## 10. Kryteria zaliczenia
- Jakość dokumentacji.
- Spójność planów i implementacji.
- Poprawność workflow AI.
- Granularność funkcjonalności.
- Kompletność repozytorium.

## 11. Najczęstsze błędy
- Zbyt duże plany.
- Brak kryteriów akceptacji.
- Implementacja „na skróty”.
- Brak aktualizacji dokumentacji.
