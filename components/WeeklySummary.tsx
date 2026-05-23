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
        <div className="p-3 bg-purple-900/20 border border-purple-500/20 rounded">
          <div className="text-2xl font-bold text-purple-400">{summary.full}</div>
          <div className="text-[10px] uppercase font-bold text-purple-300">Pełny</div>
        </div>
        <div className="p-3 bg-blue-900/20 border border-blue-500/20 rounded">
          <div className="text-2xl font-bold text-blue-400">{summary.adjusted}</div>
          <div className="text-[10px] uppercase font-bold text-blue-300">Średni</div>
        </div>
        <div className="p-3 bg-green-900/20 border border-green-500/20 rounded">
          <div className="text-2xl font-bold text-green-400">{summary.emergency}</div>
          <div className="text-[10px] uppercase font-bold text-green-300">Awaryjny</div>
        </div>
      </div>
      <div className="text-center text-sm text-slate-600">
        Łącznie: {summary.total} dni
      </div>
    </div>
  );
}