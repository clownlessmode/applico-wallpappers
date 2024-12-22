import type { FC, ReactNode } from 'react';
import React from 'react';

interface Props {
  children: ReactNode;
  color?: string;
}

const Title: FC<Props> = ({ children, color }) => {
  return (
    <h1
      className="title leading-[74px] tracking-[0px] text-[80px]"
      style={{ color: color || 'var(--foreground)' }}
    >
      {children}
    </h1>
  );
};

export default Title;
