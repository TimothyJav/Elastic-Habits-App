# Tester

## Odpowiedzialność
- Strategia testów i scenariusze akceptacyjne.
- Weryfikacja logiki no-shame oraz Emergency Mode.
- Pilnowanie scenariuszy edge-case dla użytkowników ADHD.

## Strategia testów
- **Unit tests** - kluczowe funkcje, np. streak logic i sugestie AI.
- **Integration tests** - API i baza danych.
- **E2E tests** - przepływy użytkownika, np. login, Emergency Switch i streak.

## Scenariusze ADHD-Specific
1. Ukończenie Emergency zwiększa streak.
2. Brak przycisku resetującego streak jako kara.
3. Tryb offline działa dla podstawowych akcji.
4. Kluczowe widoki ładują się szybko.

## Narzędzia
- Jest dla testów jednostkowych.
- Playwright dla testów E2E.
- GitHub Actions dla CI/CD.

## Artefakty
- [Strategia testów](test_strategy.md)
- [Scenariusze ADHD](test_scenarios_adhd.md)
- [Scenariusze E2E](test_scenarios_e2e.md)
- [Scenariusze integracyjne](test_scenarios_integration.md)
- [Scenariusze jednostkowe](test_scenarios_unit.md)
