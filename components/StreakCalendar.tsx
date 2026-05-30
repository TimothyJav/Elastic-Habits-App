'use client';

interface StreakCalendarProps {
  logs: { level_achieved: string; completed_at: string }[];
}

export default function StreakCalendar({ logs }: StreakCalendarProps) {
  const today = new Date();
  const dates: { [key: string]: string } = {};

  logs.forEach(log => {
    dates[log.completed_at] = log.level_achieved;
  });

  const days = [];
  for (let i = 27; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const level = dates[dateStr];
    
    const bgColors: Record<string, string> = {
      full: 'bg-purple-600',
      adjusted: 'bg-secondary-600',
      emergency: 'bg-green-600',
    };

    days.push(
      <div
        key={i}
        className={`w-8 h-8 rounded ${level ? bgColors[level] : 'bg-slate-700'}`}
        title={dateStr}
      />
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-slate-300">Ostatnie 28 dni</h3>
      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>
    </div>
  );
}
