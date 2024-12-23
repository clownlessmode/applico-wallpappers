import type { FC } from 'react';
import Image from 'next/image';

import { Dialog, DialogContent, DialogTrigger } from '@/src/shared/ui/dialog';
import Text from '@/src/shared/ui/Text';

import type { Wallpaper } from '../sidebar-filters/SidebarFilters';
interface Props {
  data: Wallpaper;
}
const More: FC<Props> = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-[14px] border border-foreground w-[114px] h-[43px] bg-background rounded-full hover:scale-105 transition-all">
          <Text color={'black'}>Подробнее</Text>
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[1530px] px-[50px] py-[141px] flex flex-row items-start justify-start">
        <div>
          <Image
            alt=""
            src={data.imageUrl}
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
                src={data.imageUrl}
                width={40}
                height={40}
                className="aspect-square object-cover w-[40px] rounded-full"
              />
              <Image
                alt=""
                src={data.imageUrl}
                width={40}
                height={40}
                className="aspect-square object-cover w-[40px] rounded-full"
              />
              <Image
                alt=""
                src={data.imageUrl}
                width={40}
                height={40}
                className="aspect-square object-cover w-[40px] rounded-full"
              />
            </div>
          </div>
          <button className="text-[14px] w-[114px] h-[43px] bg-foreground rounded-full hover:scale-105 transition-all">
            <Text>Купить</Text>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default More;
