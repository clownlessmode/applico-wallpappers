'use client';
import type { FC } from 'react';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Title from '@/src/shared/ui/Title';
import ReviewsCarousel from '@/src/feautres/reviews-carousel/ReviewsCarousel';
import type { CarouselApi } from '@/src/shared/ui/carousel';

const Reviews: FC = () => {
  const [api, setApi] = useState<CarouselApi>();

  const scrollPrev = React.useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  const scrollNext = React.useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  return (
    <section className="flex flex-col gap-[50px] relative" id="reviews">
      <div className="flex w-full justify-between">
        <Title>Отзывы покупателей:</Title>
        <div className="flex gap-[20px] text-background">
          <button
            onClick={scrollPrev}
            className="bg-foreground rounded-full h-[57px] w-[57px] flex justify-center items-center cursor-pointer"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={scrollNext}
            className="bg-foreground rounded-full h-[57px] w-[57px] flex justify-center items-center cursor-pointer"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <ReviewsCarousel setApi={setApi} />
    </section>
  );
};

export default Reviews;
