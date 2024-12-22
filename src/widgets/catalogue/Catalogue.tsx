'use client';
import type { FC } from 'react';
import React, { useState } from 'react';

import Title from '@/src/shared/ui/Title';

import SidebarFilters from '../../feautres/sidebar-filters/SidebarFilters';
import WallpappersList from './WallpappersList';
import wallpapers from './wallpappers';

const Catalogue: FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [filteredData, setFilteredData] = useState(wallpapers);

  const toggleItem = (id: number) => {
    setOpenItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const handleFilterChange = (newFilteredData: typeof wallpapers) => {
    setFilteredData(newFilteredData);
  };

  return (
    <div className="min-h-screen flex flex-col gap-[30px]">
      <Title>Каталог</Title>
      <aside className="flex gap-[55px]">
        <SidebarFilters
          openItems={openItems}
          toggleItem={toggleItem}
          setOpenItems={setOpenItems}
          onFilterChange={handleFilterChange}
          wallpapers={wallpapers}
        />
        <WallpappersList data={filteredData} />
      </aside>
    </div>
  );
};

export default Catalogue;
