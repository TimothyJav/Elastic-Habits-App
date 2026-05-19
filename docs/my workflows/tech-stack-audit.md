# WF_Tech_Stack_Audit: Elastic Habits

## 1. Architektura Systemu
Dla zapewnienia szybkości developmentu przez jedną osobę, stosujemy stack **Next.js + Supabase**.

### Kluczowe komponenty:
1.  **Frontend & Backend:** Next.js 14 (App Router) – ujednolicony stack dla UI i logiki serwerowej (Server Actions).
2.  **Database & Auth:** Supabase (PostgreSQL + Realtime). Idealne dopasowanie do Next.js.
3.  **AI Scaling Engine:** OpenAI API (model `gpt-4o-mini`) – tani i szybki w dekompozycji zadań.
4.  **Styling:** TailwindCSS – dla szybkiego budowania responsywnego interfejsu "mobile-first".
5.  **PWA:** Next-PWA dla wsparcia instalacji na telefonie i Web Push.

---

## 2. Implementacja Adaptive Scaling (Logika Techniczna)

### Jak technicznie zrealizować skalowanie zadań?
Rekomenduję podejście **Pre-generation + JIT (Just-In-Time) Adjustment**:

1.  **Faza Tworzenia Nawyku:** Gdy użytkownik wpisuje "Chcę biegać 30 minut", Server Action wysyła prompt do OpenAI:
    *   *Input:* "Habit: Running 30 min. Generate 3 levels: Full, Adjusted, Emergency."
    *   *Output:* JSON zapisywany bezpośrednio w Supabase.
2.  **Trigger "Brak Reakcji":**
    *   Wykorzystanie **Web Push API** do wysyłania powiadomień na przeglądarkę/telefon.
    *   UI w czasie rzeczywistym (Supabase Realtime) zmienia widok zadania na wersję "Emergency", gdy wykryje brak aktywności.

---

## 3. Wybór Technologii (Tech Stack)

| Warstwa | Technologia | Uzasadnienie Solo-Dev |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14** | SSR/SSG i Server Actions – brak konieczności budowania osobnego API. |
| **Styling** | **TailwindCSS** | Błyskawiczne stylowanie bez pisania CSS. Gotowe komponenty UI. |
| **Database** | **Supabase** | Managed Postgres, Auth i świetny SDK dla Reacta. |
| **AI** | **OpenAI SDK** | Najlepsza dokumentacja. Model mini jest niemal darmowy przy małej skali. |
| **Hosting** | **Vercel** | Natywne wsparcie dla Next.js, CI/CD w pakiecie. |

---

## 4. Wyzwania Techniczne & Mitigacja

*   **Retencja na Webie:** Trudniej o uwagę użytkownika niż w aplikacji mobilnej.
    *   *Rozwiązanie:* Instalacja jako PWA (Progressive Web App) + Web Push Notifications.
*   **Koszt LLM:** Generowanie planów przy każdym nawyku może generować koszty.
    *   *Rozwiązanie:* Cache'owanie popularnych nawyków (np. "Medytacja", "Sprzątanie") w globalnej bazie, aby nie pytać AI o to samo dwa razy.
*   **Latencja AI:** Czekanie na odpowiedź LLM psuje UX.
    *   *Rozwiązanie:* Generowanie poziomów trudności w tle, zaraz po dodaniu nawyku, zanim użytkownik go pierwszy raz uruchomi.

---

## 5. MVP Roadmap (Techniczna)
1.  **Sprint 1:** Setup Next.js 14 + Supabase Auth.
2.  **Sprint 2:** Implementacja OpenAI Server Action do generowania elastycznych poziomów zadań.
3.  **Sprint 3:** Budowa dashboardu w TailwindCSS z obsługą trybu "Emergency".
4.  **Sprint 4:** Konfiguracja PWA i Web Push dla powiadomień przypominających.