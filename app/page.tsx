'use client';

import React, { useState } from 'react';
import { EmergencySwitch } from '../EmergencySwitch';

export default function Home() {
  const [level, setLevel] = useState<'full' | 'adjusted' | 'emergency'>('full');
  
  const goals = {
    full: "Biegać 30 minut",
    adjusted: "Spacer 15 minut",
    emergency: "Ubrać buty do biegania i wyjść przed dom"
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Elastic Habits MVP</h1>
      <EmergencySwitch 
        currentLevel={level} 
        onLevelChange={setLevel} 
        goals={goals} 
      />
    </main>
  );
}
