'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface EmergencySwitchProps {
  currentLevel: 'full' | 'adjusted' | 'emergency';
  onLevelChange: (level: 'full' | 'adjusted' | 'emergency') => void;
  goals: {
    full: string;
    adjusted: string;
    emergency: string;
  };
}

export function EmergencySwitch({ currentLevel, onLevelChange, goals }: EmergencySwitchProps) {
  const handleLog = (level: 'full' | 'adjusted' | 'emergency') => {
    onLevelChange(level);
    confetti({
      particleCount: level === 'full' ? 100 : level === 'adjusted' ? 50 : 25,
      spread: 70,
      origin: { y: 0.6 },
      colors: level === 'emergency' ? ['#10b981', '#34d399'] : level === 'full' ? ['#f97316', '#fb923c'] : undefined
    });
  };

  const levels = [
    { id: 'emergency' as const, label: 'Zdyscyplinowany', desc: goals.emergency, color: 'bg-primary-600' },
    { id: 'adjusted' as const, label: 'Aktywny', desc: goals.adjusted, color: 'bg-secondary-600' },
    { id: 'full' as const, label: 'Pełen Energii', desc: goals.full, color: 'bg-orange-500' },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl border border-slate-700 p-4">
      <div className="grid grid-cols-3 gap-3">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => handleLog(level.id)}
            className={cn(
              "relative flex flex-col items-center justify-center p-4 rounded-xl transition-all min-h-[100px]",
              "border-2 font-medium",
              currentLevel === level.id 
                ? `${level.color} border-transparent text-white shadow-lg transform scale-105` 
                : "border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500 hover:bg-slate-700/50",
              "motion-safe:active:scale-95"
            )}
          >
            <span className="font-bold text-xs uppercase tracking-wider text-center leading-tight mb-1">
              {level.label}
            </span>
            <span className="text-[10px] opacity-75 text-center leading-tight line-clamp-2 px-1">
              {level.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}