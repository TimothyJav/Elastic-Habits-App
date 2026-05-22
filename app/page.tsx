'use client';

import React, { useState } from 'react';
import { EmergencySwitch } from '../EmergencySwitch';
import Link from 'next/link';

export default function Home() {
  const [level, setLevel] = useState<'full' | 'adjusted' | 'emergency'>('full');
  
  const goals = {
    full: "Biegać 30 minut",
    adjusted: "Spacer 15 minut",
    emergency: "Ubrać buty do biegania i wyjść przed dom"
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Elastic Habits</h1>
          <p className="text-slate-400">Twój ADHD-friendly tracker nawyków</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Dziś wybierz swój poziom</h2>
          <EmergencySwitch 
            currentLevel={level} 
            onLevelChange={setLevel} 
            goals={goals} 
          />
        </div>

        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-medium text-white mb-3">Jak to działa?</h3>
          <p className="text-slate-300 text-sm">
            <strong className="text-green-400">Emergency Mode</strong> - w gorsze dni zrobisz minimum, 
            a streak nadal rośnie. Zero wstydu, zero kar.
          </p>
        </div>

        <Link 
          href="/dashboard" 
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Zobacz swój postęp →
        </Link>
      </div>
    </main>
  );
}
