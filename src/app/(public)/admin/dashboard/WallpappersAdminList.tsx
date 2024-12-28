/* eslint-disable indent */
import type { FC } from 'react';

import type { Wallpaper } from '@/src/feautres/sidebar-filters/SidebarFilters';

import WallpepperAdminItem from './Wallpepperadminitem';

interface Props {
  data: Wallpaper[];
  isLoading: boolean;
  fetch: () => void;
}
const Skeleton: FC = () => {
  return (
    <div className="animate-pulse w-full bg-gray-300 h-[450px] rounded-lg"></div>
  );
};
const WallpappersAdminList: FC<Props> = ({ data, isLoading, fetch }) => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-[23px] min-h-screen">
      {/* Если данные загружаются, показываем скелетоны */}
      {isLoading
        ? Array(30)
            .fill(0) // Создаем массив из 30 элементов
            .map((_, index) => <Skeleton key={index} />) // Отображаем 30 скелетонов
        : data.map((item, index) => (
            <WallpepperAdminItem data={item} key={index} fetch={fetch} />
          ))}
    </section>
  );
};

export default WallpappersAdminList;
