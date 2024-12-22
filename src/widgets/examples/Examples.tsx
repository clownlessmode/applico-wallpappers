import type { FC } from 'react';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import Title from '@/src/shared/ui/Title';
import { Button } from '@/src/shared/ui/button';
import { cn } from '@/src/shared/lib/utils';
import Section from '@/src/shared/ui/containers/Section';
import Text from '@/src/shared/ui/Text';

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
    <Section
      background={'dark'}
      id="cases"
      className="lg:py-[50px] md:py-5 sm:py-4"
    >
      <div className="flex justify-between items-start w-full gap-12">
        <Title color="white" className="whitespace-nowrap">
          Как выглядят наши
          <br />
          обои у клиентов?
        </Title>
        <div className="flex flex-row flex-wrap gap-2 max-h-20 justify-end">
          {schewrons.map((item, index) => (
            <div
              key={index}
              className="border border-background h-8 w-full flex items-center justify-center rounded-full px-3 max-w-[300px]"
            >
              <Text color={'white'} textSize={'medium'}>
                {item.title}
              </Text>
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
        <Text textSize={'large'}>
          Более 10000 реализованных
          <br />
          проектов под ключ
        </Text>
      </div>
      <ExamplesCarousel />
    </Section>
  );
};

export default Examples;
