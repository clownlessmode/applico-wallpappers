'use client';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';

import type { CarouselApi } from '@/src/shared/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/src/shared/ui/carousel';

const items = [
  'https://applico.ru/upload/iblock/51d/vvqfz32jvjos2h2plkdcudaotzzca0qs.jpg',
  'https://applico.ru/upload/iblock/657/jvynldfjufgfeptpf2p3pkcenp66s21t.jpeg',
  'https://applico.ru/upload/iblock/945/8uay2w6m8q318zti6nsrwrjcis61vmry.png',
  'https://applico.ru/upload/iblock/f7b/0y9iyfzje3dmt47i5yw54avkdj4pqaks.jpg',
  'https://applico.ru/upload/iblock/51d/vvqfz32jvjos2h2plkdcudaotzzca0qs.jpg',
  'https://applico.ru/upload/iblock/657/jvynldfjufgfeptpf2p3pkcenp66s21t.jpeg',
  'https://applico.ru/upload/iblock/945/8uay2w6m8q318zti6nsrwrjcis61vmry.png',
  'https://applico.ru/upload/iblock/f7b/0y9iyfzje3dmt47i5yw54avkdj4pqaks.jpg',
  'https://applico.ru/upload/iblock/51d/vvqfz32jvjos2h2plkdcudaotzzca0qs.jpg',
  'https://applico.ru/upload/iblock/657/jvynldfjufgfeptpf2p3pkcenp66s21t.jpeg',
  'https://applico.ru/upload/iblock/945/8uay2w6m8q318zti6nsrwrjcis61vmry.png',
  'https://applico.ru/upload/iblock/f7b/0y9iyfzje3dmt47i5yw54avkdj4pqaks.jpg',
];

interface Props {
  setApi: (api: CarouselApi) => void;
}
const ReviewsCarousel: FC<Props> = ({ setApi }) => {
  return (
    <div className="mx-auto w-full">
      <Carousel
        setApi={setApi}
        className="w-full "
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
          align: 'start',
        }}
      >
        <CarouselContent className="border border-background/20">
          {items.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
              <div className="p-1">
                <Image
                  height={290}
                  width={389}
                  src={item}
                  alt={`Image ${index + 1}`}
                  className="w-full h-[290px] object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ReviewsCarousel;
