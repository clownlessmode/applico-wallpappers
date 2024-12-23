import type { FC } from 'react';

import type { Wallpaper } from '@/src/feautres/sidebar-filters/SidebarFilters';

import WallpepperItem from './WallpepperItem';
interface Props {
  data: Wallpaper[];
}
const WallpappersList: FC<Props> = ({ data }) => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3  gap-[23px] min-h-screen">
      {data.map((item, index) => (
        <WallpepperItem data={item} key={index} />
      ))}
    </section>
  );
};

export default WallpappersList;
