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
        'rounded-2xl p-4 sm:p-6 transition-all',
        {
          'bg-slate-800/60 backdrop-blur border border-slate-700/50 shadow-xl': variant === 'default',
          'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 shadow-2xl': variant === 'elevated',
          'bg-slate-800/30 backdrop-blur-md border border-slate-700/30': variant === 'glass',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}