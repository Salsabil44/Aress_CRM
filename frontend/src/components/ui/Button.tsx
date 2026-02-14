import { cn } from '@/utils/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, icon, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]',
        {
          'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 rounded-lg': variant === 'primary',
          'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400 rounded-lg': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 rounded-lg': variant === 'danger',
          'text-slate-500 hover:text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400 rounded-lg': variant === 'ghost',
          'border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 bg-white focus-visible:ring-primary-500 rounded-lg': variant === 'outline',
        },
        {
          'px-2 py-1 text-xs gap-1': size === 'xs',
          'px-3 py-1.5 text-[13px]': size === 'sm',
          'px-4 py-2 text-[13px]': size === 'md',
          'px-5 py-2.5 text-sm': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4">{icon}</span>}
      {children}
    </button>
  );
}
