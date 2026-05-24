'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { createHabit } from '@/lib/habitActions';
import { useAISuggestions } from '@/lib/ai-scaling';

export default function AddHabitForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState('');
  const [levels, setLevels] = useState<{ full: string; adjusted: string; emergency: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerateAI = async () => {
    if (!title) return;
    setIsLoading(true);
    try {
      // User's input is treated as FULL level, generate ADJUSTED and EMERGENCY
      const { adjusted, emergency } = await generateAdjustedAndEmergencyLevels(title);
      setLevels({
        full: title,
        adjusted,
        emergency
      });
    } catch (error) {
      const { suggestHabitLevels } = useAISuggestions();
      const suggestion = suggestHabitLevels(title);
      if (suggestion) {
        setLevels({
          full: title,
          adjusted: suggestion.adjusted,
          emergency: suggestion.emergency
        });
        toast.info('Użyto szablonu offline');
      } else {
        toast.error("Wystąpił błąd podczas generowania przez AI.");
      }
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
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 rounded-xl shadow-md border border-gray-600">
      <h2 className="text-xl font-bold mb-4 text-white">Nowy Elastyczny Nawyk</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Co chcesz robić? (Poziom FULL)</label>
          <input
            type="text"
            placeholder="np. Medytacja, Bieganie, Kodowanie..."
            className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white outline-none"
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
            <div className="p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
              <span className="text-xs font-bold text-green-400 uppercase">Poziom FULL</span>
              <p className="text-gray-100">{levels.full}</p>
            </div>
            
            <div className="p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <span className="text-xs font-bold text-blue-400 uppercase">Poziom ADJUSTED</span>
              <p className="text-gray-100">{levels.adjusted}</p>
            </div>

            <div className="p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg border-dashed">
              <span className="text-xs font-bold text-orange-400 uppercase">🚨 Poziom EMERGENCY</span>
              <p className="text-gray-100 font-medium">{levels.emergency}</p>
              <p className="text-[10px] text-orange-300 mt-1 italic">Dla dni z najniższą energią.</p>
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl transition"
              >
                {isSaving ? 'Zapisywanie...' : 'Zatwierdź i zacznij'}
              </button>
              <button
                onClick={() => setLevels(null)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200"
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

// Helper function to generate adjusted and emergency levels based on full level
async function generateAdjustedAndEmergencyLevels(fullLevel: string): Promise<{ adjusted: string; emergency: string }> {
  const openaiModule = await import('openai');
  const openai = new openaiModule.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
    Jesteś ekspertem od ADHD i budowania nawyków. 
    Użytkownik zdefiniował swój optymalny cel (POZIOM FULL) jako: "${fullLevel}".
    Na podstawie tego celu, zdekomponuj go na dwa poziomy niższej trudności:
    
    1. Adjusted (Wersja pośrednia - około 50% energii wymaganej dla FULL)
    2. Emergency (Absolutne minimum - około 1% energii, zajmuje maksymalnie 2 minuty)
    
    Zwróć odpowiedź WYŁĄCZNIE w formacie JSON:
    {
      "adjusted": "opis poziomu adjusted...",
      "emergency": "opis poziomu emergency..."
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("Błąd generowania treści przez AI.");

    return JSON.parse(content) as {
      adjusted: string;
      emergency: string;
    };
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw new Error("Nie udało się wygenerować poziomów nawyku.");
  }
}