// Text.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const textVariants = cva('transition-all', {
  variants: {
    color: {
      black: 'text-foreground',
      white: 'text-background',
    },
    textSize: {
      small: 'lg:text-[14px]',
      medium: 'lg:text-[18px] md:text-[16px] sm:text-[14px]',
      large: 'lg:text-[22px] md:text-[20px] sm:text-[18px]',
    },
  },
  defaultVariants: {
    color: 'white',
    textSize: 'small',
  },
});

interface TextProps
  extends Omit<React.HTMLProps<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  children: React.ReactNode;
  asChild?: boolean;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    { children, color, textSize, className, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? 'span' : 'p';

    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ color, textSize, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Text.displayName = 'Text';

export default Text;
