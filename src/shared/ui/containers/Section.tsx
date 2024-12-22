import type { ReactNode } from 'react';
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';

import Title from '../Title';

const sectionVariants = cva(
  'transition-all flex flex-col lg:gap-[50px] md:gap-5 sm:gap-4',
  {
    variants: {
      padding: {
        small: 'px-4',
        medium: 'px-5',
        large: 'lg:px-[50px] md:px-5 sm:px-4',
      },
      background: {
        light: 'bg-background',
        dark: 'bg-foreground',
      },
      display: {
        block: 'block',
        inlineBlock: 'inline-block',
        flex: 'flex',
        grid: 'grid',
      },
    },
    defaultVariants: {
      padding: 'large',
      background: 'light',
      display: 'flex',
    },
  },
);

// Используем React.ComponentPropsWithoutRef для автоматического добавления всех атрибутов
interface SectionProps
  extends VariantProps<typeof sectionVariants>,
    React.ComponentPropsWithoutRef<'section'> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  width?: string;
  height?: string;
  text?: ReactNode;
}

const Section: React.FC<SectionProps> = ({
  children,
  padding = 'large',
  background = 'light',
  display = 'flex',
  className,
  style,
  width,
  text,
  height,
  ...props // Для любых других HTML-атрибутов, таких как id, aria-label, и т.д.
}) => {
  return (
    <section
      className={cn(
        sectionVariants({
          padding,
          background,
          display,
          className,
        }),
      )}
      style={{ ...style, width, height }}
      {...props} // Передаем все остальные атрибуты
    >
      {text && (
        <Title color={background == 'dark' ? '#FCFAF7' : '#221F20'}>
          {text}
        </Title>
      )}
      {children}
    </section>
  );
};

export default Section;
