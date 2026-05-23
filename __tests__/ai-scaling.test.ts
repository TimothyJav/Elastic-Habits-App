import { describe, it, expect } from 'vitest';
import { suggestEmergencyGoal, useAISuggestions } from '../lib/ai-scaling';
import { EMERGENCY_TEMPLATES } from '../templates';

describe('suggestEmergencyGoal', () => {
  it('returns a matching template for a known habit title', () => {
    const result = suggestEmergencyGoal('Medytacja');
    expect(result).not.toBeNull();
    expect(result!.goal).toBe('1 świadomy oddech');
  });

  it('falls back to medytacja for walk/run keywords', () => {
    const result = suggestEmergencyGoal('Bieganie');
    expect(result).not.toBeNull();
    expect(result!.goal).toBe('1 świadomy oddech');
  });

  it('falls back to a random template when no match is found', () => {
    const result = suggestEmergencyGoal('NieznanyNawykXYZ123');
    expect(result).not.toBeNull();
    expect(EMERGENCY_TEMPLATES).toContainEqual(
      expect.objectContaining({ emergency: result!.goal })
    );
  });
});

describe('useAISuggestions', () => {
  it('memoizes suggestions (same output for same input)', () => {
    const { suggestEmergencyGoal } = useAISuggestions();
    const a = suggestEmergencyGoal('Kodowanie');
    const b = suggestEmergencyGoal('Kodowanie');
    expect(a).toEqual(b);
  });
});
