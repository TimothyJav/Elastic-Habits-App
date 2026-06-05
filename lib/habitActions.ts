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
        level_full: formData.fullGoal,
        level_adjusted: formData.adjustedGoal,
        level_emergency: formData.emergencyGoal,
      },
    ])
    .select();

  if (error) {
    console.error('createHabit error:', error);
    throw new Error(error.message);
  }
  revalidatePath('/dashboard');
  return data;
}

export async function deleteHabit(habitId: string, userId: string) {
  const { error } = await supabase
    .from('habits')
    .delete()
    .eq('id', habitId)
    .eq('user_id', userId);

  if (error) {
    console.error('deleteHabit error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
}

export async function createHabitNote(formData: {
  habitId: string;
  userId: string;
  content: string;
}) {
  const content = formData.content.trim();

  if (!content) {
    throw new Error('Notatka nie może być pusta.');
  }

  const { data, error } = await supabase
    .from('habit_notes')
    .insert([
      {
        habit_id: formData.habitId,
        user_id: formData.userId,
        content,
      },
    ])
    .select();

  if (error) {
    console.error('createHabitNote error:', error);
    throw new Error(error.message);
  }

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

  const habits = data || [];
  const habitIds = habits.map(habit => habit.id);

  if (habitIds.length === 0) {
    return habits;
  }

  const { data: notes, error: notesError } = await supabase
    .from('habit_notes')
    .select('id, habit_id, content, created_at')
    .eq('user_id', userId)
    .in('habit_id', habitIds)
    .order('created_at', { ascending: false });

  if (notesError) {
    return habits.map(habit => ({ ...habit, habit_notes: [] }));
  }

  return habits.map(habit => ({
    ...habit,
    habit_notes: (notes || []).filter(note => note.habit_id === habit.id),
  }));
}
