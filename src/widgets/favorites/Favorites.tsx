'use client';
import type { FC } from 'react';

import { useFavoritesStore } from '@/src/shared/stores/useFavoriteStore';
import Section from '@/src/shared/ui/containers/Section';

import WallpappersList from '../catalogue/WallpappersList';

const Favorites: FC = () => {
  const { favorites: FAV } = useFavoritesStore();

  return (
    <Section className="min-h-screen mt-[100px]" text={'Избранное'}>
      <div className="mt-[50px]">
        <WallpappersList data={FAV} />
      </div>
    </Section>
  );
};

export default Favorites;
