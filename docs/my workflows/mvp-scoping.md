# WF_MVP_Scoping: Elastic Habits

**Cel MVP:** Budowa funkcjonalnej aplikacji webowej (PWA), która pozwala użytkownikowi utrzymać ciągłość nawyków w dni o niskiej energii poprzez mechanizm "skalowania w dół".

## 1. Kluczowe Funkcje (Essential)

### A. Inteligentne Tworzenie Nawyku
- Formularz dodawania nawyku (np. "Bieganie 30 min").
- Integracja z **OpenAI (GPT-4o-mini)**: AI automatycznie generuje 3 poziomy:
    - **Full:** Cel pierwotny.
    - **Adjusted:** Wersja pośrednia.
    - **Emergency:** Absolutne minimum.

### B. Elastyczny Dashboard Dnia
- Widok dzisiejszych zadań.
- **Emergency Switch:** Jeden przycisk przy każdym zadaniu, który natychmiast zmienia widok na wersję minimalną.

### C. System "No-Shame Streaks"
- Licznik serii (streak) zaliczający dzień przy dowolnej wersji zadania.

### D. Autentykacja
- Logowanie przez **Supabase Auth**.

---

## 2. Co NIE jest w MVP (Out of Scope)
- Zaawansowane wykresy i analityka.
- Funkcje społecznościowe.
- Natywna aplikacja mobilna (zastąpiona przez PWA).

---

## 3. Harmonogram Realizacji (4 Tygodnie)

| Tydzień | Zadania |
| :--- | :--- |
| **Tydzień 1** | Konfiguracja Next.js 14, Supabase i Tailwind UI. |
| **Tydzień 2** | Integracja Server Actions z OpenAI. |
| **Tydzień 3** | Budowa dashboardu i logiki streaków. |
| **Tydzień 4** | Konfiguracja PWA i testy UX. |

---

## 4. Metryki Sukcesu MVP
- **Activation:** % stworzonych elastycznych nawyków.
- **Retention:** % użycia trybu "Emergency" zamiast rezygnacji.
- **Stickiness:** Długość utrzymanych serii.