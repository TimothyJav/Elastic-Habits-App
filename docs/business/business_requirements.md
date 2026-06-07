# Wymagania Biznesowe - Elastic Habits

## Cel produktu
Elastic Habits pomaga osobom z ADHD budować nawyki bez mechanizmów kary, wstydu i sztywnego podejścia do streaków. Produkt wspiera użytkownika w gorsze dni przez poziom Emergency, który traktuje minimalne wykonanie jako realny sukces.

## Cele biznesowe
- Zmniejszyć tarcie przy dodawaniu i wykonywaniu nawyków.
- Zwiększyć powroty użytkowników dzięki no-shame streak logic.
- Pokazać wartość aplikacji w pierwszej sesji bez długiej konfiguracji.
- Udowodnić, że Emergency Mode może wspierać ciągłość zamiast ją karać.

## Grupy użytkowników
- Osoby z ADHD, które mają problem z paraliżem decyzyjnym.
- Osoby z nieregularną energią, które potrzebują elastycznych celów.
- Użytkownicy, którzy porzucali klasyczne habit trackery przez reset streaków.

## Przypadki użycia
### UC-001: Dodanie nawyku
Użytkownik dodaje nawyk i otrzymuje trzy poziomy wykonania: Full, Adjusted i Emergency.

### UC-002: Wykonanie nawyku na poziomie Emergency
Użytkownik wybiera minimalny poziom wykonania w gorszy dzień. System zapisuje wykonanie jako sukces i utrzymuje streak.

### UC-003: Śledzenie postępu
Użytkownik widzi historię wykonania, streak i podsumowanie tygodnia bez komunikatów oceniających.

### UC-004: Sugestia AI z fallbackiem
System może zaproponować poziomy wykonania przy pomocy AI. Jeśli AI nie działa, aplikacja korzysta z lokalnych szablonów.

## Ograniczenia
- Aplikacja nie może zawierać mechanizmu karzącego za pominięcie dnia.
- Dane użytkownika muszą być chronione przez Supabase RLS.
- Funkcje AI nie mogą blokować podstawowego przepływu dodawania nawyku.
- Interfejs musi być mobile-first i szybki w użyciu.
- Konfiguracja początkowa musi być ograniczona do minimum.

## Kryteria sukcesu
- Użytkownik może dodać i wykonać nawyk bez długiej konfiguracji.
- Emergency jest wizualnie i logicznie traktowane jako sukces.
- Brak nieusuwalnych resetów streaków.
- README zawiera link do działającej wersji produkcyjnej.

## Powiązane dokumenty
- [User stories](user_stories.md)
- [Plany funkcjonalności](../plans)
- [C4 Context](../architecture/c4_context.md)
