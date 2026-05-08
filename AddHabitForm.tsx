'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { generateHabitLevels } from '../generate-habit-levels';
import { createHabit } from '../habitActions';

export default function AddHabitForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState('');
  const [levels, setLevels] = useState<{ full: string; adjusted: string; emergency: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerateAI = async () => {
    if (!title) return;
    setIsLoading(true);
    try {
      const generated = await generateHabitLevels(title);
      setLevels(generated);
    } catch (error) {
      toast.error("Wystąpił błąd podczas generowania przez AI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!levels || !title) return;
    setIsSaving(true);
    try {
      await createHabit({
        userId,
        title,
        fullGoal: levels.full,
        adjustedGoal: levels.adjusted,
        emergencyGoal: levels.emergency,
      });

      // Wystrzał konfetti dla nagrody dopaminowej (ADHD-friendly UX)
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#10b981', '#f59e0b'], // Indigo, Green, Amber
        zIndex: 999
      });

      // Reset formularza po sukcesie
      setTitle('');
      setLevels(null);
      toast.success("Nawyk dodany pomyślnie!");
    } catch (error) {
      toast.error("Błąd podczas zapisywania nawyku.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Nowy Elastyczny Nawyk</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Co chcesz robić?</label>
          <input
            type="text"
            placeholder="np. Medytacja, Bieganie, Kodowanie..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerateAI}
          disabled={isLoading || !title}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
        >
          {isLoading ? '🤖 Generowanie...' : '✨ Wygeneruj poziomy z AI'}
        </button>

        {levels && (
          <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
              <span className="text-xs font-bold text-green-700 uppercase">Poziom FULL</span>
              <p className="text-gray-800">{levels.full}</p>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <span className="text-xs font-bold text-blue-700 uppercase">Poziom ADJUSTED</span>
              <p className="text-gray-800">{levels.adjusted}</p>
            </div>

            <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg border-dashed">
              <span className="text-xs font-bold text-orange-700 uppercase">🚨 Poziom EMERGENCY</span>
              <p className="text-gray-800 font-medium">{levels.emergency}</p>
              <p className="text-[10px] text-orange-600 mt-1 italic">Dla dni z najniższą energią.</p>
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl transition"
              >
                {isSaving ? 'Zapisywanie...' : 'Zatwierdź i zacznij'}
              </button>
              <button
                onClick={() => setLevels(null)}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Edytuj
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}