'use client';
import type { FC } from 'react';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import Section from '@/src/shared/ui/containers/Section';
import WallpappersList from '@/src/widgets/catalogue/WallpappersList';
import wallpapers from '@/src/widgets/catalogue/wallpappers';
import Text from '@/src/shared/ui/Text';

const SearchResults: FC = () => {
  const [filteredData, setFilteredData] = useState(wallpapers);
  const searchParams = useSearchParams();

  const query = searchParams?.get('query') || '';

  const filterWallpapers = (query: string) => {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
      setFilteredData(wallpapers);
      return;
    }

    const filtered = wallpapers.filter((wallpaper) => {
      const valuesToSearch = [
        wallpaper.title,
        wallpaper.collection,
        wallpaper.color,
        wallpaper.roomType,
        wallpaper.style,
        wallpaper.subject,
      ];

      return valuesToSearch.some((value) =>
        value.toLowerCase().includes(lowerQuery),
      );
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterWallpapers(query);
  }, [query]);

  return (
    <Section className="min-h-screen mt-[50px]" text={'Результаты поиска:'}>
      {filteredData.length > 0 ? (
        <WallpappersList data={filteredData} />
      ) : (
        <Text color={'black'} textSize={'large'}>
          Ничего не найдено...
        </Text>
      )}
    </Section>
  );
};

const SearchPage: FC = () => {
  return (
    <Suspense
      fallback={
        <Text color="black" textSize="large" className="opacity-50">
          Загрузка...
        </Text>
      }
    >
      <SearchResults />
    </Suspense>
  );
};

export default SearchPage;
