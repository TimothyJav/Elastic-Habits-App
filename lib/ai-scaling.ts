export type HabitLevelSuggestion = {
  title: string;
  full: string;
  adjusted: string;
  emergency: string;
  category: string;
  confidence: 'high' | 'medium' | 'fallback';
};

type HabitBlueprint = {
  category: string;
  title: string;
  keywords: string[];
  full: string;
  adjusted: string;
  emergency: string;
};

const HABIT_BLUEPRINTS: HabitBlueprint[] = [
  {
    category: 'mindfulness',
    title: 'Medytacja',
    keywords: ['medytacja', 'medytowac', 'mindfulness', 'oddech', 'wyciszenie', 'relaks'],
    full: '20 minut medytacji',
    adjusted: '5 minut spokojnego oddychania',
    emergency: '1 świadomy oddech',
  },
  {
    category: 'movement',
    title: 'Ruch',
    keywords: ['ruch', 'trening', 'silownia', 'cwiczenia', 'spacer', 'bieganie', 'bieg', 'kroki', 'joga'],
    full: '30 minut ruchu',
    adjusted: '10 minut lekkiego ruchu',
    emergency: 'Załóż buty i stań przy drzwiach',
  },
  {
    category: 'cleaning',
    title: 'Sprzątanie',
    keywords: ['sprzatanie', 'posprzatac', 'porzadek', 'pokoj', 'kuchnia', 'pranie', 'naczynia'],
    full: 'Posprzątaj jedno wybrane miejsce',
    adjusted: 'Ogarnij jedną widoczną powierzchnię',
    emergency: 'Odłóż jedną rzecz na miejsce',
  },
  {
    category: 'learning',
    title: 'Nauka',
    keywords: ['nauka', 'uczyc', 'kurs', 'lekcja', 'jezyk', 'angielski', 'czytanie', 'ksiazka'],
    full: '45 minut skupionej nauki',
    adjusted: '15 minut powtórki lub czytania',
    emergency: 'Otwórz materiały i przeczytaj jedno zdanie',
  },
  {
    category: 'coding',
    title: 'Kodowanie',
    keywords: ['kod', 'kodowanie', 'programowanie', 'projekt', 'commit', 'github', 'typescript', 'react'],
    full: '60 minut pracy nad kodem',
    adjusted: '20 minut poprawy jednego małego fragmentu',
    emergency: 'Otwórz projekt i zapisz jedną następną akcję',
  },
  {
    category: 'hydration',
    title: 'Woda',
    keywords: ['woda', 'picie', 'nawodnienie', 'napic'],
    full: 'Wypij zaplanowaną ilość wody w ciągu dnia',
    adjusted: 'Wypij jedną pełną szklankę wody',
    emergency: 'Weź jeden łyk wody',
  },
  {
    category: 'sleep',
    title: 'Sen',
    keywords: ['sen', 'spanie', 'spac', 'budzik', 'wieczor', 'telefon', 'rutyna wieczorna'],
    full: 'Wieczorna rutyna bez telefonu przez 30 minut',
    adjusted: 'Przygotuj łóżko i wycisz ekran',
    emergency: 'Ustaw budzik i połóż telefon dalej',
  },
  {
    category: 'planning',
    title: 'Planowanie',
    keywords: ['plan', 'planowanie', 'lista', 'todo', 'priorytet', 'organizacja'],
    full: 'Zaplanuj dzień lub tydzień',
    adjusted: 'Zapisz 3 najważniejsze zadania',
    emergency: 'Zapisz jeden następny krok',
  },
  {
    category: 'food',
    title: 'Jedzenie',
    keywords: ['jedzenie', 'posilek', 'gotowanie', 'obiad', 'sniadanie', 'kolacja', 'dieta'],
    full: 'Przygotuj pełny prosty posiłek',
    adjusted: 'Zjedz coś prostego z białkiem lub warzywem',
    emergency: 'Zjedz jedną małą rzecz, która da Ci energię',
  },
  {
    category: 'relationships',
    title: 'Relacje',
    keywords: ['relacje', 'kontakt', 'telefon', 'sms', 'wiadomosc', 'rodzina', 'znajomy', 'przyjaciel'],
    full: 'Porozmawiaj spokojnie z jedną bliską osobą',
    adjusted: 'Wyślij krótką wiadomość lub głosówkę',
    emergency: 'Wyślij jedno „myślę o Tobie”',
  },
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9ąćęłńóśźż\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function findBlueprint(habitTitle: string) {
  const normalizedTitle = normalizeText(habitTitle);

  return HABIT_BLUEPRINTS.find(blueprint =>
    blueprint.keywords.some(keyword => {
      const normalizedKeyword = normalizeText(keyword);
      return normalizedTitle.includes(normalizedKeyword) || normalizedKeyword.includes(normalizedTitle);
    })
  );
}

// Poprawna polska odmiana słowa "minuta" zależnie od liczby.
function polishMinutes(n: number): string {
  if (n === 1) return 'minuta';
  const lastTwo = n % 100;
  const last = n % 10;
  if (lastTwo >= 12 && lastTwo <= 14) return 'minut';
  if (last >= 2 && last <= 4) return 'minuty';
  return 'minut';
}

// Wykrywa czas trwania (np. "30 minut", "1 godzina") i resztę celu jako aktywność.
function parseDuration(cleanTitle: string): { minutes: number; activity: string } | null {
  const match = cleanTitle.match(
    /(\d+)\s*(min(?:ut[ayęąi]*)?|godz(?:in[ayęąi]*)?|h)\b/i
  );
  if (!match) return null;

  const value = parseInt(match[1], 10);
  if (!Number.isFinite(value) || value <= 0) return null;

  const unit = match[2].toLowerCase();
  const isHours = unit.startsWith('godz') || unit === 'h';
  const minutes = isHours ? value * 60 : value;

  // Aktywność = cel bez fragmentu z czasem, oczyszczony z wiodących przyimków.
  const activity = cleanTitle
    .replace(match[0], ' ')
    .replace(/\s+/g, ' ')
    .replace(/^(na|przez|po|do|z)\s+/i, '')
    .trim();

  return { minutes, activity };
}

function buildFallbackSuggestion(habitTitle: string): HabitLevelSuggestion {
  const cleanTitle = habitTitle.trim();
  const duration = parseDuration(cleanTitle);

  if (duration) {
    const { minutes, activity } = duration;

    // Adjusted ≈ 1/3 czasu (zaokrąglone do 5 min dla większych celów).
    const adjustedMinutes =
      minutes >= 15
        ? Math.max(5, Math.round(minutes / 3 / 5) * 5)
        : Math.max(2, Math.round(minutes / 2));
    // Emergency = absolutne minimum, max 2 minuty.
    const emergencyMinutes = Math.min(2, minutes);

    const suffix = activity ? ` ${activity}` : '';

    return {
      title: cleanTitle,
      full: cleanTitle,
      adjusted: `${adjustedMinutes} ${polishMinutes(adjustedMinutes)}${suffix}`,
      emergency: `${emergencyMinutes} ${polishMinutes(emergencyMinutes)}${suffix}`,
      category: 'custom',
      confidence: 'fallback',
    };
  }

  return {
    title: cleanTitle,
    full: cleanTitle,
    adjusted: `Krótsza wersja: ${cleanTitle}`,
    emergency: `Pierwszy mały krok: ${cleanTitle}`,
    category: 'custom',
    confidence: 'fallback',
  };
}

export function suggestHabitLevels(habitTitle: string): HabitLevelSuggestion | null {
  const cleanTitle = habitTitle.trim();
  if (!cleanTitle) return null;

  const blueprint = findBlueprint(cleanTitle);
  if (!blueprint) {
    return buildFallbackSuggestion(cleanTitle);
  }

  return {
    title: cleanTitle,
    full: cleanTitle,
    adjusted: blueprint.adjusted,
    emergency: blueprint.emergency,
    category: blueprint.category,
    confidence: normalizeText(blueprint.title) === normalizeText(cleanTitle) ? 'high' : 'medium',
  };
}

export function useAISuggestions() {
  const memoizedSuggest = (title: string) => suggestHabitLevels(title);
  return { suggestHabitLevels: memoizedSuggest };
}
