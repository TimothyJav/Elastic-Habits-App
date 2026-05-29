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
      colors: level === 'emergency' ? ['#16a34a', '#22c55e'] : undefined
    });
  };

  const levels = [
    { 
      id: 'full' as const, 
      label: 'Pełny Cel', 
      desc: goals.full,
      color: 'purple'
    },
    { 
      id: 'adjusted' as const, 
      label: 'Dostosowany', 
      desc: goals.adjusted,
      color: 'blue'
    },
    { 
      id: 'emergency' as const, 
      label: 'Tryb Awaryjny', 
      desc: goals.emergency,
      color: 'green'
    },
  ];

  const colorMap = {
    purple: { active: 'bg-purple-600 border-purple-400 text-white', inactive: 'bg-purple-900/30 border-purple-800 text-purple-200' },
    blue: { active: 'bg-blue-600 border-blue-400 text-white', inactive: 'bg-blue-900/30 border-blue-800 text-blue-200' },
    green: { active: 'bg-green-600 border-green-400 text-white', inactive: 'bg-green-900/30 border-green-800 text-green-200' },
  };

  return (
    <div className="w-full bg-slate-900/60 rounded-2xl shadow-2xl border border-slate-800 p-6">
      <h3 className="text-lg font-bold text-white mb-6 text-center">Wybierz dzisiejszy poziom</h3>
      
      <div className="flex flex-col gap-4">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => handleLog(level.id)}
            className={cn(
              "relative flex flex-col items-center justify-center p-6 rounded-xl transition-all active:scale-[0.98] w-full border-2",
              currentLevel === level.id 
                ? colorMap[level.color as keyof typeof colorMap].active 
                : colorMap[level.color as keyof typeof colorMap].inactive
            )}
          >
            <span className="font-bold uppercase tracking-wider text-[10px] opacity-80 mb-1">
              {level.label}
            </span>
            <p className="text-base font-semibold leading-tight">
              {level.desc}
            </p>
            {currentLevel === level.id && (
              <span className="absolute top-2 right-2 text-[10px] bg-white/20 px-2 py-1 rounded backdrop-blur-sm font-bold uppercase">
                Wybrano
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}