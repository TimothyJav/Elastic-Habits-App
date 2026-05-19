'use server';

export async function logHabitCompletion(habitId: string, level: 'full' | 'adjusted' | 'emergency') {
  // Placeholder implementation
  console.log(`Logging habit ${habitId} as ${level}`);
  return { success: true };
}