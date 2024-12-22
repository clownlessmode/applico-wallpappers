import type { FC, ReactNode } from 'react';
import React from 'react';

import { cn } from '../lib/utils';

interface Props {
  children: ReactNode;
  color?: string;
  className?: string;
}

const Title: FC<Props> = ({ children, color, className }) => {
  return (
    <h1
      className={cn(
        'title  tracking-[0px] lg:text-[80px]  md:text-[60px] md:leading-[54px] sm:text-[40px] sm:leading-[36px] lg:leading-[80px]',
        className,
      )}
      style={{ color: color || 'var(--foreground)' }}
    >
      {children}
    </h1>
  );
};

export default Title;
