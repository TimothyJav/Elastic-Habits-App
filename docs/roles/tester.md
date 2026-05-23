# Role: Tester

## Test Strategy
- **Unit Tests** - Kluczowe funkcje (streak logic, AI suggestions)
- **Integration Tests** - API + DB
- **E2E Tests** - Flow: login → emergency switch → streak

## ADHD-Specific Scenarios
1. Emergency completion = streak +1
2. Brak przycisku reset streak
3. Offline mode działa
4. Szybki loading < 1s

## Tools
- Jest dla unit testów
- Playwright dla E2E
- GitHub Actions dla CI/CD