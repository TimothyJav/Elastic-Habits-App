'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';
import { createHabit } from '@/lib/habitActions';
import { suggestHabitLevels } from '@/lib/ai-scaling';

type HabitLevels = {
  full: string;
  adjusted: string;
  emergency: string;
};

type SuggestionMeta = {
  category: string;
  confidence: 'high' | 'medium' | 'fallback';
};

const quickTemplates: Array<{ title: string; levels: HabitLevels }> = [
  {
    title: 'Ruch',
    levels: {
      full: '30 minut spaceru lub treningu',
      adjusted: '10 minut lekkiego ruchu',
      emergency: 'Załóż buty i stań przy drzwiach',
    },
  },
  {
    title: 'Sprzątanie',
    levels: {
      full: 'Posprzątaj jedno pomieszczenie',
      adjusted: 'Ogarnij jedną widoczną powierzchnię',
      emergency: 'Odłóż jedną rzecz na miejsce',
    },
  },
  {
    title: 'Nauka',
    levels: {
      full: '45 minut skupionej nauki',
      adjusted: '15 minut powtórki',
      emergency: 'Otwórz materiały i przeczytaj jedno zdanie',
    },
  },
  {
    title: 'Sen',
    levels: {
      full: 'Wieczorna rutyna bez telefonu przez 30 minut',
      adjusted: 'Przygotuj łóżko i wycisz ekran',
      emergency: 'Ustaw budzik i połóż telefon dalej',
    },
  },
];

export default function AddHabitForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [levels, setLevels] = useState<HabitLevels | null>(null);
  const [suggestionMeta, setSuggestionMeta] = useState<SuggestionMeta | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const applyTemplate = (templateTitle: string, templateLevels: HabitLevels) => {
    setTitle(templateTitle);
    setLevels(templateLevels);
    setSuggestionMeta({ category: templateTitle.toLowerCase(), confidence: 'high' });
    toast.info('Szablon gotowy do edycji.');
  };

  const handleGenerateLevels = async () => {
    if (!title.trim()) return;

    setIsGenerating(true);
    try {
      const suggestion = suggestHabitLevels(title);
      setLevels({
        full: suggestion?.full || title,
        adjusted: suggestion?.adjusted || `Mniejsza wersja: ${title}`,
        emergency: suggestion?.emergency || `Najmniejszy możliwy krok: ${title}`,
      });
      setSuggestionMeta(
        suggestion ? { category: suggestion.category, confidence: suggestion.confidence } : null
      );
      toast.success(
        suggestion?.confidence === 'fallback'
          ? 'Przygotowałem bezpieczną wersję własną.'
          : 'Poziomy dopasowane do kategorii. Możesz je edytować.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLevelChange = (level: keyof HabitLevels, value: string) => {
    if (!levels) return;
    setLevels({ ...levels, [level]: value });
  };

  const handleSave = async () => {
    if (!levels || !title.trim()) return;

    setIsSaving(true);
    try {
      await createHabit({
        userId,
        title: title.trim(),
        fullGoal: levels.full,
        adjustedGoal: levels.adjusted,
        emergencyGoal: levels.emergency,
      });

      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#8b5cf6'],
        zIndex: 999,
      });

      setTitle('');
      setLevels(null);
      setSuggestionMeta(null);
      router.refresh();
      toast.success('Nawyk dodany. Masz od razu wersję Emergency.');
    } catch (error) {
      toast.error('Nie udało się zapisać nawyku.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-lg bg-primary-500/15 p-2 text-primary-200">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Nowy elastyczny nawyk</h3>
          <p className="mt-1 text-sm text-slate-400">
            Zacznij od szablonu albo wpisz własny cel. Każdy poziom możesz poprawić przed zapisem.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Szybkie szablony
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {quickTemplates.map(template => (
              <button
                key={template.title}
                type="button"
                onClick={() => applyTemplate(template.title, template.levels)}
                className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-green-400 hover:text-green-100"
              >
                {template.title}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Co chcesz robić?
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              placeholder="np. Medytacja, kodowanie, woda..."
              className="min-h-11 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-500/30"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
            <button
              type="button"
              onClick={handleGenerateLevels}
              disabled={isGenerating || !title.trim()}
              className="min-h-11 rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating ? 'Tworzę...' : 'Ułóż poziomy'}
            </button>
          </div>
        </div>

        {levels && (
          <div className="space-y-3">
            {suggestionMeta && (
              <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-sm text-slate-300">
                <span className="font-semibold text-white">
                  {suggestionMeta.confidence === 'fallback'
                    ? 'Tryb ostrożny'
                    : 'Dopasowany szablon'}
                </span>
                <span className="text-slate-400"> · {suggestionMeta.category}</span>
                <p className="mt-1 text-xs text-slate-400">
                  {suggestionMeta.confidence === 'fallback'
                    ? 'Nie znalazłem pewnej kategorii, więc zachowałem Twój cel i zaproponowałem neutralne mniejsze kroki.'
                    : 'Sugestia pochodzi ze stabilnej kategorii zamiast losowego przykładu.'}
                </p>
              </div>
            )}

            <LevelEditor
              label="Full"
              tone="violet"
              value={levels.full}
              onChange={value => handleLevelChange('full', value)}
            />
            <LevelEditor
              label="Adjusted"
              tone="blue"
              value={levels.adjusted}
              onChange={value => handleLevelChange('adjusted', value)}
            />
            <LevelEditor
              label="Emergency"
              tone="green"
              value={levels.emergency}
              helper="To nie jest porażka. To minimalny krok, który nadal podtrzymuje rytm."
              onChange={value => handleLevelChange('emergency', value)}
            />

            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="min-h-12 flex-1 rounded-xl bg-green-600 px-4 py-3 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? 'Zapisuję...' : 'Zapisz nawyk'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLevels(null);
                  setSuggestionMeta(null);
                }}
                className="min-h-12 rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
              >
                Wyczyść poziomy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LevelEditor({
  label,
  tone,
  value,
  helper,
  onChange,
}: {
  label: string;
  tone: 'violet' | 'blue' | 'green';
  value: string;
  helper?: string;
  onChange: (value: string) => void;
}) {
  const tones = {
    violet: 'border-violet-500/30 bg-violet-500/10 text-violet-200',
    blue: 'border-blue-500/30 bg-blue-500/10 text-blue-200',
    green: 'border-green-500/30 bg-green-500/10 text-green-200',
  };

  return (
    <div className={`rounded-xl border p-3 ${tones[tone]}`}>
      <label className="text-xs font-bold uppercase tracking-wide">{label}</label>
      <input
        type="text"
        className="mt-2 min-h-10 w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none transition focus:border-primary-400"
        value={value}
        onChange={event => onChange(event.target.value)}
      />
      {helper && <p className="mt-2 text-xs text-green-100/80">{helper}</p>}
    </div>
  );
}
