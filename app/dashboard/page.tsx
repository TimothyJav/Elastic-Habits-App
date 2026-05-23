import { getHabits } from '@/lib/habitActions';
import HabitChart from '@/components/HabitChart';
import StreakCalendar from '@/components/StreakCalendar';
import WeeklySummary from '@/components/WeeklySummary';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import HabitList from '@/components/HabitList';

export const dynamic = 'force-dynamic';

export default async function ProgressBoardPage() {
  let habits = [];
  try {
    const userId = 'demo-user';
    habits = await getHabits(userId);
  } catch (error) {
    // Supabase not configured, return empty state
  }

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
          <Link href="/">
            <Button>Dodaj nawyk</Button>
          </Link>
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