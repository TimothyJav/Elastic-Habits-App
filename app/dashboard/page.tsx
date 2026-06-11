import { getHabits } from '@/lib/habitActions';
import { DashboardContent, DashboardSkeleton } from '@/components/DashboardContent';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function ProgressBoardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    redirect('/login');
  }

  const userId = user.id;
  const habitsPromise = getHabits(userId).catch(() => [] as Awaited<ReturnType<typeof getHabits>>);

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent habitsPromise={habitsPromise} userId={userId} />
    </Suspense>
  );
}
