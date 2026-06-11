import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

function cleanEnv(value: string | undefined): string {
  return (value ?? '').trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '');
}

const supabaseUrl = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll().map(c => ({ name: c.name, value: c.value })) as { name: string; value: string }[];
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {}
      },
    },
  });
}