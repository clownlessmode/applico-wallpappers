/* eslint-disable indent */
import type { FC } from 'react';

import type { Wallpaper } from '@/src/feautres/sidebar-filters/SidebarFilters';

import WallpepperItem from './WallpepperItem';
interface Props {
  data: Wallpaper[];
  isLoading: boolean;
}
const Skeleton: FC = () => {
  return (
    <div className="animate-pulse w-full bg-gray-300 h-[450px] rounded-lg"></div>
  );
};
const WallpappersList: FC<Props> = ({ data, isLoading }) => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-[23px] min-h-screen">
      {/* Если данные загружаются, показываем скелетоны */}
      {isLoading
        ? Array(30)
            .fill(0) // Создаем массив из 30 элементов
            .map((_, index) => <Skeleton key={index} />) // Отображаем 30 скелетонов
        : data.map((item, index) => (
            <WallpepperItem data={item} all={data} key={index} />
          ))}
    </section>
  );
};

export default WallpappersList;
