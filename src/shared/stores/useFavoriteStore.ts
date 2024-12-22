// store/useFavoritesStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Wallpaper } from '@/src/feautres/sidebar-filters/SidebarFilters';

interface FavoritesState {
  favorites: Wallpaper[];
  addToFavorites: (wallpaper: Wallpaper) => void;
  removeFromFavorites: (wallpaperId: string) => void;
  isFavorite: (wallpaperId: string) => boolean;
}

export const useFavoritesStore = create(
  persist<FavoritesState>(
    (set, get) => ({
      favorites: [],

      addToFavorites: (wallpaper) =>
        set((state) => ({
          favorites: [...state.favorites, wallpaper],
        })),

      removeFromFavorites: (wallpaperId) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== wallpaperId),
        })),

      isFavorite: (wallpaperId) =>
        get().favorites.some((item) => item.id === wallpaperId),
    }),
    {
      name: 'favorites-storage', // Ключ для сохранения в localStorage
    },
  ),
);
