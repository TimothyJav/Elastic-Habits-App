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

export async function createHabit(formData: {
  userId: string;
  title: string;
  fullGoal: string;
  adjustedGoal: string;
  emergencyGoal: string;
}) {
  const { data, error } = await supabase
    .from('habits')
    .insert([
      {
        user_id: formData.userId,
        title: formData.title,
        full_goal: formData.fullGoal,
        adjusted_goal: formData.adjustedGoal,
        emergency_goal: formData.emergencyGoal,
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  revalidatePath('/dashboard');
  return data;
}

export async function getHabits(userId: string) {
  const { data, error } = await supabase
    .from('habits')
    .select(`
      *,
      habit_logs (
        level_achieved,
        completed_at
      )
    `)
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
  return data;
}