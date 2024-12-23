import { Fragment, type FC, type ReactElement, type ReactNode } from 'react';
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
        backgroundImage: 'url(/assets/hero-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className={cn(
        'w-full text-background py-[30px] flex items-start justify-between flex-col ',
        'lg:px-[50px] ',
        'md:px-5 ',
        'sm:px-4  sm:h-[586px]',
        'px-3 h-[540px]',
      )}
    >
      <div className="invisible" />
      <div className="flex lg:gap-[34px] md:gap-[18px] gap-6 items-start md:items-center flex-col md:flex-row">
        <Title>{title}</Title>
        {description && (
          <div className="flex flex-col lg:gap-[30px] gap-[12px]">
            <Text textSize={'medium'}>
              Более 20 лет на рынке{''} <br className="hidden sm:block" />
              отделочных материалов
            </Text>
            <Link href="catalog" className="sm:block hidden">
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
        <div className="flex md:flex-row sm:flex-nowrap flex-wrap w-full">
          {advantages.map(
            (item, index): ReactElement => (
              <Fragment key={index}>
                <div className="w-full min-w-[180px] sm:max-w-full max-w-[180px] flex flex-col lg:gap-3 md:gap-2 sm:gap-2 gap-1 sm:py-[20px] py-2">
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
                  <div className="w-[1px] mr-[30px] bg-[#5E5D5E]/50 h-[91px] sm:block hidden" />
                ) : null}
              </Fragment>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
