'use client';

import { use } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import HabitList from '@/components/HabitList';
import WeeklySummary from '@/components/WeeklySummary';
import HabitChart from '@/components/HabitChart';
import StreakCalendar from '@/components/StreakCalendar';
import AddHabitForm from '@/components/AddHabitForm';

interface DashboardContentProps {
  habitsPromise: ReturnType<typeof import('@/lib/habitActions').getHabits>;
}

export function DashboardContent({ habitsPromise }: DashboardContentProps) {
  const habits = use(habitsPromise);
  const allLogs = habits?.flatMap(h =>
    h.habit_logs?.map((log: { level_achieved: string; completed_at: string }) => ({
      level_achieved: log.level_achieved,
      completed_at: log.completed_at
    })) || []
  ) || [];

if (habits?.length === 0) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 sm:p-8">
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-white">Tablica Postępów</h1>
            </header>

            <Card variant="elevated" className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-xl font-semibold text-white mb-2">Brak nawyków</h2>
              <p className="text-slate-400 mb-6">Dodaj swój pierwszy nawyk, aby zobaczyć postępy!</p>
              <AddHabitForm userId="demo-user" />
            </Card>

            <Link href="/" className="mt-6 inline-block text-primary-400 hover:underline">
              ← Powrót do nawyków
            </Link>
          </div>
        );
      }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 sm:p-8 max-w-4xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white">Tablica Postępów</h1>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Twoje nawyki</h2>
          <HabitList habits={habits} userId="demo-user" />
        </section>

        <section className="border-t border-slate-800 pt-6">
          <WeeklySummary logs={allLogs} />
        </section>

        <section className="border-t border-slate-800 pt-6">
          <HabitChart logs={allLogs} />
        </section>

        <section className="border-t border-slate-800 pt-6">
          <StreakCalendar logs={allLogs} />
        </section>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 sm:p-8 max-w-4xl">
      <header className="mb-6">
        <Skeleton className="h-8 w-48" />
      </header>

      <div className="space-y-6">
        <section>
          <Skeleton className="h-6 w-32 mb-3" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} variant="elevated" className="p-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-800 pt-6">
          <Skeleton className="h-48 w-full rounded-2xl" />
        </section>

        <section className="border-t border-slate-800 pt-6">
          <Skeleton className="h-64 w-full rounded-2xl" />
        </section>

        <section className="border-t border-slate-800 pt-6">
          <Skeleton className="h-32 w-full rounded-2xl" />
        </section>
      </div>
    </div>
  );
}
