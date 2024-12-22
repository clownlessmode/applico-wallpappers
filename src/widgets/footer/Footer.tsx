import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';
import Link from 'next/link';

import { Button } from '@/src/shared/ui/button';
import { cn } from '@/src/shared/lib/utils';

import links from '../header/links';

const Footer: FC = () => {
  return (
    <footer className="w-screen bg-foreground py-[50px] text-background mx-auto mt-[150px]">
      <div className="max-w-[1530px] mx-auto flex justify-between">
        <div>
          <Image
            width={240}
            height={64}
            alt="applico"
            src={'/branding/applico.svg'}
          />
          <p className="text-[14px] text-[#D6D6D6] mt-2 opacity-50">
            © домен.ru - отделочные материалы
          </p>
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
        <div className="flex flex-row gap-[140px]">
          <div>
            <p className="text-[20px]">Разделы</p>
            <div className="flex flex-col gap-3 mt-[20px]">
              {links.map((item, index) => (
                <Link
                  className="text-[14px] text-[#D6D6D6] opacity-50 hover:opacity-100 leading-[10px]"
                  key={index}
                  href={item.href}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[16px]">
              Санкт-Петербург, ТК Ланской,
              <br />
              Студенческая ул., д. 10
            </p>
            <p className="text-[16px]">
              Санкт-Петербург, ТК Василеостровский,
              <br />
              Железноводская ул, д. 3
            </p>
            <p className="text-[16px] underline opacity-50 hover:opacity-100">
              Сайт создал - Роман Калинин
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[16px]">
              Санкт-Петербург, ТК Варшавский экспресс, <br />
              наб. Обводного канала 118Б
            </p>

            <Link href={'privacy-policy'} className="text-[16px] underline">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
