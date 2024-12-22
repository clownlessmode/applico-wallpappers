'use client';

import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import type { FC } from 'react';

import { useFavoritesStore } from '@/src/shared/stores/useFavoriteStore';

import type { Wallpaper } from '../sidebar-filters/SidebarFilters';

interface AddToFavoritesProps {
  wallpaper: Wallpaper;
}

const AddToFavorites: FC<AddToFavoritesProps> = ({ wallpaper }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();
  const isInFavorites = isFavorite(wallpaper.id); // Проверяем, есть ли обои в избранном

  // Обработчик клика
  const handleToggleFavorite = () => {
    if (isInFavorites) {
      removeFromFavorites(wallpaper.id);
    } else {
      addToFavorites(wallpaper);
    }
  };

  return (
    <motion.button
      onClick={handleToggleFavorite}
      className="bg-background h-[45px] w-[45px] text-[12px] flex items-center justify-center rounded-full text-foreground"
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{
          scale: isInFavorites ? [1, 1.3, 1] : 1,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      >
        <Heart
          strokeWidth={1}
          fill={isInFavorites ? '#221F20' : 'rgba(0,0,0,0)'}
        />
      </motion.div>
    </motion.button>
  );
};

export default AddToFavorites;
