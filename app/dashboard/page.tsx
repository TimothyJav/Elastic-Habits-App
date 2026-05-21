import { getHabits } from '../../habitActions';
import HabitChart from '../../HabitChart';
import StreakCalendar from '../../StreakCalendar';
import WeeklySummary from '../../WeeklySummary';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
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
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="text-center p-10 border-2 border-dashed rounded-2xl text-slate-400">
          Nie masz jeszcze żadnych nawyków. Dodaj pierwszy, aby zobaczyć statystyki.
        </div>
        <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Powrót do nawyków
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-3">Twoje nawyki</h2>
          <HabitList habits={habits} />
        </section>

        <section className="border-t pt-6">
          <WeeklySummary logs={allLogs} />
        </section>

        <section className="border-t pt-6">
          <HabitChart logs={allLogs} />
        </section>

        <section className="border-t pt-6">
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
        <div key={habit.id} className="border rounded-lg p-4">
          <h3 className="font-bold text-lg">{habit.title}</h3>
          <div className="text-sm text-slate-600 mt-2">
            <div>Full: {habit.full_goal}</div>
            <div>Adjusted: {habit.adjusted_goal}</div>
            <div>Emergency: {habit.emergency_goal}</div>
          </div>
        </div>
      ))}
    </div>
  );
}