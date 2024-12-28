/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import type { FC } from 'react';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import Section from '@/src/shared/ui/containers/Section';
import WallpappersList from '@/src/widgets/catalogue/WallpappersList';
import Text from '@/src/shared/ui/Text';
import supabase from '@/src/shared/lib/supabaseClient';
import type { Wallpaper } from '@/src/feautres/sidebar-filters/SidebarFilters';

const SearchResults: FC = () => {
  const [filteredData, setFilteredData] = useState<Wallpaper[]>([]); // Initialize with an empty array
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]); // Hold the wallpapers fetched from Supabase
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = searchParams?.get('query') || '';

  // Function to filter wallpapers based on the query
  const filterWallpapers = (query: string) => {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
      setFilteredData(wallpapers); // Set all wallpapers if no query
      return;
    }

    const filtered = wallpapers.filter((wallpaper) => {
      const valuesToSearch = [
        wallpaper.title,
        wallpaper.collections,
        wallpaper.color,
        wallpaper.roomTypes,
        wallpaper.styles,
        wallpaper.subjects,
      ];

      return valuesToSearch.some(
        (value) => value && value.toLowerCase().includes(lowerQuery), // Add null check
      );
    });

    setFilteredData(filtered); // Set filtered wallpapers
  };

  // Fetch wallpapers on initial mount and whenever the query changes
  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('wallpapers').select('*');
        if (error) throw error;

        setWallpapers(data || []); // Store fetched wallpapers
        setFilteredData(data || []); // Set initial filtered data to all wallpapers
      } catch {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchWallpapers();
  }, []); // This effect will only run on component mount

  // Apply the filter whenever the query changes
  useEffect(() => {
    filterWallpapers(query);
  }, [query, wallpapers]); // This effect runs whenever `query` or `wallpapers` changes

  // If there was an error, show the error message
  if (error) return <div>{error}</div>;

  return (
    <Section className="min-h-screen mt-[50px]" text={'Результаты поиска:'}>
      {filteredData.length > 0 ? (
        <WallpappersList data={filteredData} isLoading={loading} />
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
