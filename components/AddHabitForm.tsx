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

  const handleLevelChange = (level: 'full' | 'adjusted' | 'emergency', value: string) => {
    if (!levels) return;
    setLevels({ ...levels, [level]: value });
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

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#10b981', '#f59e0b'],
        zIndex: 999
      });

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
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 rounded-xl shadow-md border border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-white">Nowy Elastyczny Nawyk</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Co chcesz robić? (Poziom FULL)</label>
          <input
            type="text"
            placeholder="np. Medytacja, Bieganie, Kodowanie..."
            className="w-full px-4 py-2 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-slate-800 text-white outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerateAI}
          disabled={isLoading || !title}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
        >
          {isLoading ? '🤖 Generowanie...' : '✨ Wygeneruj poziomy z AI'}
        </button>

        {levels && (
          <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
              <span className="text-xs font-bold text-green-400 uppercase">Poziom FULL</span>
<input
                 type="text"
                 className="w-full mt-1 px-2 py-1 text-sm bg-slate-800/50 border border-slate-600 rounded text-slate-100 outline-none focus:ring-1 focus:ring-primary-500"
                 value={levels.full}
                 onChange={(e) => handleLevelChange('full', e.target.value)}
               />
             </div>
             
             <div className="p-3 bg-secondary-900/20 border border-secondary-600/30 rounded-lg">
               <span className="text-xs font-bold text-secondary-400 uppercase">Poziom ADJUSTED</span>
               <input
                 type="text"
                 className="w-full mt-1 px-2 py-1 text-sm bg-slate-800/50 border border-slate-600 rounded text-slate-100 outline-none focus:ring-1 focus:ring-secondary-500"
                 value={levels.adjusted}
                 onChange={(e) => handleLevelChange('adjusted', e.target.value)}
               />
             </div>

             <div className="p-3 bg-emergency-900/20 border border-emergency-600/30 rounded-lg border-dashed">
               <span className="text-xs font-bold text-emergency-400 uppercase">🚨 Poziom EMERGENCY</span>
               <input
                 type="text"
                 className="w-full mt-1 px-2 py-1 text-sm bg-slate-800/50 border border-slate-600 rounded text-slate-100 outline-none focus:ring-1 focus:ring-emergency-500 font-medium"
                 value={levels.emergency}
                 onChange={(e) => handleLevelChange('emergency', e.target.value)}
               />
               <p className="text-[10px] text-emergency-300 mt-1 italic">Dla dni z najniższą energią.</p>
             </div>

<div className="pt-4 flex gap-2">
               <button
                 onClick={handleSave}
                 disabled={isSaving}
                 className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition"
               >
                 {isSaving ? 'Zapisywanie...' : 'Zatwierdź i zacznij'}
               </button>
               <button
                 onClick={() => setLevels(null)}
                 className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
               >
                 Anuluj
               </button>
             </div>
           </div>
         )}
       </div>
     </div>
   );
 }

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