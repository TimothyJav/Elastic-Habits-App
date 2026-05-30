'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Clock3, Flame, ShieldCheck } from 'lucide-react';
import { logHabitCompletion } from '@/lib/habitActions';
import { toast } from 'sonner';

type CompletionLevel = 'full' | 'adjusted' | 'emergency';

interface HabitLog {
  level_achieved: CompletionLevel;
  completed_at: string;
}

interface Habit {
  id: string;
  title: string;
  level_full: string;
  level_adjusted: string;
  level_emergency: string;
  user_id: string;
  habit_logs?: HabitLog[];
}

interface HabitListProps {
  habits: Habit[];
  userId: string;
  recommendedLevel?: CompletionLevel;
}

const todayKey = () => new Date().toISOString().split('T')[0];

const levelLabels: Record<CompletionLevel, string> = {
  full: 'Full',
  adjusted: 'Adjusted',
  emergency: 'Emergency',
};

const levelStyles: Record<CompletionLevel, string> = {
  full: 'border-violet-500/30 bg-violet-500/10 text-violet-100 hover:border-violet-400',
  adjusted: 'border-blue-500/30 bg-blue-500/10 text-blue-100 hover:border-blue-400',
  emergency: 'border-green-500/30 bg-green-500/10 text-green-100 hover:border-green-400',
};

export default function HabitList({
  habits,
  userId,
  recommendedLevel = 'adjusted',
}: HabitListProps) {
  const [currentLevels, setCurrentLevels] = useState<Record<string, CompletionLevel>>({});
  const [savingHabitId, setSavingHabitId] = useState<string | null>(null);

  const today = todayKey();

  const handleLevelChange = async (habitId: string, level: CompletionLevel) => {
    try {
      setSavingHabitId(habitId);
      setCurrentLevels(prev => ({ ...prev, [habitId]: level }));
      await logHabitCompletion(habitId, userId, level);
      toast.success(
        level === 'emergency'
          ? 'Emergency zapisane. To jest sukces.'
          : `Zapisano poziom ${levelLabels[level]}.`
      );
    } catch (error) {
      toast.error('Nie udało się zapisać postępu.');
    } finally {
      setSavingHabitId(null);
    }
  };

  if (habits.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
        Nie masz jeszcze żadnych nawyków. Dodaj pierwszy, aby zacząć.
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          today={today}
          selectedLevel={currentLevels[habit.id]}
          recommendedLevel={recommendedLevel}
          isSaving={savingHabitId === habit.id}
          onLevelChange={level => handleLevelChange(habit.id, level)}
        />
      ))}
    </div>
  );
}

function HabitCard({
  habit,
  today,
  selectedLevel,
  recommendedLevel,
  isSaving,
  onLevelChange,
}: {
  habit: Habit;
  today: string;
  selectedLevel?: CompletionLevel;
  recommendedLevel: CompletionLevel;
  isSaving: boolean;
  onLevelChange: (level: CompletionLevel) => void;
}) {
  const todayLog = habit.habit_logs?.find(log => log.completed_at === today);
  const visibleLevel = selectedLevel || todayLog?.level_achieved;

  const stats = useMemo(() => {
    const logs = habit.habit_logs || [];
    return {
      total: logs.length,
      emergency: logs.filter(log => log.level_achieved === 'emergency').length,
      lastDone: logs
        .map(log => log.completed_at)
        .sort()
        .at(-1),
    };
  }, [habit.habit_logs]);

  const goals: Record<CompletionLevel, string> = {
    full: habit.level_full,
    adjusted: habit.level_adjusted,
    emergency: habit.level_emergency,
  };

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-white">{habit.title}</h3>
            {visibleLevel ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-1 text-xs font-semibold text-green-200">
                <CheckCircle2 className="h-3 w-3" />
                Dziś: {levelLabels[visibleLevel]}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-300">
                <Clock3 className="h-3 w-3" />
                Do wyboru dziś
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400">
            Rekomendacja na teraz: <span className="font-semibold text-green-300">{levelLabels[recommendedLevel]}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        {(Object.keys(goals) as CompletionLevel[]).map(level => (
          <button
            key={level}
            type="button"
            disabled={isSaving}
            onClick={() => onLevelChange(level)}
            className={`rounded-xl border p-3 text-left transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${levelStyles[level]} ${
              recommendedLevel === level ? 'ring-1 ring-green-300/60' : ''
            }`}
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wide">{levelLabels[level]}</span>
              {recommendedLevel === level && (
                <span className="rounded-full bg-green-400/20 px-2 py-0.5 text-[10px] font-bold uppercase text-green-100">
                  polecane
                </span>
              )}
            </div>
            <p className="text-sm leading-snug">{goals[level]}</p>
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-400">
        <div className="rounded-lg bg-slate-950/70 p-2">
          <div className="flex items-center gap-1 text-slate-300">
            <Flame className="h-3 w-3" />
            Logi
          </div>
          <div className="mt-1 text-lg font-bold text-white">{stats.total}</div>
        </div>
        <div className="rounded-lg bg-slate-950/70 p-2">
          <div className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="h-3 w-3" />
            Rescue
          </div>
          <div className="mt-1 text-lg font-bold text-green-300">{stats.emergency}</div>
        </div>
        <div className="rounded-lg bg-slate-950/70 p-2">
          <div className="text-slate-300">Ostatnio</div>
          <div className="mt-1 truncate text-sm font-semibold text-white">{stats.lastDone || 'brak'}</div>
        </div>
      </div>
    </article>
  );
}
