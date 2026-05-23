'use client';

import { useMemo } from 'react';

interface WeeklySummaryProps {
  logs: { level_achieved: string; completed_at: string }[];
}

export default function WeeklySummary({ logs }: WeeklySummaryProps) {
  const summary = useMemo(() => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);

    const weekLogs = logs.filter(log => new Date(log.completed_at) >= weekAgo);

    return {
      full: weekLogs.filter(l => l.level_achieved === 'full').length,
      adjusted: weekLogs.filter(l => l.level_achieved === 'adjusted').length,
      emergency: weekLogs.filter(l => l.level_achieved === 'emergency').length,
      total: weekLogs.length,
    };
  }, [logs]);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-slate-700">Podsumowanie tygodnia</h3>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 bg-green-100 rounded">
          <div className="text-2xl font-bold text-green-600">{summary.full}</div>
          <div className="text-xs">Full</div>
        </div>
        <div className="p-3 bg-yellow-100 rounded">
          <div className="text-2xl font-bold text-yellow-600">{summary.adjusted}</div>
          <div className="text-xs">Adjusted</div>
        </div>
        <div className="p-3 bg-green-200 rounded">
          <div className="text-2xl font-bold text-green-700">{summary.emergency}</div>
          <div className="text-xs">Emergency</div>
        </div>
      </div>
      <div className="text-center text-sm text-slate-600">
        Łącznie: {summary.total} dni
      </div>
    </div>
  );
}