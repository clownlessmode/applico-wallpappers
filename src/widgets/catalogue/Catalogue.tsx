'use client';
import type { FC } from 'react';
import React, { useState } from 'react';

import Title from '@/src/shared/ui/Title';
import Section from '@/src/shared/ui/containers/Section';

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
    <Section className="min-h-screen">
      <Title>Каталог</Title>
      <aside className="flex gap-[55px] flex-col-reverse lg:flex-row">
        <SidebarFilters
          openItems={openItems}
          toggleItem={toggleItem}
          setOpenItems={setOpenItems}
          onFilterChange={handleFilterChange}
          wallpapers={wallpapers}
        />
        <WallpappersList data={filteredData} />
      </aside>
    </Section>
  );
};

export default Catalogue;
