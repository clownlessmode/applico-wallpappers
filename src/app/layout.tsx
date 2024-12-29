import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
// eslint-disable-next-line import/order
import type { FC, ReactNode } from 'react';

import './globals.css';
import { Analytics } from '@vercel/analytics/react';

import { cn } from '@/src/shared/lib/utils';
import Footer from '@/src/widgets/footer/Footer';

import Header from '../widgets/header/Header';

export const metadata: Metadata = {
  metadataBase: new URL('https://applico-wallpappers.vercel.app/'), // Указываем базовый URL
  title: 'Дизайнерские обои и фрески ручной отрисовки в Санкт-Петербурге',
  description:
    'Эксклюзивные дизайнерские обои и фрески ручной работы в Санкт-Петербурге. Уникальные авторские дизайны для интерьера. Закажите сейчас!',
  keywords: [
    'дизайнерские обои',
    'фрески ручной работы',
    'обои Санкт-Петербург',
    'авторские обои',
    'уникальные обои для интерьера',
    'фрески для стен',
    'эксклюзивный интерьер',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Дизайнерские обои и фрески ручной отрисовки в Санкт-Петербурге',
    description:
      'Создайте неповторимую атмосферу в вашем доме с помощью наших дизайнерских обоев и фресок ручной работы. Работаем в Санкт-Петербурге и по всей России.',
    url: 'https://applico-wallpappers.vercel.app/',
    siteName: 'Дизайнерские обои и фрески ручной отрисовки в Санкт-Петербурге',
    images: [
      {
        url: '/assets/og-image.png', // Путь будет дополнен базовым URL
        width: 835,
        height: 638,
        alt: 'Дизайнерские обои и фрески',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const ardeco = localFont({
  src: [
    {
      path: '../../public/fonts/Ardeco.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-title',
});

const snell = localFont({
  src: [
    {
      path: '../../public/fonts/SnellRoundhand.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-first-letter',
});

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased flex flex-col text-[18px] leading-[22.3px] font-normal tracking-[-1.27px]',
          inter.variable,
          ardeco.variable,
          snell.variable,
        )}
      >
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
};
export default RootLayout;
