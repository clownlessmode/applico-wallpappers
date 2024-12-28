/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/wallpapersService.ts
import supabase from './supabaseClient';

// Тип для фильтров
interface Filter {
  column: string; // Столбец для фильтрации
  type: 'eq' | 'gt' | 'lt' | 'like' | 'ilike' | 'neq'; // Тип фильтра
  value: string | number | boolean | string[]; // Значение для фильтра
}

// Тип для объекта wallpaper
export interface Wallpaper {
  id: string;
  title: string;
  collections: string;
  color: string;
  metallicColors: string;
  roomTypes: string;
  styles: string;
  subjects: string;
  nature: string;
  properties: string;
  animals: string;
  discount: number;
  children: string;
  price: number;
}

export const uploadImage = async (file: File, fileName: string) => {
  const bucket = supabase.storage.from('wallpepers');

  try {
    const { data, error } = await bucket.upload(fileName, file, {
      cacheControl: 'no-cache', // Заголовок, который предотвращает кэширование
      upsert: true,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { data };
  } catch (error: any) {
    return { error };
  }
};

// Получить все обои
export const getAllWallpapers = async (): Promise<{
  data: Wallpaper[];
  error: any;
}> => {
  const { data, error } = await supabase.from('wallpapers').select('*');
  if (error) {
    return { data: [], error };
  }
  return { data, error: null };
};

// Получить обои по определенному фильтру
export const getWallpapersByFilter = async (
  filters: Filter[],
): Promise<{ data: Wallpaper[]; error: any }> => {
  let query = supabase.from('wallpapers').select('*');

  filters.forEach((filter) => {
    if (filter.type === 'eq') {
      query = query.eq(filter.column, filter.value);
    } else if (filter.type === 'gt') {
      query = query.gt(filter.column, filter.value);
    } else if (filter.type === 'lt') {
      query = query.lt(filter.column, filter.value);
    }
    // Добавьте другие фильтры по мере необходимости
  });

  const { data, error } = await query;
  if (error) {
    return { data: [], error };
  }
  return { data, error: null };
};

// Вставить обои
export const addWallpaper = async (
  wallpaper: Wallpaper,
): Promise<{ data: Wallpaper[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('wallpapers')
    .insert([wallpaper])
    .select();
  if (error) {
    return { data: null, error };
  }
  return { data, error: null };
};

// Обновить обои
export const updateWallpaper = async (
  id: string,
  updates: Partial<Wallpaper>,
): Promise<{ data: Wallpaper[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('wallpapers')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) {
    return { data: null, error };
  }
  return { data, error: null };
};

// Удалить обои
export const deleteWallpaper = async (id: string): Promise<{ error: any }> => {
  const { error } = await supabase.from('wallpapers').delete().eq('id', id);
  if (error) {
    return { error };
  }
  return { error: null };
};

// Подписка на изменения в таблице
export const subscribeToWallpapersChanges = (
  callback: (payload: any) => void,
) => {
  const channels = supabase
    .channel('wallpapers-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'wallpapers' },
      (payload) => {
        callback(payload);
      },
    )
    .subscribe();

  return channels;
};
