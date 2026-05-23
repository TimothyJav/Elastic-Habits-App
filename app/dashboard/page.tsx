import { getHabits } from '../../habitActions';
import HabitChart from '../../HabitChart';
import StreakCalendar from '../../StreakCalendar';
import WeeklySummary from '../../WeeklySummary';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
          <HabitList habits={habits} />
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

function HabitList({ habits }: { habits: any[] }) {
  return (
    <div className="space-y-4">
      {habits.map(habit => (
        <Card key={habit.id} className="border-l-4 border-primary-600">
          <h3 className="font-bold text-lg text-white">{habit.title}</h3>
          <div className="text-sm text-slate-400 mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Full: {habit.full_goal}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
              <span>Adjusted: {habit.adjusted_goal}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span>Emergency: {habit.emergency_goal}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}