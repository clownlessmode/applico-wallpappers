'use client';
import React, { useState, useEffect } from 'react';
import type { Dispatch, FC, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronUp, SearchIcon } from 'lucide-react';

import { Input } from '@/src/shared/ui/input';
import filters from '@/src/widgets/catalogue/filters';
import { Checkbox } from '@/src/shared/ui/checkbox';
import Text from '@/src/shared/ui/Text';

// Типы для фильтров и обоев
// interface FilterItem {
//   value: string;
//   title: string;
// }

// interface Filter {
//   id: number;
//   title: string;
//   data: FilterItem[];
// }

export interface Wallpaper {
  id: string;
  title: string;
  collection: string;
  color: string;
  roomType: string;
  style: string;
  subject: string;
  price: number;
  imageUrl: string;
}

interface FilterState {
  collections: string[];
  colors: string[];
  roomTypes: string[];
  styles: string[];
  subjects: string[];
}

interface Props {
  openItems: number[];
  toggleItem: (id: number) => void;
  setOpenItems: Dispatch<SetStateAction<number[]>>;
  onFilterChange: (filteredData: Wallpaper[]) => void;
  wallpapers: Wallpaper[];
}

const SidebarFilters: FC<Props> = ({
  openItems,
  toggleItem,
  wallpapers,
  onFilterChange,
}) => {
  // Состояние для поискового запроса
  const [searchQuery, setSearchQuery] = useState('');

  // Состояние для активных фильтров
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    collections: [],
    colors: [],
    roomTypes: [],
    styles: [],
    subjects: [],
  });

  // Функция для обновления фильтров
  const updateFilter = (category: keyof FilterState, value: string) => {
    setActiveFilters((prev) => {
      const updatedFilters = { ...prev };
      const currentValues = updatedFilters[category];

      if (currentValues.includes(value)) {
        updatedFilters[category] = currentValues.filter((v) => v !== value);
      } else {
        updatedFilters[category] = [...currentValues, value];
      }

      return updatedFilters;
    });
  };

  // Функция фильтрации обоев
  const filterWallpapers = () => {
    let filtered = [...wallpapers];

    // Фильтрация по поисковому запросу
    if (searchQuery) {
      filtered = filtered.filter((wallpaper) =>
        wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Фильтрация по коллекциям
    if (activeFilters.collections.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.collections.includes(wallpaper.collection),
      );
    }

    // Фильтрация по цветам
    if (activeFilters.colors.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.colors.includes(wallpaper.color),
      );
    }

    // Фильтрация по типам помещений
    if (activeFilters.roomTypes.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.roomTypes.includes(wallpaper.roomType),
      );
    }

    // Фильтрация по стилям
    if (activeFilters.styles.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.styles.includes(wallpaper.style),
      );
    }

    // Фильтрация по сюжетам
    if (activeFilters.subjects.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.subjects.includes(wallpaper.subject),
      );
    }

    return filtered;
  };

  // Эффект для обновления отфильтрованных данных
  useEffect(() => {
    const filteredData = filterWallpapers();
    onFilterChange(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, activeFilters]);

  // Получаем значение чекбокса для конкретного фильтра
  const isChecked = (category: keyof FilterState, value: string) => {
    return activeFilters[category].includes(value);
  };

  return (
    <div className="sidebar md:max-w-full gap-[50px] lg:max-w-[300px] bg-foreground w-full p-[28px] h-fit">
      <div className="w-full relative">
        <Input
          className="w-full"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon
          className="absolute right-5 top-4 opacity-20"
          color="#221F20"
        />
      </div>
      <div className="flex flex-col gap-2">
        {filters.map((item) => {
          const isOpen = openItems.includes(item.id);

          return (
            <div key={item.id} className="text-background">
              <motion.button
                className="w-full flex items-center gap-2 cursor-pointer py-4"
                onClick={() => toggleItem(item.id)}
                initial={false}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronUp className="h-4 w-4" />
                </motion.div>
                <Text textSize={'large'}>{item.title}</Text>
              </motion.button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="">
                      {item.title === 'Цвет' ? (
                        <div className="flex flex-wrap gap-2">
                          {item.data.map((color) => (
                            <div
                              key={color.value}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={color.value}
                                className="hidden"
                                checked={isChecked('colors', color.title)}
                                onCheckedChange={() =>
                                  updateFilter('colors', color.title)
                                }
                              />
                              <label
                                htmlFor={color.value}
                                className="text-foreground"
                              >
                                <div
                                  style={{
                                    backgroundColor: color.title,
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '5px',
                                  }}
                                />
                                0
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        item.data.map((filterItem) => (
                          <div
                            key={filterItem.value}
                            className="flex items-center gap-2 mb-2"
                          >
                            <Checkbox
                              id={filterItem.value}
                              className="rounded-[2px] border h-[20px] w-[20px]"
                              checked={isChecked(
                                item.title === 'Коллекции'
                                  ? 'collections'
                                  : item.title === 'Тип помещения'
                                    ? 'roomTypes'
                                    : item.title === 'Стиль'
                                      ? 'styles'
                                      : 'subjects',
                                filterItem.title,
                              )}
                              onCheckedChange={() =>
                                updateFilter(
                                  item.title === 'Коллекции'
                                    ? 'collections'
                                    : item.title === 'Тип помещения'
                                      ? 'roomTypes'
                                      : item.title === 'Стиль'
                                        ? 'styles'
                                        : 'subjects',
                                  filterItem.title,
                                )
                              }
                            />
                            <Text textSize={'medium'}>{filterItem.title}</Text>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarFilters;
