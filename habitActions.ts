'use server';

import { createClient } from '@supabase/supabase-js'; // Zakładając utilsy Supabase
import { revalidatePath } from 'next/cache';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function logHabitCompletion(
  habitId: string, 
  userId: string, 
  level: 'full' | 'adjusted' | 'emergency'
) {
  const { data, error } = await supabase
    .from('habit_logs')
    .upsert({
      habit_id: habitId,
      user_id: userId,
      level_achieved: level,
      completed_at: new Date().toISOString().split('T')[0]
    }, { onConflict: 'habit_id, completed_at' });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  return data;
}