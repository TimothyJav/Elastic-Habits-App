import { getHabits } from '@/lib/habitActions';
import { DashboardContent, DashboardSkeleton } from '@/components/DashboardContent';
import { Suspense } from 'react';
import { DEMO_USER_ID } from '@/lib/demoUser';

export const dynamic = 'force-dynamic';

export default function ProgressBoardPage() {
  const userId = DEMO_USER_ID;
  const habitsPromise = getHabits(userId).catch(() => [] as Awaited<ReturnType<typeof getHabits>>);

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent habitsPromise={habitsPromise} />
    </Suspense>
  );
}
