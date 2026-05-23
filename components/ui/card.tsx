'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
}

export function Card({ className, variant = 'default', children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-4 sm:p-6',
        {
          'bg-slate-800/50 border border-slate-700': variant === 'default',
          'bg-slate-800 border border-slate-600 shadow-xl': variant === 'elevated',
          'bg-slate-800/30 backdrop-blur border border-slate-700/50': variant === 'glass',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}