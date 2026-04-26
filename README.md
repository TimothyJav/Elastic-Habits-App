# Elastic Habits (ADHD-Friendly)

Elastic Habits to aplikacja SaaS zaprojektowana z myślą o osobach z ADHD, która pomaga budować nawyki poprzez adaptacyjne skalowanie trudności zadań.

## 🚀 O Projekcie
Głównym celem aplikacji jest walka z paraliżem decyzyjnym (executive dysfunction) dzięki funkcji **Emergency Mode**, która pozwala na wykonanie absolutnego minimum w gorsze dni, zachowując przy tym ciągłość nawyku (streak).

## 🛠 Tech Stack
- **Frontend/Backend:** Next.js 14 (App Router)
- **Baza danych & Auth:** Supabase
- **AI:** OpenAI SDK (GPT-4o-mini)
- **Stylizacja:** TailwindCSS

## ⚙️ Jak uruchomić aplikację
1. Sklonuj repozytorium na swój komputer.
2. Zainstaluj wszystkie zależności:
   ```bash
   npm install
   ```
3. Skonfiguruj bazę danych:
   - Skopiuj zawartość pliku `20240523_create_habits_schema.sql` i wklej ją do **SQL Editora** w panelu Supabase, a następnie uruchom (Run).
4. Skonfiguruj zmienne środowiskowe w pliku `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` (URL Twojego projektu Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Klucz anonimowy Supabase)
   - `SUPABASE_SERVICE_ROLE_KEY` (Klucz Service Role dla operacji serwerowych)
   - `OPENAI_API_KEY` (Klucz do obsługi GPT-4o-mini)
5. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```

## 📂 Dokumentacja
Pełna dokumentacja projektu, analizy rynkowe oraz plany wdrożenia znajdują się w folderze `/documentation`.

Zapraszamy do zapoznania się z README dokumentacji.

## 🗺️ Plan Szybkiego Wdrożenia (Express MVP)
*Cel: Uruchomienie działającej aplikacji w 3 dni w celu walidacji "Momentu AHA".*

### 1. Fundamenty (Dzień 1)
 - [x] Analiza ryzyk i priorytetyzacja (ICE Ranking) – **zakończone**
 - [x] Inicjalizacja projektu Next.js 14 + TailwindCSS – **zakończone**
 - [x] Konfiguracja Supabase (Auth + Baza Danych) – **zakończone**

### 2. Mechaniczne Serce (Dzień 2)
 - [x] UI "Emergency Switch" (Główny przycisk zmiany poziomu nawyku) – **zakończone**
 - [x] Logika "No-Shame Streak" (DB: zapisywanie postępu bez kary za mały wysiłek) – **zakończone**
 - [x] Implementacja 20 gotowych szablonów "Emergency" (zamiast AI na start) – **zakończone**

### 3. Launch & Walidacja (Dzień 3)
 - [x] Deploy na Vercel (wersja PWA – dostęp przez przeglądarkę) – **zakończone**
 - [x] Pierwszy test na "żywym organizmie" (Gotowy mechanizm logowania i streaków) – **zakończone**