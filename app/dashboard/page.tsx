import { getHabits } from '@/lib/habitActions';
import { DashboardContent, DashboardSkeleton } from '@/components/DashboardContent';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default function ProgressBoardPage() {
  const userId = 'demo-user';
  const habitsPromise = getHabits(userId).catch(() => [] as Awaited<ReturnType<typeof getHabits>>);

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent habitsPromise={habitsPromise} />
    </Suspense>
  );
}