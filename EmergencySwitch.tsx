'use client';

import React from 'react';
import { Flame, Zap, ShieldAlert } from 'lucide-react';

type Level = 'full' | 'adjusted' | 'emergency';

interface EmergencySwitchProps {
  currentLevel: Level;
  onLevelChange: (level: Level) => void;
  goals: { full: string; adjusted: string; emergency: string };
}

export const EmergencySwitch = ({ currentLevel, onLevelChange, goals }: EmergencySwitchProps) => {
  const levels = [
    { id: 'full', label: 'Full', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', text: goals.full },
    { id: 'adjusted', label: 'Adjusted', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', text: goals.adjusted },
    { id: 'emergency', label: 'Emergency', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', text: goals.emergency },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Tryb trudności</h3>
        <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600 font-medium">No-Shame Active</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {levels.map((lvl) => {
          const Icon = lvl.icon;
          const isActive = currentLevel === lvl.id;
          
          return (
            <button
              key={lvl.id}
              onClick={() => onLevelChange(lvl.id as Level)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                isActive 
                  ? `${lvl.border} ${lvl.bg} scale-105 shadow-md` 
                  : 'border-transparent bg-slate-50 hover:bg-slate-100 opacity-60'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? lvl.color : 'text-slate-400'}`} />
              <span className={`text-[10px] font-bold uppercase ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                {lvl.label}
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-2 p-3 bg-slate-50 rounded-lg text-center">
        <p className="text-slate-700 font-medium italic">"{levels.find(l => l.id === currentLevel)?.text}"</p>
      </div>
    </div>
  );
};