'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Clock3, Flame, ShieldCheck, X } from 'lucide-react';
import { deleteHabit, logHabitCompletion } from '@/lib/habitActions';
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

const historyColors: Record<CompletionLevel, string> = {
  full: 'bg-violet-500',
  adjusted: 'bg-blue-500',
  emergency: 'bg-green-500',
};

export default function HabitList({
  habits,
  userId,
  recommendedLevel = 'adjusted',
}: HabitListProps) {
  const router = useRouter();
  const [currentLevels, setCurrentLevels] = useState<Record<string, CompletionLevel>>({});
  const [savingHabitId, setSavingHabitId] = useState<string | null>(null);
  const [deletingHabitId, setDeletingHabitId] = useState<string | null>(null);
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);

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

  const handleDeleteHabit = async () => {
    if (!habitToDelete) return;

    try {
      setDeletingHabitId(habitToDelete.id);
      await deleteHabit(habitToDelete.id, userId);
      toast.success('Nawyk usunięty.');
      setHabitToDelete(null);
      router.refresh();
    } catch (error) {
      toast.error('Nie udało się usunąć nawyku.');
    } finally {
      setDeletingHabitId(null);
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
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        {habits.map(habit => (
          <HabitCard
            key={habit.id}
            habit={habit}
            today={today}
            selectedLevel={currentLevels[habit.id]}
            recommendedLevel={recommendedLevel}
            isSaving={savingHabitId === habit.id}
            isDeleting={deletingHabitId === habit.id}
            onLevelChange={level => handleLevelChange(habit.id, level)}
            onDelete={() => setHabitToDelete(habit)}
          />
        ))}
      </div>

      {habitToDelete && (
        <DeleteHabitDialog
          habitTitle={habitToDelete.title}
          isDeleting={deletingHabitId === habitToDelete.id}
          onCancel={() => setHabitToDelete(null)}
          onConfirm={handleDeleteHabit}
        />
      )}
    </>
  );
}

function HabitCard({
  habit,
  today,
  selectedLevel,
  recommendedLevel,
  isSaving,
  isDeleting,
  onLevelChange,
  onDelete,
}: {
  habit: Habit;
  today: string;
  selectedLevel?: CompletionLevel;
  recommendedLevel: CompletionLevel;
  isSaving: boolean;
  isDeleting: boolean;
  onLevelChange: (level: CompletionLevel) => void;
  onDelete: () => void;
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
        <div className="min-w-0 flex-1">
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
        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          aria-label={`Usuń nawyk ${habit.title}`}
          title="Usuń nawyk"
          className="rounded-lg border border-slate-700 bg-slate-950/70 p-2 text-slate-400 transition hover:border-rose-400/60 hover:text-rose-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="h-4 w-4" />
        </button>
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

      <HabitHistory logs={habit.habit_logs || []} />

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

function DeleteHabitDialog({
  habitTitle,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  habitTitle: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-habit-title"
        className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl"
      >
        <h2 id="delete-habit-title" className="text-lg font-bold text-white">
          Usunąć ten nawyk?
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          „{habitTitle}” zniknie z listy razem z historią. Tej akcji nie trzeba robić teraz.
        </p>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Zostaw nawyk
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? 'Usuwanie...' : 'Usuń'}
          </button>
        </div>
      </div>
    </div>
  );
}

function HabitHistory({ logs }: { logs: HabitLog[] }) {
  const levelsByDate = useMemo(() => {
    const dates: Record<string, CompletionLevel> = {};

    logs.forEach(log => {
      dates[log.completed_at] = log.level_achieved;
    });

    return dates;
  }, [logs]);

  const days = useMemo(() => {
    const today = new Date();

    return Array.from({ length: 28 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (27 - index));

      const dateKey = date.toISOString().split('T')[0];
      const level = levelsByDate[dateKey];

      return {
        dateKey,
        level,
      };
    });
  }, [levelsByDate]);

  return (
    <div className="mt-4 space-y-2">
      <div className="text-xs font-semibold uppercase text-slate-400">
        Historia tego nawyku: 28 dni
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div
            key={day.dateKey}
            title={`${day.dateKey}${day.level ? `: ${levelLabels[day.level]}` : ': brak wpisu'}`}
            className={`h-3 rounded-sm ${day.level ? historyColors[day.level] : 'bg-slate-700/70'}`}
          />
        ))}
      </div>
    </div>
  );
}
