'use client';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import type { Wallpaper } from '@/src/feautres/sidebar-filters/SidebarFilters';
import SidebarFilters from '@/src/feautres/sidebar-filters/SidebarFilters';
import supabase from '@/src/shared/lib/supabaseClient';
import Section from '@/src/shared/ui/containers/Section';
import Title from '@/src/shared/ui/Title';

import AddItem from './AddItem';
import WallpappersAdminList from './WallpappersAdminList';

const Catalogue: FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]); // Исходные данные
  const [filteredData, setFilteredData] = useState<Wallpaper[]>([]); // Отфильтрованные данные
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Переключение открытых фильтров
  const toggleItem = (id: number) => {
    setOpenItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };
  const fetchWallpapers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('wallpapers').select('*');
      if (error) throw error;

      setWallpapers(data || []); // Сохраняем исходные данные
      setFilteredData(data || []); // Инициализация фильтрованных данных
    } catch {
      setError('Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };
  // Загрузка данных из Supabase
  useEffect(() => {
    fetchWallpapers();
  }, []);

  // Если произошла ошибка при загрузке данных
  if (error) return <div>{error}</div>;

  return (
    <Section className="min-h-screen">
      <Title>Админ каталог</Title>
      <aside className="flex gap-[55px] flex-col lg:flex-row">
        <div className="lg:sticky lg:top-[120px] self-start lg:w-fit w-full">
          <AddItem />
          <SidebarFilters
            openItems={openItems}
            toggleItem={toggleItem}
            setOpenItems={setOpenItems}
            onFilterChange={setFilteredData} // Передаем функцию для обновления фильтрованных данных
            wallpapers={wallpapers} // Передаем исходные данные
          />
        </div>
        <WallpappersAdminList
          data={filteredData}
          isLoading={loading}
          fetch={fetchWallpapers}
        />
      </aside>
    </Section>
  );
};
export default Catalogue;
