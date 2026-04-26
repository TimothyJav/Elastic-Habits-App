export function calculateStreak(logs: { completed_at: string }[]): number {
  if (!logs || logs.length === 0) return 0;

  // Sortowanie dat od najnowszej
  const sortedDates = logs
    .map(log => new Date(log.completed_at).getTime())
    .sort((a, b) => b - a);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let currentStreak = 0;
  let lastCheckedDate = new Date(sortedDates[0]);
  lastCheckedDate.setHours(0, 0, 0, 0);

  // Jeśli ostatni log nie jest z dzisiaj ani z wczoraj, streak wygasł
  const diffDays = Math.floor((today.getTime() - lastCheckedDate.getTime()) / (1000 * 3600 * 24));
  if (diffDays > 1) return 0;

  for (let i = 0; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i]);
    currentDate.setHours(0, 0, 0, 0);

    if (i === 0 || (new Date(sortedDates[i-1]).getTime() - currentDate.getTime()) / (1000 * 3600 * 24) <= 1) {
      currentStreak++;
    } else {
      break;
    }
  }

  return currentStreak;
}