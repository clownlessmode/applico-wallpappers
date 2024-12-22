import { ArrowUpRight } from 'lucide-react';
import type { FC } from 'react';
import Link from 'next/link';

import { Input } from '@/src/shared/ui/input';
import { Button } from '@/src/shared/ui/button';
import { cn } from '@/src/shared/lib/utils';
import { Checkbox } from '@/src/shared/ui/checkbox';

const SendRequestForm: FC = () => {
  return (
    <form className="flex flex-col gap-[10px] mt-[46px]">
      <Input placeholder="Ваше имя" className="rounded-none h-[74px]" />
      <Input
        placeholder="+7 (999) 999-99-99"
        className="rounded-none h-[74px]"
      />
      <Input
        placeholder="Ваш бюджет на покупку"
        className="rounded-none h-[74px]"
      />

      <div className="flex items-center gap-2 flex-row mt-[24px]">
        <Checkbox />
        <p className="text-background/40 text-[18px] leading-[20px]">
          Я принимаю условия{' '}
          <Link href={'privacy-policy'} className="underline">
            политики конфиденциальности
          </Link>
        </p>
      </div>
      <Button variant={'light'} className="w-fit mt-[40px]">
        <div
          className={cn(
            'rounded-full flex text-background items-center justify-center w-[38.95px] h-[38.95px]',
            'bg-background text-foreground',
          )}
        >
          <ArrowUpRight />
        </div>
        Оставить заявку
      </Button>
    </form>
  );
};

export default SendRequestForm;
