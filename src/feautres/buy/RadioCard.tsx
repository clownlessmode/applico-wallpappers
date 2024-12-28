import React from 'react';

import { cn } from '@/src/shared/lib/utils';
import { Card, CardContent } from '@/src/shared/ui/card';
import Text from '@/src/shared/ui/Text';

interface RadioCardProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  address?: string;
  cost?: string;
}

export const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  ({ className, title, address, cost, ...props }, ref) => {
    return (
      <Card
        className={cn(
          'cursor-pointer transition-all hover:bg-accent w-full rounded-none',
          props.checked ? 'border-primary' : 'border-input',
          className,
        )}
      >
        <CardContent className="p-4 w-full min-h-[100px]">
          <label className="flex flex-col space-x-2">
            <div className="flex items-center">
              <input type="radio" className="sr-only" ref={ref} {...props} />
              <span
                className={cn(
                  'min-h-5 min-w-5 rounded-full border border-primary',
                  props.checked && 'bg-primary',
                )}
              />
              <Text textSize={'large'} color={'black'} className="ml-2 ">
                {title}
              </Text>
            </div>

            <Text
              textSize={'medium'}
              color={'black'}
              className="mt-2 text-foreground/50"
            >
              {address}
            </Text>
            <Text
              textSize={'medium'}
              color={'black'}
              className="mt-2 text-foreground/50"
            >
              Стоимость доставки: {cost === '0' ? 'бесплатно' : `${cost} ₽`}
            </Text>
          </label>
        </CardContent>
      </Card>
    );
  },
);
RadioCard.displayName = 'RadioCard';
