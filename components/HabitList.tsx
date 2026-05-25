'use client';

import { useState } from 'react';
import { EmergencySwitch } from '@/components/EmergencySwitch';
import { logHabitCompletion } from '@/lib/habitActions';
import { toast } from 'sonner';

interface Habit {
  id: string;
  title: string;
  full_goal: string;
  adjusted_goal: string;
  emergency_goal: string;
  user_id: string;
}

export default function HabitList({ habits, userId }: { habits: Habit[], userId: string }) {
  const [currentLevels, setCurrentLevels] = useState<Record<string, 'full' | 'adjusted' | 'emergency'>>({});

  const handleLevelChange = async (habitId: string, level: 'full' | 'adjusted' | 'emergency') => {
    try {
      setCurrentLevels(prev => ({ ...prev, [habitId]: level }));
      await logHabitCompletion(habitId, userId, level);
      toast.success(`Zaliczono poziom ${level.toUpperCase()}!`);
    } catch (error) {
      toast.error("Nie udało się zapisać postępu.");
    }
  };

  if (habits.length === 0) {
    return (
      <div className="text-center p-10 border-2 border-dashed rounded-2xl text-slate-400">
        Nie masz jeszcze żadnych nawyków. Dodaj pierwszy, aby zacząć!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {habits.map((habit) => (
        <div key={habit.id} className="space-y-2">
          <h3 className="text-lg font-bold text-slate-200 ml-1">{habit.title}</h3>
          <EmergencySwitch 
            currentLevel={currentLevels[habit.id] || 'full'}
            goals={{ full: habit.full_goal, adjusted: habit.adjusted_goal, emergency: habit.emergency_goal }}
            onLevelChange={(level) => handleLevelChange(habit.id, level)}
          />
        </div>
      ))}
    </div>
  );
}