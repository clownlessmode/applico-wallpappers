'use client';
import { AnimatePresence, motion } from 'motion/react';
import { SearchIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Для переноса на другую страницу
import type { FC, FormEvent } from 'react';

import { Input } from '@/src/shared/ui/input';
import { cn } from '@/src/shared/lib/utils';

interface Props {
  scrolled?: boolean;
}

const Search: FC<Props> = ({ scrolled }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Закрыть поиск при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Обработчик отправки формы или нажатия кнопки
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${query}`);
      setIsVisible(false);
    }
  };

  return (
    <div ref={searchRef}>
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        aria-label="Показать поиск"
        className={cn(
          'flex items-center justify-center',
          scrolled ? 'text-foreground' : 'text-background',
        )}
      >
        <SearchIcon strokeWidth={1.5} />
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
              backgroundColor: 'rgba(252, 250, 247, 0)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundColor: scrolled
                ? 'rgba(252, 250, 247, 1)'
                : 'rgba(252, 250, 247, 0)',
              top: scrolled ? '100px' : '150px',
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              backgroundColor: {
                type: 'tween',
                ease: 'easeInOut',
                duration: 0.5,
              },
            }}
            className="absolute left-0 w-full pb-[20px] z-20 flex justify-center px-[50px]"
          >
            <form
              onSubmit={handleSubmit}
              className="relative w-full max-w-[95.625rem]"
            >
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск..."
                className="w-full pr-10"
              />
              <button
                type="submit"
                aria-label="Поиск"
                className="absolute opacity-20 right-10 top-1/2 transform -translate-y-1/2"
              >
                <SearchIcon strokeWidth={1.5} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
