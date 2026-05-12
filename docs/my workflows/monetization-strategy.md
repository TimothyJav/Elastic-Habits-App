# WF_Monetization_Strategy: Elastic Habits

## 1. Wybór Modelu Przychodu
Zgodnie z audytem ryzyka, największym zagrożeniem jest wysoki churn użytkowników z ADHD. Klasyczna subskrypcja może budzić opór.

### Rekomendowany model: **Hybrid ADHD-Friendly Model**
1.  **Freemium (Subscription):** Stabilny przychód od "Heavy Users".
2.  **Pay-per-Pack (One-off):** Możliwość kupienia gotowych, inteligentnych paczek nawyków (np. "Poranna rutyna dla programisty") na własność.
3.  **Impulsive Lifetime Deal:** Wysoka opłata jednorazowa dla użytkowników, którzy chcą poczuć, że "rozwiązali problem na zawsze" bez obciążeń miesięcznych.

---

## 2. Cennik i Pakiety

| Funkcja | **Free (Trial)** | **Plus (Monthly)** | **Lifetime (ADHD Hero)** |
| :--- | :--- | :--- | :--- |
| **Liczba nawyków** | Do 3 | Nielimitowane | Nielimitowane |
| **Emergency Mode** | Ręczny | Automatyczny (AI) | Automatyczny (AI) |
| **AI Suggester** | 1 generowanie/mo | Nielimitowane | Limit 500 (potem paczki) |
| **Powiadomienia** | Standard | Priorytetowe Web Push | Priorytetowe Web Push |
| **Cena** | **0 zł** | **~29 zł / mies.** | **~249 zł (raz)** |

---

## 3. Unit Economics (AI vs Revenue)

**Model:** `gpt-4o-mini` (używany do dekompozycji zadań).
*   **Koszt generowania 3 poziomów nawyku:** ok. $0.002.
*   **Koszt miesięczny per użytkownik (10 nowych nawyków):** $0.02.
*   **Marża brutto (SaaS):** Przy cenie 29 zł (~$7), marża na kosztach API wynosi >99%.
*   **CAC/LTV Ratio:** Kluczowe jest utrzymanie użytkownika przez min. 2 miesiące, aby pokryć koszty pozyskania (zakładany CAC z TikTok Ads: $10-15).

---

## 4. Psychologia ADHD w Płatnościach

*   **No-Shame Billing:** Jeśli użytkownik nie używa aplikacji przez 30 dni, wysyłamy powiadomienie: "Hej, widzę przerwę. Chcesz zapauzować subskrypcję, żeby nie płacić za nic?". Buduje to gigantyczne zaufanie i lojalność.
*   **Dopamine Boosters:** Płatność za plan Plus odblokowuje customowe animacje "sukresu" (eksplozje konfetti, dźwięki z gier RPG), które dają natychmiastową nagrodę za odhaczenie zadania.
*   **One-Click Emergency:** Uzasadnienie ceny Premium opieramy na "oszczędności energii decyzyjnej" – płacisz za to, że aplikacja myśli za Ciebie w gorsze dni.

---

## 5. [RISKS] & Mitigations

*   **[RISK]:** Model Lifetime może generować straty przy długoletnim używaniu AI.
    *   *Mitigation:* Wprowadzenie "Fair Usage Policy" na zapytania AI w planie Lifetime lub model tokenowy na dodatkowe sugestie.
*   **[RISK]:** Użytkownicy porzucają subskrypcję po "fazie fascynacji" (3-7 dni).
    *   *Mitigation:* Agresywny upsell na plan Roczny lub Lifetime w 3. dniu używania, gdy dopamina jest najwyższa.

---

## 6. Metryki Monetyzacji
1.  **ARPPU (Average Revenue Per Paying User):** Cel: >35 PLN.
2.  **Churn Rate:** Cel: <15% (bardzo ambitny dla ADHD).
3.  **LTV/CAC:** Cel: >3.

---

**Kluczowe pytanie:**
Czy planujesz zintegrować Stripe już w MVP, czy na start testujemy "skłonność do zapłaty" (Willingness-to-pay) za pomocą fake-door test (przycisk "Kup", który prowadzi do zapisu na listę)?