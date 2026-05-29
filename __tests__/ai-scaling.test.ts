import { describe, it, expect } from 'vitest';
import { suggestHabitLevels } from '../lib/ai-scaling';
import { EMERGENCY_TEMPLATES } from '../templates';

describe('suggestHabitLevels', () => {
  it('returns a matching template for a known habit title', () => {
    const result = suggestHabitLevels('Medytacja');
    expect(result).not.toBeNull();
    expect(result!.emergency).toBe('1 świadomy oddech');
  });

  it('falls back to medytacja for walk/run keywords', () => {
    const result = suggestHabitLevels('Bieganie');
    expect(result).not.toBeNull();
    expect(result!.emergency).toBe('Wyjście przed próg');
  });

  it('falls back to a random template when no match is found', () => {
    const result = suggestHabitLevels('NieznanyNawykXYZ123');
    expect(result).not.toBeNull();
    expect(EMERGENCY_TEMPLATES).toContainEqual(
      expect.objectContaining({ emergency: result!.emergency })
    );
  });
});