'use client';
import { ArrowUpRight, Heart } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation'; // Импортируем usePathname

import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import Search from '@/src/feautres/search/Search';
import { cn } from '@/src/shared/lib/utils';

import links from './links';

const Header: FC = () => {
  const pathname = usePathname(); // Получаем текущий путь
  const isFavoritesPage = pathname === '/favorites'; // Проверяем, находится ли пользователь на странице каталога

  const [scrolled, setScrolled] = useState(isFavoritesPage);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/favorites') {
        setScrolled(true); // Фиксируем scrolled в true для страницы favorites
      } else if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);
  const isCatalogPage = pathname === '/catalog'; // Проверяем, находится ли пользователь на странице каталога

  return (
    <div className="fixed w-screen top-0  z-10 mx-auto flex items-center justify-center h-[5.875rem] max-w-screen">
      <motion.header
        className={cn(
          'fixed w-screen px-[50px] top-0 py-[50px] pt-[100px] flex items-center justify-between h-[5.875rem] max-w-[95.625rem]',
        )}
        initial={{
          opacity: 0,
          y: -20,
          backgroundColor: 'transparent',
          paddingTop: '100px',
        }}
        animate={{
          opacity: 1,
          y: 0,
          backgroundColor: scrolled ? '#FCFAF7' : 'transparent',
          paddingTop: scrolled ? '50px' : '100px', // Плавное изменение top
        }}
        transition={{
          duration: 0.5,
          backgroundColor: { type: 'tween', ease: 'easeInOut', duration: 0.5 },
          top: { type: 'tween', ease: 'easeInOut', duration: 0.5 }, // Плавное изменение top
        }}
      >
        <nav className="flex gap-[1.875rem]">
          {links.map((item) => (
            <Link
              href={item.href}
              key={`${item.href} - ${item.title}`}
              className={cn(
                'hover:opacity-50 transition-opacity',
                scrolled ? 'text-foreground' : 'text-background',
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex gap-[40px] items-center">
          <Link
            href={'tel:+79999999999'}
            className={cn(
              'opacity-40 hover:opacity-100 hover:scale-[1.03] transition-all',
              scrolled ? 'text-foreground' : 'text-background',
            )}
          >
            +7 (999) 999-99-99
          </Link>
          <Link href={'catalog'}>
            <Button variant={scrolled ? 'dark' : 'light'}>
              <div
                className={cn(
                  'rounded-full flex text-background items-center justify-center w-[38.95px] h-[38.95px]',
                  scrolled
                    ? 'bg-foreground text-background'
                    : 'bg-background text-foreground',
                )}
              >
                <ArrowUpRight />
              </div>
              {isCatalogPage ? 'На главную' : 'В каталог'}
            </Button>
          </Link>
          <div className="flex gap-[20px] items-center">
            <Search scrolled={scrolled} />
            <Input className="hidden" />
            <Link href={'favorites'}>
              <Heart
                strokeWidth={1.5}
                className={scrolled ? 'text-foreground' : 'text-background'}
              />
            </Link>
          </div>
        </div>
      </motion.header>
    </div>
  );
};

export default Header;
