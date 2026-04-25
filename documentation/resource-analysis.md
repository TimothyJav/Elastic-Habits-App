# WF_Resource_Analysis: Elastic Habits

**Cel:** Audyt czasu, budżetu i technologii pod kątem realizacji MVP przez Solo-Deva.

---

## 1. Budżet Czasowy (Time Budget)
*Zakładamy: 10h tygodniowo (projekt poboczny).*

| Faza | Estymacja | Zadania |
| :--- | :--- | :--- |
| **Setup & Core** | 20h | Baza danych (nawyki), Auth, podstawowe UI (Emergency/Full). |
| **AI Integration** | 15h | Prompt engineering dla "AI Suggester", integracja z OpenAI API. |
| **Mobile/PWA UX** | 25h | System powiadomień, widgety, obsługa "streaks". |
| **Marketing Assets** | 15h | Landing page, grafiki do App Store/Social media. |
| **SUMA** | **75h** | **~7.5 tygodnia do wersji Alpha.** |

---

## 2. Technologia (Solo-Dev Optimized Stack)
*Kryterium: Szybkość wdrożenia i zerowe koszty stałe na starcie.*

- **Frontend:** **React Native + Expo** (Kluczowe: ADHD Alex potrzebuje powiadomień push i mobilności).
- **Backend/DB:** **Supabase** (PostgreSQL + Auth + Edge Functions). Darmowy tier wystarczy na pierwsze 500-1000 użytkowników.
- **AI:** **OpenAI API (GPT-3.5-turbo)**. Koszt marginalny ($1-5/miesiąc przy testach).
- **Analityka:** **PostHog** (darmowy limit do 1M zdarzeń).
- **Hosting Landingu:** **Vercel** lub **Framer** (darmowe).

---

## 3. Koszty Finansowe (Operational Costs)

| Element | Koszt (Start) | Koszt (Skala >100 userów) |
| :--- | :--- | :--- |
| **OpenAI API** | ~$1-5 / mo | Pay-as-you-go |
| **Apple/Google Dev** | $99 (raz na rok / raz na zawsze) | $99 |
| **Domena** | $10-15 / rok | $15 / rok |
| **Supabase** | $0 | $25 / mo (Pro tier) |
| **SUMA** | **~$120 (jednorazowo)** | **~$30-40 / mo** |

---

## 4. [RISKS] & Mitigations

- **[TECHNICAL RISK]:** System powiadomień w Expo.
  - *Mitigation:* Użycie Expo Notifications zamiast natywnego kodu na starcie.
- **[COST RISK]:** Użytkownicy nadużywający AI Suggester.
  - *Mitigation:* Limity dziennych zapytań AI (np. 3 sugestie na 24h) w planie darmowym.
- **[TIME RISK]:** Praca nad "ładnym UI" zamiast funkcjonalnym systemem Emergency Mode.
  - *Mitigation:* Zastosowanie gotowej biblioteki UI (np. Tamagui lub NativeWind) dla oszczędności czasu.

---

## 5. Kluczowe pytanie
> Czy masz już konto deweloperskie w Apple/Google, czy na start celujemy w Web App (PWA), żeby ominąć proces akceptacji i koszty $99?