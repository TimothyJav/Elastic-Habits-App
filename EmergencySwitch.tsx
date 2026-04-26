'use client';

import React, { useState } from 'react';
import { Zap, ShieldAlert, Star } from 'lucide-react';

type HabitLevel = 'emergency' | 'better' | 'elite';

interface EmergencySwitchProps {
  habitName: string;
  levels: {
    emergency: string;
    better: string;
    elite: string;
  };
  onComplete: (level: HabitLevel) => void;
}

export const EmergencySwitch = ({ habitName, levels, onComplete }: EmergencySwitchProps) => {
  const [selected, setSelected] = useState<HabitLevel | null>(null);

  const config = {
    emergency: { icon: ShieldAlert, color: 'bg-red-100 text-red-700 border-red-300', label: 'Emergency' },
    better: { icon: Zap, color: 'bg-blue-100 text-blue-700 border-blue-300', label: 'Better' },
    elite: { icon: Star, color: 'bg-yellow-100 text-yellow-700 border-yellow-300', label: 'Elite' },
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <h3 className="font-bold text-lg mb-4 text-gray-800">{habitName}</h3>
      <div className="grid grid-cols-3 gap-3">
        {(['emergency', 'better', 'elite'] as HabitLevel[]).map((level) => {
          const Icon = config[level].icon;
          return (
            <button
              key={level}
              onClick={() => {
                setSelected(level);
                onComplete(level);
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                selected === level ? config[level].color : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="text-[10px] font-medium uppercase tracking-wider">{config[level].label}</span>
              <span className="text-[12px] mt-1 text-center leading-tight opacity-70">{levels[level]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};