import type { FC } from 'react';

import Hero from '@/src/widgets/hero/Hero';
import Usefulness from '@/src/widgets/usefulness/Usefulness';
import Examples from '@/src/widgets/examples/Examples';
import Reviews from '@/src/widgets/reviews/Reviews';
import SendRequest from '@/src/widgets/send-request/SendRequest';
import Faq from '@/src/widgets/faq/Faq';

const Home: FC = () => {
  return (
    <>
      <Hero
        title={
          <>
            Обои ручной отрисовки
            <br />в Санкт-Петербурге
          </>
        }
      />
      <Usefulness />
      <Examples />
      <Reviews />
      <SendRequest />
      <Faq />
    </>
  );
};
export default Home;
