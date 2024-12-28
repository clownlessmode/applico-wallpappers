import React from 'react';

import { cn } from '@/src/shared/lib/utils';
import { Card, CardContent } from '@/src/shared/ui/card';

interface RadioCardProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <Card
        className={cn(
          'cursor-pointer transition-all hover:bg-accent',
          props.checked ? 'border-primary' : 'border-input',
          className,
        )}
      >
        <CardContent className="p-4">
          <label className="flex items-center space-x-2">
            <input type="radio" className="sr-only" ref={ref} {...props} />
            <span
              className={cn(
                'flex h-4 w-4 rounded-full border border-primary',
                props.checked && 'bg-primary',
              )}
            />
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </span>
          </label>
        </CardContent>
      </Card>
    );
  },
);
RadioCard.displayName = 'RadioCard';
