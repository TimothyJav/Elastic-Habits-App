'use client';

import { use, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  Battery,
  CalendarCheck,
  HeartPulse,
  Plus,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import HabitList from '@/components/HabitList';
import WeeklySummary from '@/components/WeeklySummary';
import HabitChart from '@/components/HabitChart';
import StreakCalendar from '@/components/StreakCalendar';
import AddHabitForm from '@/components/AddHabitForm';
import { DEMO_USER_ID } from '@/lib/demoUser';

interface DashboardContentProps {
  habitsPromise: ReturnType<typeof import('@/lib/habitActions').getHabits>;
}

type HabitLog = {
  level_achieved: string;
  completed_at: string;
};

type EnergyLevel = 'high' | 'medium' | 'low';
type CompletionLevel = 'full' | 'adjusted' | 'emergency';

const todayKey = () => new Date().toISOString().split('T')[0];

export function DashboardContent({ habitsPromise }: DashboardContentProps) {
  const habits = use(habitsPromise);
  const [energy, setEnergy] = useState<EnergyLevel>('medium');

  const allLogs = habits?.flatMap(habit =>
    habit.habit_logs?.map((log: HabitLog) => ({
      level_achieved: log.level_achieved,
      completed_at: log.completed_at,
    })) || []
  ) || [];

  const stats = useMemo(() => {
    const today = todayKey();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weekLogs = allLogs.filter(log => new Date(log.completed_at) >= weekAgo);
    const todayLogs = allLogs.filter(log => log.completed_at === today);

    return {
      totalHabits: habits?.length || 0,
      doneToday: todayLogs.length,
      weekTotal: weekLogs.length,
      emergencySaves: allLogs.filter(log => log.level_achieved === 'emergency').length,
    };
  }, [allLogs, habits?.length]);

  const recommendedLevel: CompletionLevel =
    energy === 'low' ? 'emergency' : energy === 'medium' ? 'adjusted' : 'full';

  const energyCopy: Record<EnergyLevel, string> = {
    high: 'Dzisiaj możesz wybrać Full, ale bez presji.',
    medium: 'Adjusted brzmi jak dobry, stabilny wybór.',
    low: 'Emergency jest pełnoprawnym sukcesem. To się liczy.',
  };

  if (habits?.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-8">
        <div className="mx-auto w-full max-w-5xl space-y-6">
          <header className="flex flex-col gap-2">
            <Link href="/" className="text-sm font-medium text-primary-300 hover:text-primary-200">
              Powrót
            </Link>
            <div>
              <p className="text-sm font-medium text-green-300">Elastic Habits</p>
              <h1 className="text-3xl font-bold text-white">Zacznij od jednego małego kroku</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Pierwszy nawyk może mieć od razu wersję Full, Adjusted i Emergency.
                Nie musisz wiedzieć wszystkiego przed startem.
              </p>
            </div>
          </header>

          <DailyEnergyCheckIn
            energy={energy}
            helperText={energyCopy[energy]}
            onEnergyChange={setEnergy}
          />

          <Card id="dodaj-nawyk" variant="elevated" className="py-8">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-lg bg-green-500/15 p-3 text-green-300">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Dodaj pierwszy nawyk</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Wybierz szablon albo wpisz własny cel. Emergency zostanie potraktowane jako sukces.
                </p>
              </div>
            </div>
            <AddHabitForm userId={DEMO_USER_ID} />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-green-300">Panel dzisiejszy</p>
            <h1 className="text-3xl font-bold text-white">Co dziś jest możliwe?</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Wybierz najmniejszą wersję działania, która pasuje do Twojej energii.
              Full, Adjusted i Emergency liczą się jako postęp.
            </p>
          </div>
          <Link href="#dodaj-nawyk">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Dodaj nawyk
            </Button>
          </Link>
        </header>

        <DailyEnergyCheckIn
          energy={energy}
          helperText={energyCopy[energy]}
          onEnergyChange={setEnergy}
        />

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={CalendarCheck} label="Dzisiaj wykonane" value={`${stats.doneToday}/${stats.totalHabits}`} tone="green" />
          <StatCard icon={Activity} label="Akcje w 7 dni" value={stats.weekTotal.toString()} tone="blue" />
          <StatCard icon={ShieldCheck} label="Emergency saves" value={stats.emergencySaves.toString()} tone="emerald" />
          <StatCard icon={HeartPulse} label="Aktywne nawyki" value={stats.totalHabits.toString()} tone="violet" />
        </section>

        <section id="twoje-nawyki" className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold text-white">Dzisiejszy plan</h2>
            <p className="text-sm text-slate-400">
              Jedno kliknięcie wystarczy, żeby zapisać dzisiejszy poziom.
            </p>
          </div>
          <HabitList habits={habits} userId={DEMO_USER_ID} recommendedLevel={recommendedLevel} />
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
          <Card variant="default">
            <WeeklySummary logs={allLogs} />
          </Card>
          <Card variant="default">
            <StreakCalendar logs={allLogs} />
          </Card>
        </section>

        <section>
          <Card variant="default">
            <h2 className="mb-4 text-lg font-semibold text-white">Rozkład poziomów</h2>
            <HabitChart logs={allLogs} />
          </Card>
        </section>

        <section id="dodaj-nawyk" className="border-t border-slate-800 pt-6">
          <div className="mb-3">
            <h2 className="text-xl font-semibold text-white">Dodaj kolejny nawyk</h2>
            <p className="text-sm text-slate-400">
              Szablony pomagają zacząć bez wymyślania wszystkiego od zera.
            </p>
          </div>
          <AddHabitForm userId={DEMO_USER_ID} />
        </section>
      </div>
    </div>
  );
}

function DailyEnergyCheckIn({
  energy,
  onEnergyChange,
  helperText,
}: {
  energy: EnergyLevel;
  onEnergyChange: (energy: EnergyLevel) => void;
  helperText: string;
}) {
  const options = [
    { id: 'high' as const, label: 'Dużo energii' },
    { id: 'medium' as const, label: 'Średnio' },
    { id: 'low' as const, label: 'Minimum' },
  ];

  return (
    <Card variant="glass" className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <Battery className="h-4 w-4 text-green-300" />
        Check-in energii
      </div>
      <div className="grid grid-cols-3 gap-2">
        {options.map(option => (
          <button
            key={option.id}
            type="button"
            onClick={() => onEnergyChange(option.id)}
            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              energy === option.id
                ? 'border-green-400 bg-green-500/20 text-green-100'
                : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-300">{helperText}</p>
    </Card>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof CalendarCheck;
  label: string;
  value: string;
  tone: 'green' | 'blue' | 'emerald' | 'violet';
}) {
  const tones = {
    green: 'border-green-500/20 bg-green-500/10 text-green-300',
    blue: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
    emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    violet: 'border-violet-500/20 bg-violet-500/10 text-violet-300',
  };

  return (
    <Card variant="glass" className="flex items-center gap-3">
      <div className={`rounded-lg border p-2 ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs font-medium uppercase text-slate-400">{label}</div>
      </div>
    </Card>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-9 w-72" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </header>

        <Skeleton className="h-32 w-full rounded-2xl" />

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </section>

        <section className="space-y-3">
          <Skeleton className="h-7 w-48" />
          {[1, 2].map(i => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </section>
      </div>
    </div>
  );
}
