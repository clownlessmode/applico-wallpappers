import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import Title from '@/src/shared/ui/Title';
import { Button } from '@/src/shared/ui/button';
import { cn } from '@/src/shared/lib/utils';
import Text from '@/src/shared/ui/Text';

const advantages = [
  {
    title: 'От 3 до 5 дней',
    description: 'cрок производства',
  },
  {
    title: '1000+ цветов',
    description: 'подбор под любую палитру',
  },
  {
    title: 'Бесплатный',
    description: 'подбор нашего эксперта',
  },
];
interface Props {
  title: ReactNode;
  description?: boolean;
}

const Hero: FC<Props> = ({ title, description = true }) => {
  return (
    <section
      style={{
        backgroundImage: 'url(/assets/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="lg:px-[50px] md:px-[20px] h-[586px] w-full lg:bg-orange-950 md:bg-orange-900 sm:bg-orange-800 text-background py-[30px] flex items-start justify-between flex-col"
    >
      <div className="invisible" />
      <div className="flex lg:gap-[34px] md:gap-[18px] items-center ">
        <Title>{title}</Title>
        {description && (
          <div className="flex flex-col lg:gap-[30px] md:gap-[15px]">
            <Text textSize={'medium'}>
              Более 20 лет на рынке
              <br />
              отделочных материалов
            </Text>
            <Link href="catalog">
              <Button variant={'light'}>
                <div
                  className={cn(
                    'rounded-full flex text-background items-center justify-center w-[38.95px] h-[38.95px]',
                    'bg-background text-foreground',
                  )}
                >
                  <ArrowUpRight />
                </div>
                В каталог
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="w-full">
        <div className="w-full h-px bg-[#5E5D5E]/50" />
        <div className="flex flex-row w-full">
          {advantages.map((item, index) => (
            <>
              <div className="w-full flex flex-col lg:gap-5 md:gap-4 sm:gap-3 py-[20px]">
                <p className="sr-only">
                  {item.title} - {item.description}
                </p>
                <Text textSize={'large'} color={'white'}>
                  {item.title}
                </Text>
                <Text
                  className="opacity-60"
                  textSize={'medium'}
                  color={'white'}
                >
                  {item.description}
                </Text>
              </div>
              {index != advantages.length - 1 ? (
                <div className="w-[1px] mr-[30px] bg-[#5E5D5E]/50 h-[91px]" />
              ) : null}
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
