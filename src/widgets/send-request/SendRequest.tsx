import type { FC } from 'react';
import Image from 'next/image';

import Title from '@/src/shared/ui/Title';

import SendRequestForm from '../../feautres/send-request-form/SendRequestForm';

const SendRequest: FC = () => {
  return (
    <section className="w-full flex gap-[30px] h-[900px]" id="request">
      <div className="bg-foreground p-[50px] h-full w-full flex flex-col">
        <Title color="#FCFAF7">
          ОСТАВЬТЕ ЗАЯВКУ И ПОЛУЧИТЕ КОНСУЛЬТАЦИЮ НАШЕГО ЭКСПЕРТА
        </Title>
        <p className="text-background/40 text-[18px] leading-[20px]">
          На консультации мы обсудим, какие обои подойдут
          <br />
          под ваш ремонт и все оставшиеся вопросы
        </p>
        <SendRequestForm />
      </div>
      <Image
        alt="1"
        src={
          'https://applico.ru/upload/iblock/657/jvynldfjufgfeptpf2p3pkcenp66s21t.jpeg'
        }
        width={750}
        height={879}
        className="w-[750px] h-full object-cover"
      />
    </section>
  );
};

export default SendRequest;
