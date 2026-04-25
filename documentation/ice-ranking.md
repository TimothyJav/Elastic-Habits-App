# WF_ICE_Ranking: Priorytetyzacja Elastic Habits

**Cel:** Wybór zadań o najwyższym przełożeniu na walidację biznesową, przy uwzględnieniu 75-godzinnego budżetu Solo-Deva.

## 1. Ranking Funkcji (Features)

| Funkcja | Impact (1-10) | Confidence (1-10) | Ease (1-10) | **ICE Score** |
| :--- | :---: | :---: | :---: | :---: |
| **Emergency Switch (UI)** | 10 | 9 | 8 | **9.0** |
| **No-Shame Streak Logic** | 8 | 9 | 9 | **8.7** |
| **Web Push Notifications** | 9 | 8 | 5 | **7.3** |
| **AI Habit Scaling (OpenAI)** | 7 | 8 | 6 | **7.0** |
| **PWA / Mobile Install** | 6 | 7 | 8 | **7.0** |
| **Dashboard Analityczny** | 3 | 10 | 9 | **7.3** |

### Analiza priorytetów technicznych:
1.  **Emergency Switch:** To Twój "Moment AHA". Musi działać idealnie od pierwszego dnia.
2.  **No-Shame Streak:** Najłatwiejsze do wdrożenia (logika DB), a kluczowe dla psychologii ADHD.
3.  **Push Notifications:** Wysoki Impact dla retencji, ale technicznie upierdliwe (Ease: 5) – to będzie Twój największy "zjadacz czasu".

---

## 2. Ranking Kanałów Dystrybucji (GTM)

| Kanał | Impact | Confidence | Ease | **ICE Score** |
| :--- | :---: | :---: | :---: | :---: |
| **TikTok / Reels (ADHD Content)** | 10 | 7 | 6 | **7.7** |
| **Reddit (r/ADHD, r/Productivity)** | 8 | 6 | 9 | **7.7** |
| **Build in Public (X / Twitter)** | 5 | 8 | 10 | **7.7** |
| **Paid Ads (TikTok)** | 9 | 5 | 4 | **6.0** |

---

## 3. Wnioski dla Solo-Deva

- **Co budować najpierw:** Skup się na "Mechanicznym Sercu" – prosty UI przełącznika i logika streaków. AI może na start generować plany wolniej lub z cache'a, dopóki nie dopieścisz interfejsu.
- **Gdzie szukać trakcji:** Reddit jest najłatwiejszy (Ease: 9), by zdobyć pierwszych 20 testerów bez wydawania złotówki. TikTok ma najwyższy Impact, ale wymaga regularności w tworzeniu wideo.

---

## 4. [RISKS] & Mitigations

- **[RISK]:** Spędzenie 20h na integracji powiadomień push, które nie zadziałają na każdym urządzeniu.
    - *Mitigation:* W Sprint 1 użyj zwykłych powiadomień e-mail/in-app, a PWA Web Push zostaw na koniec.
- **[RISK]:** AI generuje zbyt skomplikowane wersje "Emergency".
    - *Mitigation:* Przygotuj 20 "ręcznych" szablonów dla najpopularniejszych nawyków (medytacja, sport, nauka) i używaj ich jako fallbacku dla AI.

---
**Next Step:** Przejście do projektowania UI dla Emergency Switch lub setup bazy danych w Supabase.