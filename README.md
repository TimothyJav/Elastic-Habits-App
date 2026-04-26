# Elastic Habits (ADHD-Friendly)

Elastic Habits to aplikacja SaaS zaprojektowana z myślą o osobach z ADHD, która pomaga budować nawyki poprzez adaptacyjne skalowanie trudności zadań.

## 🚀 O Projekcie
Głównym celem aplikacji jest walka z paraliżem decyzyjnym (executive dysfunction) dzięki funkcji **Emergency Mode**, która pozwala na wykonanie absolutnego minimum w gorsze dni, zachowując przy tym ciągłość nawyku (streak).

## 🛠 Tech Stack
- **Frontend/Backend:** Next.js 14 (App Router)
- **Baza danych & Auth:** Supabase
- **AI:** OpenAI SDK (GPT-4o-mini)
- **Stylizacja:** TailwindCSS

## 📂 Dokumentacja
Pełna dokumentacja projektu, analizy rynkowe oraz plany wdrożenia znajdują się w folderze `/documentation`.

Zapraszamy do zapoznania się z README dokumentacji.

## 🗺️ Plan Szybkiego Wdrożenia (Express MVP)
*Cel: Uruchomienie działającej aplikacji w 3 dni w celu walidacji "Momentu AHA".*

### 1. Fundamenty (Dzień 1)
 - [x] Analiza ryzyk i priorytetyzacja (ICE Ranking) – **jest zrobione**
 - [x] Inicjalizacja projektu Next.js 14 + TailwindCSS – **jest zrobione**
 - [x] Konfiguracja Supabase (Auth + Baza Danych) – **zrealizowane (Schema SQL + Client setup)**

### 2. Mechaniczne Serce (Dzień 2)
 - [/] UI "Emergency Switch" (Główny przycisk zmiany poziomu nawyku) – **w trakcie (Komponent bazowy)**
 - [ ] Logika "No-Shame Streak" (DB: zapisywanie postępu bez kary za mały wysiłek) – **jest do zrobienia**
 - [ ] Implementacja 20 gotowych szablonów "Emergency" (zamiast AI na start) – **jest do zrobienia**

### 3. Launch & Walidacja (Dzień 3)
 - [ ] Deploy na Vercel (wersja PWA – dostęp przez przeglądarkę) – **jest do zrobienia**
 - [ ] Pierwszy test na "żywym organizmie" (20 testerów z Reddita/X) – **jest do zrobienia**