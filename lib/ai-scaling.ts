import { EMERGENCY_TEMPLATES } from '../templates';

export function suggestEmergencyGoal(habitTitle: string): { title: string; goal: string } | null {
  const searchTerm = habitTitle.toLowerCase();
  
  for (const template of EMERGENCY_TEMPLATES) {
    const templateLower = template.title.toLowerCase();
    if (templateLower.includes(searchTerm) || searchTerm.includes(templateLower)) {
      return {
        title: template.title,
        goal: template.emergency,
      };
    }
  }
  
  if (searchTerm.includes('spacer') || searchTerm.includes('bieg')) {
    return { title: 'Medytacja', goal: '1 świadomy oddech' };
  }
  
  const random = EMERGENCY_TEMPLATES[Math.floor(Math.random() * EMERGENCY_TEMPLATES.length)];
  return { title: random.title, goal: random.emergency };
}

export function useAISuggestions() {
  const memoizedSuggest = (title: string) => suggestEmergencyGoal(title);
  return { suggestEmergencyGoal: memoizedSuggest };
}