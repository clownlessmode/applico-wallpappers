import type { FC } from 'react';
import React from 'react';
import Image from 'next/image';

import type { Wallpaper } from '@/src/feautres/sidebar-filters/SidebarFilters';
import { Button } from '@/src/shared/ui/button';
import More from '@/src/feautres/more/More';
import AddToFavorites from '@/src/feautres/add-to-favorites/AddToFavorites';

import DiscountBadge from './Discount';
interface Props {
  data: Wallpaper;
}
const WallpepperItem: FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-[38px] relative">
      <Image
        alt=""
        src={'/assets/hero-bg.png'}
        width={373}
        height={373}
        className="aspect-square object-cover w-full"
      />
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-[4px]">
          <p className="text-[12px]">{data.title}</p>
          <p className="text-[16px]">От {data.price} ₽ / м²</p>
        </div>
        <div>
          <More data={data} />
          <Button
            className="text-[13px] w-[114px] h-[43px] bg-foreground "
            variant={'light'}
          >
            <p className="invisible"></p>
            Купить
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-between p-[10px] top-0 left-0 absolute">
        <DiscountBadge />
        <AddToFavorites wallpaper={data} />
      </div>
    </div>
  );
};

export default WallpepperItem;
