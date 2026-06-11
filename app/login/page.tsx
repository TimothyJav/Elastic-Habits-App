'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';
import type { Database } from '@/types/supabase';

function cleanEnv(value: string | undefined): string {
  return (value ?? '').trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '');
}

const supabaseUrl = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const autoLogin = async () => {
      const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

      try {
        // getUser() waliduje token z serwerem Auth (tak samo jak middleware).
        // Dzięki temu nie wpadamy w pętlę, w której getSession() widzi nieważną
        // sesję z cookie i pomija logowanie, a middleware odbija na /login.
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          const { error: signInError } = await supabase.auth.signInAnonymously();
          if (signInError) {
            setError(signInError.message);
            return;
          }
        }

        // Pełne przeładowanie (a NIE router.push), żeby middleware na serwerze
        // na pewno zobaczyło świeżo zapisane cookie sesji. Przy miękkiej
        // nawigacji zdarzała się pętla powrotu na /login ("Logowanie..." bez końca).
        window.location.href = '/dashboard';
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Nieznany błąd logowania.');
      }
    };
    autoLogin();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-8 flex items-center justify-center">
      <div className="max-w-md text-center">
        {error ? (
          <>
            <p className="font-semibold text-rose-300">Nie udało się zalogować</p>
            <p className="mt-2 text-sm text-slate-400">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-primary-400/60 hover:text-primary-200"
            >
              Spróbuj ponownie
            </button>
          </>
        ) : (
          <p className="text-slate-400">Logowanie...</p>
        )}
      </div>
    </div>
  );
}
