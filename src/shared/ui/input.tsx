import * as React from 'react';

import { cn } from '@/src/shared/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'inline-flex h-[56px] pl-[45px] items-center justify-center gap-3 whitespace-nowrap rounded-full border-[1.39px] transition-all font-light border-foreground/20 placeholder:text-[#BDBDBD] ',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
