'use client';

import type * as React from 'react';
import { cn } from '@/lib/utils';

interface ToggleSwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function ToggleSwitch({
  checked,
  onCheckedChange,
  disabled = false,
  className,
  ...props
}: ToggleSwitchProps) {
  return (
    <div
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors',
        checked ? 'bg-black' : 'bg-gray-200',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      onClick={() => {
        if (!disabled) {
          onCheckedChange(!checked);
        }
      }}
      {...props}
    >
      <span
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </div>
  );
}
