'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-700 rounded',
        {
          'h-4 w-3/4': variant === 'text',
          'rounded-full': variant === 'circular',
          'h-4 w-full': variant === 'rectangular',
        },
        className
      )}
    />
  );
}