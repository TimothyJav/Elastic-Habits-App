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
      colors: level === 'emergency' ? ['#fbbf24', '#f59e0b'] : undefined
    });
  };

  const levels = [
    { id: 'full' as const, label: 'Full', desc: goals.full, color: 'bg-primary-600' },
    { id: 'adjusted' as const, label: 'Adjusted', desc: goals.adjusted, color: 'bg-secondary-600' },
    { id: 'emergency' as const, label: 'Emergency', desc: goals.emergency, color: 'bg-emergency-600' },
  ];

  return (
    <div className="w-full bg-slate-800/60 rounded-2xl shadow-xl border border-slate-700 p-4">
      <h3 className="text-lg font-bold text-white mb-4">Wybierz poziom</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => handleLog(level.id)}
            className={cn(
              "relative flex flex-col items-start p-4 rounded-xl transition-all",
              "border-2 min-h-[56px]",
              currentLevel === level.id 
                ? `${level.color} border-transparent text-white` 
                : "border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500",
              "motion-safe:active:scale-[0.98] motion-safe:hover:scale-[1.02]"
            )}
          >
            <div className="flex justify-between w-full items-center">
              <span className="font-bold uppercase tracking-wider text-xs">
                {level.label}
              </span>
              {currentLevel === level.id && (
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Wybrano</span>
              )}
            </div>
            <p className="text-sm mt-1 text-left font-medium">
              {level.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}