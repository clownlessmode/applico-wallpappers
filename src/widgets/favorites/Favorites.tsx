'use client';
import type { FC } from 'react';

import Title from '@/src/shared/ui/Title';
import { useFavoritesStore } from '@/src/shared/stores/useFavoriteStore';

import WallpappersList from '../catalogue/WallpappersList';

const Favorites: FC = () => {
  const { favorites: FAV } = useFavoritesStore();

  return (
    <section className="h-[5000px] mt-[100px]">
      <Title>Избранное</Title>
      <div className="mt-[50px]">
        <WallpappersList data={FAV} />
      </div>
    </section>
  );
};

export default Favorites;
