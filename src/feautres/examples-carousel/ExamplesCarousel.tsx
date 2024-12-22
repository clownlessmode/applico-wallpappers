'use client';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/src/shared/ui/carousel';

const items = [
  'https://applico.ru/upload/iblock/51d/vvqfz32jvjos2h2plkdcudaotzzca0qs.jpg',
  'https://applico.ru/upload/iblock/657/jvynldfjufgfeptpf2p3pkcenp66s21t.jpeg',
  'https://applico.ru/upload/iblock/945/8uay2w6m8q318zti6nsrwrjcis61vmry.png',
  'https://applico.ru/upload/iblock/f7b/0y9iyfzje3dmt47i5yw54avkdj4pqaks.jpg',
];

const ExamplesCarousel: FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative mx-auto w-full">
      <Carousel
        setApi={setApi}
        className="w-full relative overflow-hidden"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="border border-background/20">
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <div>
                <Image
                  height={500}
                  width={1430}
                  src={item}
                  alt={`Image ${index + 1}`}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          {items.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                current === idx + 1 ? 'bg-background' : 'bg-background/50'
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default ExamplesCarousel;
