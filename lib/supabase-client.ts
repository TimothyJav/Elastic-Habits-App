'use client';

import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

function cleanEnv(value: string | undefined): string {
  return (value ?? '').trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '');
}

const supabaseUrl = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export function createClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}