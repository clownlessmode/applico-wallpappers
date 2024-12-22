import type { FC } from 'react';
import Image from 'next/image';

import { Button } from '@/src/shared/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/src/shared/ui/dialog';

import type { Wallpaper } from '../sidebar-filters/SidebarFilters';
interface Props {
  data: Wallpaper;
}
const More: FC<Props> = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'dark'}
          className="w-[114px] h-[43px] text-[14px] mr-[6px]"
        >
          <p className="invisible"></p>
          Подробнее
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[1530px] px-[50px] py-[141px] flex flex-row items-start justify-start">
        <div>
          <Image
            alt=""
            src={'/assets/hero-bg.png'}
            width={373}
            height={373}
            className="aspect-video object-cover w-[700px] "
          />
        </div>
        <div className="flex justify-between flex-col">
          <div className="flex flex-col gap-[20px] h-[350px]">
            <h2 className="text-[40px] subfont">{data.title}</h2>
            <p className="text-[22px] ">От {data.price} ₽ / м²</p>
            <p className="text-foreground/40 ">VR.0046-A</p>
            <p className="text-[22px] ">Цветовые решения:</p>
            <div className="flex flex-row gap-[10px] ">
              <Image
                alt=""
                src={'/assets/hero-bg.png'}
                width={40}
                height={40}
                className="aspect-square object-cover w-[40px] rounded-full"
              />
              <Image
                alt=""
                src={'/assets/hero-bg.png'}
                width={40}
                height={40}
                className="aspect-square object-cover w-[40px] rounded-full"
              />
              <Image
                alt=""
                src={'/assets/hero-bg.png'}
                width={40}
                height={40}
                className="aspect-square object-cover w-[40px] rounded-full"
              />
            </div>
          </div>
          <Button
            variant={'light'}
            className="w-[114px] h-[43px] text-[13px] mr-[6px] bg-foreground"
          >
            Купить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default More;
