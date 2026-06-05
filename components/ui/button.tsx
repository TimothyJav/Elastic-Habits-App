'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'emergency';
  size?: 'sm' | 'md' | 'lg';
  haptic?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', haptic = true, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'font-semibold rounded-xl transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'motion-safe:active:scale-95 motion-safe:hover:scale-105',
          {
            'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500': variant === 'primary',
            'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500': variant === 'secondary',
            'border border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 focus:ring-slate-500': variant === 'outline',
            'bg-emergency-600 text-white hover:bg-emergency-700 focus:ring-emergency-500': variant === 'emergency',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
