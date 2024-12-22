import type { FC } from 'react';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import Title from '@/src/shared/ui/Title';
import { Button } from '@/src/shared/ui/button';
import { cn } from '@/src/shared/lib/utils';

import ExamplesCarousel from '../../feautres/examples-carousel/ExamplesCarousel';

const schewrons = [
  {
    title: 'Ручная отрисовка изображений',
  },
  {
    title: 'Продукция сертифицирована',
  },
  {
    title: 'Работа со сложными проектами',
  },
  {
    title: 'Материалы не вредят экологии',
  },
];

const Examples: FC = () => {
  return (
    <section
      className="flex flex-col gap-[64px] py-[72px] px-[50px] bg-foreground"
      id="cases"
    >
      <div className="flex w-full justify-between">
        <Title color="white">
          Как выглядят наши
          <br />
          обои у клиентов?
        </Title>
        <div className="grid grid-cols-2 gap-[10px] max-w-[658px] h-[78px] justify-start items-start">
          {schewrons.map((item, index) => (
            <div
              key={index}
              className="border-background border h-[33px] w-[324px] flex items-center text-center justify-center text-background rounded-full"
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-[30px] items-center">
        <Link href={'catalog'}>
          <Button variant={'light'}>
            <div
              className={cn(
                'rounded-full flex text-background items-center justify-center w-[38.95px] h-[38.95px]',
                'bg-background text-foreground',
              )}
            >
              <ArrowUpRight />
            </div>
            В каталог
          </Button>
        </Link>
        <p className="text-background leading-[24px] text-[22px]">
          Более 10000 реализованных
          <br />
          проектов под ключ
        </p>
      </div>
      <ExamplesCarousel />
    </section>
  );
};

export default Examples;
