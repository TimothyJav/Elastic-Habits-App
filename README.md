# Elastic Habits (ADHD-Friendly) 🧠

Elastic Habits to aplikacja SaaS zaprojektowana z myślą o osobach z ADHD, która pomaga budować nawyki poprzez adaptacyjne skalowanie trudności zadań. Repozytorium jest zarządzane zgodnie z metodologią **Spec Driven Development (SDD)**.

## 📂 Dokumentacja Projektowa (Single Source of Truth)
Kompletna dokumentacja projektu znajduje się w folderze `/docs`.

## 🚀 O Projekcie
Głównym celem aplikacji jest walka z paraliżem decyzyjnym (executive dysfunction) dzięki funkcji **Emergency Mode**, która pozwala na wykonanie absolutnego minimum w gorsze dni, zachowując przy tym ciągłość nawyku (streak).

## Struktura katalogów
- `/architecture`: Decyzje architektoniczne (ADR) i schematy systemu.
- `/business`: Cele biznesowe, User Stories i analiza rynku.
- `/tech`: Stack technologiczny i konwencje kodowania.
- `/plans`: Pliki specyfikacji funkcjonalnych (PLAN_*.md).
- `/roles`: Wytyczne i kontekst dla poszczególnych ról (PO, UX, Architect, Dev, Tester).

## 📊 Rejestry SDD
- Implemented Plans
- Implemented Features

## 🛠 Tech Stack
- **Frontend/Backend:** Next.js 14 (App Router)
- **Baza danych & Auth:** Supabase
- **AI:** OpenAI SDK (GPT-4o-mini)
- **Stylizacja:** TailwindCSS

## ⚙️ Jak uruchomić aplikację

## 🚀 Demo i Wersja Produkcyjna
Jeśli chcesz po prostu przetestować aplikację jako użytkownik, nie musisz niczego instalować. 
Aplikacja jest dostępna pod adresem: **[TUTAJ WKLEJ LINK DO VERCEL]**

## 🛠️ Konfiguracja lokalna (Dla Deweloperów)
Jeśli jesteś programistą i chcesz uruchomić ten projekt lokalnie do celów rozwojowych, wykonaj poniższe kroki:
1. Sklonuj repozytorium na swój komputer.
   - 1.1 Wejdź na stronę repozytorium: `https://github.com/TimothyJav/Elastic-Habits-App`.
   - 1.2 Kliknij zielony przycisk **"Code"** i skopiuj wyświetlony link (HTTPS).
   - 1.3 Otwórz terminal (lub wiersz poleceń) na swoim komputerze, wpisz `git clone` i wklej skopiowany link, a następnie naciśnij Enter.
2. Zainstaluj wszystkie zależności (biblioteki):
   - 2.1 W terminalu wejdź do folderu projektu wpisując: `cd Elastic-Habits-App`.
   - 2.2 Upewnij się, że masz zainstalowane środowisko Node.js (możesz to sprawdzić wpisując `node -v`).
   - 2.3 Wpisz komendę `npm install` i poczekaj, aż system pobierze niezbędne pliki.
3. Skonfiguruj bazę danych:
   - 3.1 Zaloguj się do swojego panelu na Supabase.com.
   - 3.2 W menu po lewej stronie znajdź ikonę **"SQL Editor"** i kliknij **"New query"**.
   - 3.3 Otwórz plik `20240523_create_habits_schema.sql` w swoim edytorze kodu, skopiuj całą jego treść, wklej ją w panelu Supabase i kliknij przycisk **"Run"**.
4. Skonfiguruj zmienne środowiskowe w pliku `.env.local`:
   - 4.1 W głównym folderze aplikacji stwórz nowy plik tekstowy i nazwij go `.env.local`.
   - 4.2 W panelu Supabase przejdź do **Project Settings** -> **API**.
   - 4.3 Skopiuj wartości `Project URL`, `anon public key` oraz `service_role key` i wpisz je do pliku według wzoru:
     - `NEXT_PUBLIC_SUPABASE_URL=twoj_url`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj_klucz_anon`
     - `SUPABASE_SERVICE_ROLE_KEY=twoj_klucz_service`
     - `OPENAI_API_KEY=twoj_klucz_openai`
5. Uruchom serwer deweloperski:
   - 5.1 Wróć do terminala (upewnij się, że wciąż jesteś w folderze projektu).
   - 5.2 Wpisz komendę `npm run dev` i naciśnij Enter.
   - 5.3 Otwórz przeglądarkę internetową i wpisz adres `http://localhost:3000`. Twoja aplikacja powinna już tam działać!

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