import type { FC } from 'react';
import React from 'react';

import Section from '@/src/shared/ui/containers/Section';
import Text from '@/src/shared/ui/Text';

const items = [
  {
    title: 'Экспертность',
    description:
      'Наши сотрудники с профильным образованием, регулярно повышающие квалификацию',
  },
  {
    title: 'Индивидуальный подход',
    description:
      'Каждый заказ индивидуален. Персональный менеджер, который будет с вами 24/7',
  },
  {
    title: 'Быстрый и легкий заказ',
    description:
      'Выбираете обои, способ оплаты и доставки, после через 3-5 рабочих дня они у вас дома',
  },
  {
    title: 'Эффективность',
    description: 'Мы дорожим вашим временем и работаем на результат',
  },
  {
    title: 'Выгодная цена',
    description:
      'Производим эксклюзивные дизайнерские обои по ценам, ниже известных европейских брендов',
  },
  {
    title: 'Гарантия качества',
    description:
      'Мы отвечаем за качество наших услуг - если недовольны результатом, то вернем 100% стоимости',
  },
];

const Usefulness: FC = () => {
  return (
    <Section id="about_company" text="Наши ценности">
      <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-[30px]">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-[48px] border border-foreground/20 p-[40px]"
          >
            <div className="flex flex-col gap-[39px] w-full">
              <h3 className="subfont text-[40px] leading-[28px]">
                {item.title}
              </h3>
              <Text className="opacity-60" color={'black'} textSize={'large'}>
                {item.description}
              </Text>
            </div>
            <Text
              textSize={'large'}
              color={'black'}
              className="shrink-0 border border-foreground/20 rounded-full flex items-center justify-center h-[58px] w-[58px]"
            >
              0{index + 1}
            </Text>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Usefulness;
