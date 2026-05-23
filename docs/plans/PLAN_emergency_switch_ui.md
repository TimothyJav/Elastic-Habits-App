# PLAN_emergency_switch_ui

## Cel
Stworzenie mikro-interfejsu pozwalającego użytkownikowi na natychmiastową zmianę poziomu trudności nawyku (Full → Adjusted → Emergency).

## Zakres
- Komponent z 3 przyciskami poziomu
- Etykiety i kolory dla każdego poziomu
- Nie wchodzi: logika zapisu do DB (oddzielna warstwa)

## Wymagania funkcjonalne
1. Trzy stany: `full` (zielony), `adjusted` (żółty), `emergency` (pomarańczowy)
2. Callback `onLevelChange(level)` przy zmianie
3. Wyświetlanie aktualnego poziomu

## Wymagania niefunkcjonalne
- Mobile-first (duże przyciski 44px min)
- Zero stanu "pusta" - zawsze widoczny aktualny poziom
- Celebracja Emergency jako sukces (zielony nie czerwony)

## Kontekst techniczny
- Komponent `EmergencySwitch.tsx` w katalogu głównym
- Props: `currentLevel`, `goals`, `onLevelChange`
- Styled z TailwindCSS

## Kroki implementacji
1. Utworzyć komponent z trzema przyciskami
2. Dodać style z zmiennymi kolorów
3. Zaimplementować logikę zmiany stanu
4. Przetestować z różnymi goalami

## Kryteria akceptacji
- [ ] Emergency wyświetla się pomarańczowo zielonym kolorem
- [ ] Kliknięcie zmienia poziom i wywołuje callback
- [ ] Komponent responsywny na mobile

## Testy
- Test renderowania z każdym poziomem
- Test zmiany poziomu