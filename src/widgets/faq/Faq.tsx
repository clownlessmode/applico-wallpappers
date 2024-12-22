import type { FC } from 'react';
import React from 'react';

import Title from '@/src/shared/ui/Title';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/shared/ui/accordion';

const items = [
  {
    title: 'Что такое обои ручной отрисовки?',
    content:
      'Это дизайнерские обои, которые нарисованы художником, доработаны с помощью дизайнерских программ и выложены в каталог для последующей печати на плоттере.',
  },
  {
    title: 'Какой максимальный размер бесшовных обоев может быть?',
    content:
      'Размер обоев без шва ограничен шириной (высотой) рулона, который по одной из сторон не может превышать 318 см, а по другой 1000 см. Если у заказчика нет задачи разделить полотно на отдельные фрагменты, то мы печатаем обои без шва в указанных параметрах.',
  },
  {
    title: 'Какой размер обоев может быть?',
    content:
      'Размер обоев задаете вы сами, исходя из вашей задачи и проекта. Также вы сможете задать количество полотен и место шва или стыка.',
  },
  {
    title: 'Какой клей необходимо использовать?',
    content:
      'Для поклейки обоев на флизелиновой основе необходимо применять клей для флизелиновых обоев. А для фактуры «Папирус» - клей для стеклообоев.',
  },
  {
    title: 'Каким образом производятся обои на фактуре Оро, Бронз и Ардженто?',
    content:
      'Обои на этих фактурах печатаются также как и для других фактур, те места, которые должны блестеть – не запечатываются краской.',
  },
  {
    title: 'Можно ли заменить цвет фона изображения под свою задачу?',
    content:
      'Можно менять цвет фона или цвет деталей изображения. Артикулы, в которых начинаются с Vr (варианты фона). Цвет фона меняется бесплатно. Остальные изображения изменяются за дополнительную плату, стоимость указана в прейскуранте производителя.',
  },
  {
    title: 'Какой срок изготовления обоев?',
    content:
      'Как правило, срок производства после оплаты и утверждения эскиза и ЦВП – 5-7 рабочих дней.',
  },
  {
    title: 'Где находится производство?',
    content: 'Россия, Москва, с 2006 года.',
  },
  {
    title: 'Возможен ли самовывоз или доставка в другой город?',
    content:
      'Мы можем оказать услугу по доставке вашего заказа до транспортной компании и отправить в ваш город по заранее переданным вами данным или вы сможете сами забрать обои с нашего склада.',
  },
  {
    title:
      'Возможно ли заказать печать своего изображения, не из вашего каталога?',
    content:
      'Мы можем напечатать любое изображение, но вы должны соблюдать авторское право. Также Наша компания возьмет дополнительную плату за обработку вашего изображения.',
  },
  {
    title: 'Как ухаживать за обоями?',
    content:
      'Обои можно протирать влажной мягкой тканью, следует обращаться бережно, не мочить. Больше информации об уходе и эксплуатации обоев размещено на сайте.',
  },
  {
    title: 'Являются ли ваши обои безвредными?',
    content:
      'Обои производятся из экологичных материалов, и печатаются безвредными интерьерными красками, что позволяет применять обои в жилых помещениях и общественных зданиях.',
  },
  {
    title: 'Сколько времени можно хранить обои в свернутом виде в тубусе?',
    content: 'Как правило не более 3-6-ти месяцев с даты производства.',
  },
  {
    title: 'При производстве обоев вы их рисуете или печатаете?',
    content: 'Обои производятся с помощью цифрового широкоформатного плоттера.',
  },
  {
    title: 'Можно ли использовать ваши обои в детской комнате?',
    content:
      'Обои абсолютно безвредны, и могут быть использованы в любом помещении.',
  },
  {
    title: 'Можно ли использовать ваши обои во влажном помещении?',
    content:
      'В линейке наших оригинальных фактур имеется фактура «Папирус», это 100% тканный полиестр, который можно применять во влажных помещениях и на фасадах.',
  },
  {
    title:
      'Как можно дополнительно защитить обои от вредных воздействий окружающей среды?',
    content:
      'Вы можете дополнительно покрыть обои бесцветным лаком на водной основе, разбавив лак с водой в пропорции 50/50, и прокатать в разные стороны полусухим валиком лак по всей плоскости ваших обоев.',
  },
  {
    title: 'В каком городе я могу купить ваши обои?',
    content: 'В любом, но информация о местах продаж – находится в разработке.',
  },
  {
    title: 'Какая форма оплаты за обои у вас есть?',
    content: 'Безналичная.',
  },
  {
    title: 'Отличается ли стоимость обоев в разных городах?',
    content: 'Стоимость обоев в любом городе и у любого Партнера одинаковая.',
  },
  {
    title: 'В каком виде вы отгружаете обои?',
    content: 'Обои отгружаются в рулоне в защитной пленке упакованные в тубус.',
  },
];

const Faq: FC = () => {
  return (
    <section className="w-full flex gap-[30px]" id="faq">
      <div className="bg-foreground p-[50px] h-full w-full flex flex-col">
        <Title color="#FCFAF7">Отвечаем на частые вопросы</Title>
        <Accordion type="single" collapsible className="mt-[43px]">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`${index}`}
              className="bg-background mt-[20px] px-[20px] py-[29px]"
            >
              <AccordionTrigger className="subfont text-[30px] leading-[25px]">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-[16px] leading-[20px]">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
