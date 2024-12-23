import type { FC } from 'react';
import React from 'react';
import Image from 'next/image';

import type { Wallpaper } from '@/src/feautres/sidebar-filters/SidebarFilters';
// import { Button } from '@/src/shared/ui/button';
import More from '@/src/feautres/more/More';
import AddToFavorites from '@/src/feautres/add-to-favorites/AddToFavorites';
import Text from '@/src/shared/ui/Text';

import DiscountBadge from './Discount';
interface Props {
  data: Wallpaper;
}
const WallpepperItem: FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-[38px] relative">
      <Image
        alt=""
        src={data.imageUrl}
        width={373}
        height={373}
        className="aspect-square object-cover w-full"
      />
      <div className="flex justify-between w-full gap-0">
        <div className="flex flex-col gap-[8px] w-full shrink">
          <p color={'black'} className="subfont text-[32px] w-full">
            {data.title}
          </p>
          <Text color={'black'} textSize={'medium'}>
            От {data.price} ₽ / м²
          </Text>
        </div>
        <div className="flex flex-row gap-y-1 gap-x-1 flex-wrap justify-end">
          <More data={data} />
          <button className="text-[14px] w-[114px] h-[43px] bg-foreground rounded-full hover:scale-105 transition-all">
            <Text>Купить</Text>
          </button>
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
