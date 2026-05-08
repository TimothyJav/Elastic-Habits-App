'use client'

import React, { useState } from 'react'
import { logHabitCompletion } from '@/app/actions/habit-actions'
import { cn } from '@/lib/utils' // Zakładając standardowe shadcn/tailwind util
import confetti from 'canvas-confetti'

interface HabitLevels {
  id: string
  title: string
  level_full: string
  level_adjusted: string
  level_emergency: string
}

export default function EmergencySwitch({ habit }: { habit: HabitLevels }) {
  const [isPending, setIsPending] = useState(false)
  const [lastLevel, setLastLevel] = useState<string | null>(null)

  const handleLog = async (level: 'full' | 'adjusted' | 'emergency') => {
    setIsPending(true)
    const result = await logHabitCompletion(habit.id, level)
    
    if (result.success) {
      setLastLevel(level)
      // Dopamine Hit!
      confetti({
        particleCount: level === 'full' ? 100 : level === 'adjusted' ? 50 : 25,
        spread: 70,
        origin: { y: 0.6 },
        colors: level === 'emergency' ? ['#fbbf24', '#f59e0b'] : undefined
      })
    }
    setIsPending(false)
  }

  const levels = [
    { id: 'full', label: 'Full', desc: habit.level_full, color: 'bg-green-500' },
    { id: 'adjusted', label: 'Adjusted', desc: habit.level_adjusted, color: 'bg-blue-500' },
    { id: 'emergency', label: 'Emergency', desc: habit.level_emergency, color: 'bg-amber-500' },
  ] as const

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4">{habit.title}</h3>
      
      <div className="flex flex-col gap-3">
        {levels.map((level) => (
          <button
            key={level.id}
            disabled={isPending}
            onClick={() => handleLog(level.id)}
            className={cn(
              "relative flex flex-col items-start p-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50",
              "border-2",
              lastLevel === level.id 
                ? `${level.color} border-transparent text-white` 
                : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"
            )}
          >
            <div className="flex justify-between w-full items-center">
              <span className="font-bold uppercase tracking-wider text-xs">
                {level.label}
              </span>
              {lastLevel === level.id && (
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Aktywne dzisiaj</span>
              )}
            </div>
            <p className="text-sm mt-1 text-left font-medium">
              {level.desc}
            </p>
            
            {/* "Low Friction" visual hint for Emergency */}
            {level.id === 'emergency' && lastLevel === null && (
              <div className="absolute -top-2 -right-2">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}