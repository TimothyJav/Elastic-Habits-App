import { EMERGENCY_TEMPLATES } from '../templates';

export function suggestHabitLevels(habitTitle: string): { 
  title: string; 
  full: string; 
  adjusted: string; 
  emergency: string 
} | null {
  const searchTerm = habitTitle.toLowerCase();
  
  for (const template of EMERGENCY_TEMPLATES) {
    const templateLower = template.title.toLowerCase();
    if (templateLower.includes(searchTerm) || searchTerm.includes(templateLower)) {
      return {
        title: template.title,
        full: template.full,
        adjusted: template.adjusted,
        emergency: template.emergency
      };
    }
  }
  
  // Fallback for common variations
  if (searchTerm.includes('spacer') || searchTerm.includes('bieg') || searchTerm.includes('run')) {
    return { 
      title: 'Spacer', 
      full: '10 000 kroków', 
      adjusted: '2 000 kroków', 
      emergency: 'Wyjście przed próg' 
    };
  }
  
  if (searchTerm.includes('medyt') || searchTerm.includes('mindfulness')) {
    return { 
      title: 'Medytacja', 
      full: '20 minut', 
      adjusted: '5 minut', 
      emergency: '1 świadomy oddech' 
    };
  }
  
  if (searchTerm.includes('kod') || searchTerm.includes('program')) {
    return { 
      title: 'Kodowanie', 
      full: '3 godziny', 
      adjusted: '30 minut', 
      emergency: 'Otwarcie IDE' 
    };
  }
  
  const random = EMERGENCY_TEMPLATES[Math.floor(Math.random() * EMERGENCY_TEMPLATES.length)];
  return { 
    title: random.title, 
    full: random.full, 
    adjusted: random.adjusted, 
    emergency: random.emergency 
  };
}

export function useAISuggestions() {
  const memoizedSuggest = (title: string) => suggestHabitLevels(title);
  return { suggestHabitLevels: memoizedSuggest };
}