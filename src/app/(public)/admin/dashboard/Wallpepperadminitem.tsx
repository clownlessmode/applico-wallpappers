import type { FC } from 'react';
import React from 'react';
import Image from 'next/image';

import type { Wallpaper } from '@/src/feautres/sidebar-filters/SidebarFilters';
import Text from '@/src/shared/ui/Text';
import DiscountBadge from '@/src/widgets/catalogue/Discount';

import EditItem from './EditItem';
import DeleteItem from './DeleteItem';

interface Props {
  data: Wallpaper;
  fetch: () => void;
}
const WallpepperAdminItem: FC<Props> = ({ data, fetch }) => {
  return (
    <div className="flex flex-col gap-[38px] relative">
      <Image
        alt=""
        src={`https://hjenbbfgvzkpdwmhjfhq.supabase.co/storage/v1/object/public/wallpepers/${data.artikul}.jpg`}
        width={1441}
        height={1000}
        className="aspect-square object-cover w-full"
      />
      <div className="flex justify-between w-full gap-0">
        <div className="flex flex-col gap-[8px] w-full shrink">
          <p
            color={'black'}
            className="subfont text-[32px] w-full leading-[32px]"
          >
            {data.title}
          </p>
          <Text color={'black'} textSize={'medium'}>
            От {data.price} ₽ / м²
          </Text>
        </div>
        <div className="flex flex-row gap-y-1 gap-x-1 flex-wrap justify-end">
          <EditItem data={data} />
          <DeleteItem id={data.id} onDeleted={fetch} />
        </div>
      </div>
      <div className="w-full flex justify-between p-[10px] top-0 left-0 absolute">
        <DiscountBadge discount={data.discount} />
        <div />
      </div>
    </div>
  );
};

export default WallpepperAdminItem;
