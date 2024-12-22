import type { FC } from 'react';
import Image from 'next/image';

import Title from '@/src/shared/ui/Title';
import Section from '@/src/shared/ui/containers/Section';
import Text from '@/src/shared/ui/Text';

import SendRequestForm from '../../feautres/send-request-form/SendRequestForm';

const SendRequest: FC = () => {
  return (
    <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-6 md:grid-cols-1">
      <Section
        className="flex-col xl:py-[50px] lg:py-[50px] md:py-5 sm:py-4"
        background={'dark'}
        id={'request'}
      >
        <div className="flex flex-col">
          <Title color="#FCFAF7">
            ОСТАВЬТЕ ЗАЯВКУ
            <br />И ПОЛУЧИТЕ КОНСУЛЬТАЦИЮ НАШЕГО ЭКСПЕРТА
          </Title>
          <Text className="opacity-40" textSize={'medium'}>
            На консультации мы обсудим, какие обои подойдут
            <br />
            под ваш ремонт и все оставшиеся вопросы
          </Text>
        </div>
        <SendRequestForm />
      </Section>
      <Image
        alt="1"
        src={
          'https://applico.ru/upload/iblock/657/jvynldfjufgfeptpf2p3pkcenp66s21t.jpeg'
        }
        width={750}
        height={879}
        className="w-full h-full object-cover xl:block hidden"
      />
    </div>
  );
};

export default SendRequest;
