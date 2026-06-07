import { describe, expect, it } from 'vitest';
import { suggestHabitLevels } from '../lib/ai-scaling';

describe('suggestHabitLevels', () => {
  it('returns a stable matching suggestion for a known habit title', () => {
    const result = suggestHabitLevels('Medytacja');

    expect(result).not.toBeNull();
    expect(result!.confidence).toBe('high');
    expect(result!.category).toBe('mindfulness');
    expect(result!.emergency).toBe('1 świadomy oddech');
  });

  it('matches common movement variations without random fallback', () => {
    const result = suggestHabitLevels('Bieganie rano');

    expect(result).not.toBeNull();
    expect(result!.category).toBe('movement');
    expect(result!.emergency).toBe('Załóż buty i stań przy drzwiach');
  });

  it('matches coding-related habits to a coding blueprint', () => {
    const result = suggestHabitLevels('Popracować nad projektem React');

    expect(result).not.toBeNull();
    expect(result!.category).toBe('coding');
    expect(result!.adjusted).toBe('20 minut poprawy jednego małego fragmentu');
  });

  it('returns a deterministic custom fallback for unknown habits', () => {
    const first = suggestHabitLevels('Nakarmić fikusa');
    const second = suggestHabitLevels('Nakarmić fikusa');

    expect(first).toEqual(second);
    expect(first).toMatchObject({
      title: 'Nakarmić fikusa',
      full: 'Nakarmić fikusa',
      category: 'custom',
      confidence: 'fallback',
    });
    expect(first!.emergency).toContain('Nakarmić fikusa');
  });

  it('returns null for empty input', () => {
    expect(suggestHabitLevels('   ')).toBeNull();
  });
});
