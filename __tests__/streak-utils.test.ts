import { describe, it, expect } from 'vitest';
import { calculateStreak } from '../streak-utils';

describe('calculateStreak', () => {
  it('returns 0 for empty logs', () => {
    expect(calculateStreak([])).toBe(0);
  });

  it('returns 0 if last log is more than 1 day ago', () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const logs = [{ completed_at: twoDaysAgo.toISOString().split('T')[0] }];
    expect(calculateStreak(logs)).toBe(0);
  });

  it('counts consecutive days', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dayBefore = new Date(today);
    dayBefore.setDate(dayBefore.getDate() - 2);

    const logs = [
      { completed_at: today.toISOString().split('T')[0] },
      { completed_at: yesterday.toISOString().split('T')[0] },
      { completed_at: dayBefore.toISOString().split('T')[0] },
    ];
    expect(calculateStreak(logs)).toBe(3);
  });

  it('does not break streak for emergency level', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const logs = [
      { completed_at: today.toISOString().split('T')[0] },
      { completed_at: yesterday.toISOString().split('T')[0] },
    ];
    // level_achieved is ignored — any level counts as a streak day
    expect(calculateStreak(logs)).toBe(2);
  });

  it('breaks streak when gap is 2+ days', () => {
    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const logs = [
      { completed_at: today.toISOString().split('T')[0] },
      { completed_at: threeDaysAgo.toISOString().split('T')[0] },
    ];
    expect(calculateStreak(logs)).toBe(1);
  });
});
