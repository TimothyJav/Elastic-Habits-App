'use-server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function logHabitCompletion(
  habitId: string, 
  level: 'full' | 'adjusted' | 'emergency'
) {
  const supabase = createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Musisz być zalogowany, aby odhaczyć nawyk.' }
  }

  const { error } = await supabase
    .from('habit_logs')
    .upsert({
      habit_id: habitId,
      user_id: user.id,
      level_achieved: level,
      completed_at: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    }, { onConflict: 'habit_id, completed_at' })

  if (error) return { error: 'Nie udało się zapisać postępu.' }

  revalidatePath('/dashboard')
  return { success: true }
}