'use client';

import { CheckCircle2, Gauge, ShieldCheck } from 'lucide-react';

interface HabitChartProps {
  logs: { level_achieved: string; completed_at: string }[];
}

type LevelKey = 'full' | 'adjusted' | 'emergency';

const levels: Array<{
  id: LevelKey;
  label: string;
  description: string;
  icon: typeof CheckCircle2;
  bar: string;
  badge: string;
}> = [
  {
    id: 'full',
    label: 'Full',
    description: 'Pełna wersja nawyku',
    icon: CheckCircle2,
    bar: 'bg-violet-500',
    badge: 'bg-violet-500/15 text-violet-200 border-violet-500/25',
  },
  {
    id: 'adjusted',
    label: 'Adjusted',
    description: 'Dopasowana wersja na trudniejszy dzień',
    icon: Gauge,
    bar: 'bg-blue-500',
    badge: 'bg-blue-500/15 text-blue-200 border-blue-500/25',
  },
  {
    id: 'emergency',
    label: 'Emergency',
    description: 'Minimalny krok, który nadal jest sukcesem',
    icon: ShieldCheck,
    bar: 'bg-green-500',
    badge: 'bg-green-500/15 text-green-200 border-green-500/25',
  },
];

export default function HabitChart({ logs }: HabitChartProps) {
  const counts: Record<LevelKey, number> = {
    full: logs.filter(log => log.level_achieved === 'full').length,
    adjusted: logs.filter(log => log.level_achieved === 'adjusted').length,
    emergency: logs.filter(log => log.level_achieved === 'emergency').length,
  };

  const total = counts.full + counts.adjusted + counts.emergency;

  if (total === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 p-5 text-sm text-slate-400">
        Rozkład poziomów pojawi się po zapisaniu pierwszego wykonania nawyku.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex h-3 overflow-hidden rounded-full bg-slate-800">
        {levels.map(level => {
          const percentage = (counts[level.id] / total) * 100;
          if (percentage === 0) return null;

          return (
            <div
              key={level.id}
              className={level.bar}
              style={{ width: `${percentage}%` }}
              title={`${level.label}: ${counts[level.id]}`}
            />
          );
        })}
      </div>

      <div className="grid gap-3">
        {levels.map(level => {
          const Icon = level.icon;
          const count = counts[level.id];
          const percentage = Math.round((count / total) * 100);

          return (
            <div key={level.id} className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className={`rounded-lg border p-2 ${level.badge}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-white">{level.label}</div>
                    <div className="truncate text-xs text-slate-400">{level.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{count}</div>
                  <div className="text-xs text-slate-400">{percentage}%</div>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div className={`h-full rounded-full ${level.bar}`} style={{ width: `${percentage}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
