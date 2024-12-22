import type { FC } from 'react';
import React from 'react';

import Title from '@/src/shared/ui/Title';

const items = [
  {
    title: 'Экрспертность',
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
    <section className="flex flex-col gap-[50px]" id="about_company">
      <Title>Наши ценности</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-[72px] border border-foreground/20 p-[40px]"
          >
            <div className="flex flex-col gap-[39px] w-full">
              <h3 className="subfont text-[40px] leading-[28px]">
                {item.title}
              </h3>
              <p className="text-[22px] text-foreground/60">
                {item.description}
              </p>
            </div>
            <div className="shrink-0 border border-foreground/20 rounded-full flex items-center justify-center h-[58px] w-[58px]">
              0{index + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Usefulness;
