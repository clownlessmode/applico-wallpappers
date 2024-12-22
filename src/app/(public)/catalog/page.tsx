import type { FC } from 'react';

import Hero from '@/src/widgets/hero/Hero';
import Catalogue from '@/src/widgets/catalogue/Catalogue';

const Catalog: FC = () => {
  return (
    <>
      <Hero
        title={
          <>
            Дизайнерские обои
            <br />и фрески ручной отрисовки
          </>
        }
        description={false}
      />
      <Catalogue />
    </>
  );
};
export default Catalog;
