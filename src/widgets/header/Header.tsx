'use client';
import { ArrowUpRight, Heart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation'; // Импортируем usePathname

import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
// import Search from '@/src/feautres/search/Search';
import { cn } from '@/src/shared/lib/utils';
import Text from '@/src/shared/ui/Text';

import links from './links';

const Header: FC = () => {
  const pathname = usePathname(); // Получаем текущий путь
  const isFavoritesPage = pathname === '/favorites'; // Проверяем, находится ли пользователь на странице каталога

  const [scrolled, setScrolled] = useState(isFavoritesPage);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для бургер-меню

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
    <div className="fixed w-screen top-0 z-10 mx-auto flex items-center justify-center h-[5.875rem] max-w-screen">
      <motion.header
        className={cn(
          'fixed w-screen lg:px-[50px] md:px-5 sm:px-4 px-3 top-0 py-[50px] pt-[100px] flex items-center justify-between h-[5.875rem] max-w-[95.625rem]',
        )}
        initial={{
          opacity: 0,
          y: -20,
          backgroundColor: 'rgba(252, 250, 247, 0)', // Прозрачное состояние через RGBA
          paddingTop: '100px',
        }}
        animate={{
          opacity: 1,
          y: 0,
          backgroundColor: scrolled
            ? 'rgba(252, 250, 247, 1)'
            : 'rgba(252, 250, 247, 0)', // Прозрачный цвет через RGBA
          paddingTop: scrolled ? '50px' : '100px', // Плавное изменение paddingTop
        }}
        transition={{
          duration: 0.5,
          backgroundColor: { type: 'tween', ease: 'easeInOut', duration: 0.5 }, // Анимация фона
          paddingTop: { type: 'tween', ease: 'easeInOut', duration: 0.5 }, // Анимация paddingTop
        }}
      >
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              'transition-all',
              scrolled ? 'text-foreground' : 'text-background',

              isMenuOpen ? 'z-30 absolute text-foreground' : '',
            )}
          >
            {!isMenuOpen ? <Menu size={24} /> : <X size={24} />}
          </button>
        </div>
        {/* Навигация для больших экранов */}
        <nav className="hidden lg:flex gap-[1.875rem]">
          {links.map((item) => (
            <Link
              onClick={() => setIsMenuOpen(false)}
              href={item.href}
              key={`${item.href} - ${item.title}`}
              className={cn(
                'hover:opacity-50 transition-opacity',
                scrolled ? 'text-foreground' : 'text-background',
              )}
            >
              <Text textSize={'medium'} color={scrolled ? 'black' : 'white'}>
                {item.title}
              </Text>
            </Link>
          ))}
        </nav>
        <div className="flex gap-[40px] items-center">
          <div className="hidden lg:flex gap-[20px] items-center">
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
          </div>

          {/* Поиск, избранное и кнопка, видны на всех экранах */}
          <div className="flex gap-[20px] items-center">
            {/* <Search scrolled={scrolled} /> */}
            <Input className="hidden" />
            <Link href={'favorites'}>
              <Heart
                strokeWidth={1.5}
                className={scrolled ? 'text-foreground' : 'text-background'}
              />
            </Link>
          </div>

          {/* Бургер-меню для экранов меньше 1200px */}
        </div>

        {/* Бургер-меню (при открытии) */}
        {isMenuOpen && (
          <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-white z-20 flex flex-col justify-between items-start py-5 lg:px-[50px] md:px-5 sm:px-4 px-3">
            <nav className="flex flex-col gap-5 mt-[120px]">
              {links.map((item) => (
                <Link
                  href={item.href}
                  key={`${item.href} - ${item.title}`}
                  className={cn(
                    'text-background hover:text-foreground transition-opacity',
                    scrolled ? 'text-foreground' : 'text-background',
                  )}
                >
                  <Text textSize={'medium'} color={'black'}>
                    {item.title}
                  </Text>
                </Link>
              ))}
            </nav>
            <Link
              href={'tel:+79999999999'}
              className={cn(
                'text-background hover:text-foreground transition-all',
              )}
            >
              <Text
                textSize={'medium'}
                color={'black'}
                className="opacity-40 hover:opacity-100"
              >
                +7 (999) 999-99-99
              </Text>
            </Link>
          </div>
        )}
      </motion.header>
    </div>
  );
};

export default Header;
