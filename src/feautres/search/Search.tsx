'use client';
import { AnimatePresence, motion } from 'motion/react';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import type { FC } from 'react';

import { Input } from '@/src/shared/ui/input';
import { cn } from '@/src/shared/lib/utils';

interface Props {
  scrolled?: boolean;
}

const Search: FC<Props> = ({ scrolled }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-[94px] left-0 w-full z-20 flex justify-center px-[50px]"
          >
            <Input
              className="w-full max-w-[95.625rem]"
              placeholder="Поиск..."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
