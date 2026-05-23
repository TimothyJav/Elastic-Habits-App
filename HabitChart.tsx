'use client';

interface HabitChartProps {
  logs: { level_achieved: string; completed_at: string }[];
}

export default function HabitChart({ logs }: HabitChartProps) {
  const counts = {
    full: logs.filter(l => l.level_achieved === 'full').length,
    adjusted: logs.filter(l => l.level_achieved === 'adjusted').length,
    emergency: logs.filter(l => l.level_achieved === 'emergency').length,
  };

  const maxCount = Math.max(counts.full, counts.adjusted, counts.emergency, 1);

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-4 h-32">
        {['full', 'adjusted', 'emergency'].map(level => {
          const height = (counts[level as keyof typeof counts] / maxCount) * 100;
          const colors = {
            full: 'bg-green-500',
            adjusted: 'bg-yellow-500',
            emergency: 'bg-green-700',
          };
          return (
            <div key={level} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center h-28">
                <div
                  className={`w-12 ${colors[level as keyof typeof colors]} rounded-t`}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-xs mt-2 text-slate-600">{counts[level as keyof typeof counts]}</span>
              <span className="text-xs font-medium">{level}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}