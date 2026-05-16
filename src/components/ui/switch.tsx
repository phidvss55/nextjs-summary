'use client';

import * as React from 'react';
import { Switch as SwitchPrimitive } from 'radix-ui';

import { cn } from '@//lib/utils';

function Switch({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-colors outline-none',
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        'data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7',
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block rounded-full bg-background ring-0 transition-transform',
          size === 'default' ? 'size-4' : 'size-3',
          size === 'default'
            ? 'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5'
            : 'data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0.5',
          'dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
