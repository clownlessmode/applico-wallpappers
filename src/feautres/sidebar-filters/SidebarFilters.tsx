/* eslint-disable indent */
'use client';
import React, { useState, useEffect } from 'react';
import type { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronUp, SearchIcon } from 'lucide-react';

import { Input } from '@/src/shared/ui/input';
import filters from '@/src/widgets/catalogue/filters';
import { Checkbox } from '@/src/shared/ui/checkbox';
import Text from '@/src/shared/ui/Text';

// Define proper types for filter items
interface BaseFilterItem {
  value: string;
  title: string;
}

interface ColorFilterItem extends BaseFilterItem {
  color: string;
}

type FilterItem = BaseFilterItem | ColorFilterItem;

// Type guard to check if item is a ColorFilterItem
function isColorFilterItem(item: FilterItem): item is ColorFilterItem {
  return 'color' in item;
}

export interface Wallpaper {
  id: string;
  artikul: string;
  discount: number;
  title: string;
  collections: string;
  color: string;
  colors: Array<{ title: string; image: string }>;
  metallicColors: string;
  roomTypes: string;
  styles: string;
  subjects: string;
  nature: string;
  properties: string;
  animals: string;
  children: string;
  price: number;
  imageUrl: string;
}

interface FilterState {
  collections: string[];
  colors: string[];
  metallicColors: string[];
  roomTypes: string[];
  styles: string[];
  subjects: string[];
  nature: string[];
  properties: string[];
  animals: string[];
  children: string[];
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    collections: [],
    colors: [],
    metallicColors: [],
    roomTypes: [],
    styles: [],
    subjects: [],
    nature: [],
    properties: [],
    animals: [],
    children: [],
  });

  const updateFilter = (category: keyof FilterState, title: string) => {
    setActiveFilters((prev) => {
      const updatedFilters = { ...prev };
      const currentValues = updatedFilters[category];

      if (currentValues.includes(title)) {
        updatedFilters[category] = currentValues.filter((v) => v !== title);
      } else {
        updatedFilters[category] = [...currentValues, title];
      }

      return updatedFilters;
    });
  };

  const handleColorClick = (
    e: React.MouseEvent,
    category: 'colors' | 'metallicColors',
    title: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    updateFilter(category, title);
  };

  const filterWallpapers = () => {
    let filtered = [...wallpapers];

    if (searchQuery) {
      filtered = filtered.filter((wallpaper) =>
        wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Фильтрация по коллекциям
    if (activeFilters.collections.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.collections.includes(wallpaper.collections),
      );
    }

    // Фильтрация по цветам
    if (activeFilters.colors.length > 0) {
      filtered = filtered.filter(
        (wallpaper) => activeFilters.colors.includes(String(wallpaper.color)), // Приводим к строке
      );
    }

    // Фильтрация по металлизированным цветам
    if (activeFilters.metallicColors.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.metallicColors.includes(wallpaper.metallicColors),
      );
    }

    // Фильтрация по типам помещений
    if (activeFilters.roomTypes.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.roomTypes.includes(wallpaper.roomTypes),
      );
    }

    // Фильтрация по стилям
    if (activeFilters.styles.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.styles.includes(wallpaper.styles),
      );
    }

    // Фильтрация по сюжетам
    if (activeFilters.subjects.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.subjects.includes(wallpaper.subjects),
      );
    }

    // Фильтрация по природе
    if (activeFilters.nature.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.nature.includes(wallpaper.nature),
      );
    }

    // Фильтрация по свойствам
    if (activeFilters.properties.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.properties.includes(wallpaper.properties),
      );
    }

    // Фильтрация по животным
    if (activeFilters.animals.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.animals.includes(wallpaper.animals),
      );
    }

    // Фильтрация по детским
    if (activeFilters.children.length > 0) {
      filtered = filtered.filter((wallpaper) =>
        activeFilters.children.includes(wallpaper.children),
      );
    }

    return filtered;
  };

  useEffect(() => {
    const filteredData = filterWallpapers();
    onFilterChange(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, activeFilters]);

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
                <Text className="text-left" textSize={'medium'}>
                  {item.title}
                </Text>
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
                      {item.title === 'Цвет' ||
                      item.title === 'Металлизированные цвета' ? (
                        <div className="flex flex-wrap gap-2">
                          {item.data.map((filterItem) => {
                            if (isColorFilterItem(filterItem)) {
                              const category =
                                item.title === 'Цвет'
                                  ? 'colors'
                                  : 'metallicColors';
                              const isSelected = isChecked(
                                category,
                                filterItem.value,
                              ); // Сравнение с value
                              return (
                                <div
                                  key={filterItem.value}
                                  className="flex flex-col items-center gap-1"
                                  role="button"
                                  tabIndex={0}
                                  onClick={
                                    (e) =>
                                      handleColorClick(
                                        e,
                                        category,
                                        filterItem.value,
                                      ) // Передаем value
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      handleColorClick(
                                        e as unknown as MouseEvent<HTMLDivElement>,
                                        category,
                                        filterItem.value, // Передаем value
                                      );
                                    }
                                  }}
                                >
                                  <div
                                    style={{
                                      backgroundColor: filterItem.color,
                                      width: '30px',
                                      height: '30px',
                                      borderRadius: '5px',
                                      cursor: 'pointer',
                                      scale: isSelected ? '1.02' : '1.00',
                                      border: isSelected
                                        ? '2px solid #fff'
                                        : '0px solid #fff',
                                    }}
                                  />
                                </div>
                              );
                            }
                            return null;
                          })}
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
                                      : item.title === 'Сюжет'
                                        ? 'subjects'
                                        : item.title === 'Природа'
                                          ? 'nature'
                                          : item.title === 'Свойства'
                                            ? 'properties'
                                            : item.title === 'Животные'
                                              ? 'animals'
                                              : 'children',
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
                                        : item.title === 'Сюжет'
                                          ? 'subjects'
                                          : item.title === 'Природа'
                                            ? 'nature'
                                            : item.title === 'Свойства'
                                              ? 'properties'
                                              : item.title === 'Животные'
                                                ? 'animals'
                                                : 'children',
                                  filterItem.title,
                                )
                              }
                            />
                            <Text textSize={'small'}>{filterItem.title}</Text>
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
