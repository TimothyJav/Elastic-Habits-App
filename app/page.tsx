'use client';

import React, { useState } from 'react';
import { EmergencySwitch } from '@/components/EmergencySwitch';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  const [level, setLevel] = useState<'full' | 'adjusted' | 'emergency'>('full');
  
  const goals = {
    full: "Biegać 30 minut",
    adjusted: "Spacer 15 minut",
    emergency: "Ubrać buty do biegania i wyjść przed dom"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <main className="flex flex-col items-center p-4 pt-12">
        <div className="w-full max-w-2xl space-y-6">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
              Elastic Habits
            </h1>
            <p className="text-slate-400 text-center">Twój ADHD-friendly tracker nawyków</p>
          </header>

          <Card variant="elevated" className="flex flex-col items-center text-center p-6">
            <h2 className="text-xl font-semibold text-white mb-6 w-full">Dziś wybierz swój poziom</h2>
            <EmergencySwitch 
              currentLevel={level} 
              onLevelChange={setLevel} 
              goals={goals} 
            />
          </Card>

          <Card variant="glass" className="text-center p-6">
            <h3 className="text-lg font-medium text-white mb-3 w-full">Jak to działa?</h3>
            <p className="text-slate-300 text-sm mx-auto max-w-md">
              <strong className="text-primary-400">Emergency Mode</strong> - w gorsze dni zrobisz minimum, 
              a streak nadal rośnie. Zero wstydu, zero kar.
            </p>
          </Card>

          <Link href="/dashboard" className="block">
            <Button className="w-full py-6 text-lg font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
              Zacznij budować nawyk
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}