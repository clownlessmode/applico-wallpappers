import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';
import Link from 'next/link';

import { Button } from '@/src/shared/ui/button';
import { cn } from '@/src/shared/lib/utils';
import Section from '@/src/shared/ui/containers/Section';
import Text from '@/src/shared/ui/Text';

import links from '../header/links';

const Footer: FC = () => {
  return (
    <footer className="w-screen bg-foreground text-background mt-[150px]">
      <Section
        background={'dark'}
        className="max-w-[1530px] mx-auto lg:flex-row md:flex-col justify-between lg:py-[50px] md:py-5 sm:py-4 py-4"
      >
        <div>
          <Image
            width={240}
            height={64}
            alt="applico"
            src={'/branding/applico.svg'}
          />
          <Text className="opacity-40">
            {' '}
            © applico.ru - отделочные материалы
          </Text>
          <Link href={'catalog'}>
            <Button variant={'light'} className="w-fit mt-[40px]">
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
        </div>
        <div className="flex flex-col-reverse md:flex-row md:gap-[40px] gap-[20px]">
          <div className="md:block hidden">
            <Text textSize={'large'}>Разделы</Text>
            <div className="flex flex-col gap-3 mt-[20px]">
              {links.map((item, index) => (
                <Link
                  className="text-[14px] text-[#D6D6D6] opacity-50 hover:opacity-100 leading-[10px]"
                  key={index}
                  href={item.href}
                >
                  <Text textSize={'medium'}> {item.title}</Text>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Text textSize={'large'}>
              Санкт-Петербург, ТК Ланской, <br className="md:block hidden" />
              Студенческая ул., д. 10
            </Text>
            <Text textSize={'large'}>
              Санкт-Петербург, ТК Василеостровский,{' '}
              <br className="md:block hidden" />
              Железноводская ул, д. 3
            </Text>
            <Link href={'https://t.me/durov'}>
              <Text
                textSize={'medium'}
                className="underline opacity-50 hover:opacity-100"
              >
                Дизайн разработал - Роман Калинин
              </Text>
            </Link>
            <Link href={'https://t.me/purpletooth'}>
              <Text
                textSize={'medium'}
                className="underline opacity-50 hover:opacity-100"
              >
                Сайт разработал - Родион Коваленко
              </Text>
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <Text textSize={'large'}>
              Санкт-Петербург, ТК Варшавский экспресс,{' '}
              <br className="md:block hidden" />
              наб. Обводного канала 118Б
            </Text>
            <Link href={'privacy-policy'} className="underline md:block hidden">
              <Text textSize={'medium'}>Политика конфиденциальности</Text>
            </Link>
          </div>
        </div>
      </Section>
    </footer>
  );
};

export default Footer;
