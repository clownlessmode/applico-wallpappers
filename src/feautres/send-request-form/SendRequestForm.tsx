'use client';
/* eslint-disable no-undef */
// import { ArrowUpRight } from 'lucide-react';
// import type { FC } from 'react';
// import Link from 'next/link';

// import { Input } from '@/src/shared/ui/input';
// import { Button } from '@/src/shared/ui/button';
// import { cn } from '@/src/shared/lib/utils';
// import { Checkbox } from '@/src/shared/ui/checkbox';

// const SendRequestForm: FC = () => {
//   return (
//     <form className="flex flex-col gap-[10px]">
//       <Input placeholder="Ваше имя" className="rounded-none h-[74px]" />
//       <Input
//         placeholder="+7 (999) 999-99-99"
//         className="rounded-none h-[74px]"
//       />
//       <Input
//         placeholder="Ваш бюджет на покупку"
//         className="rounded-none h-[74px]"
//       />

//       <div className="flex items-center gap-2 flex-row mt-[24px]">
//         <Checkbox />
//         <p className="text-background/40 text-[18px] leading-[20px]">
//           Я принимаю условия{' '}
//           <Link href={'privacy-policy'} className="underline">
//             политики конфиденциальности
//           </Link>
//         </p>
//       </div>
//       <Button variant={'light'} className="w-fit mt-[24px]">
//         <div
//           className={cn(
//             'rounded-full flex text-background items-center justify-center w-[38.95px] h-[38.95px]',
//             'bg-background text-foreground',
//           )}
//         >
//           <ArrowUpRight />
//         </div>
//         Оставить заявку
//       </Button>
//     </form>
//   );
// };

// export default SendRequestForm;
import { ArrowUpRight } from 'lucide-react';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import Link from 'next/link';

import { Input } from '@/src/shared/ui/input';
import { Button } from '@/src/shared/ui/button';
import { cn } from '@/src/shared/lib/utils';
import { Checkbox } from '@/src/shared/ui/checkbox';

const SendRequestForm: FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!acceptedPrivacy) {
      alert('Please accept the privacy policy.');
      return;
    }

    const formData = {
      name,
      phone,
      budget,
    };

    try {
      // Отправка данных на сервер для обработки и отправки в Telegram
      const response = await fetch('/api/bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Заявка отправлена!');
      } else {
        alert('Ошибка отправки заявки.');
      }
    } catch {
      alert('Ошибка при отправке заявки.');
    }
  };
  const handleCheckboxClick = () => {
    setAcceptedPrivacy((prev) => !prev); // Переключение состояния
  };

  return (
    <form className="flex flex-col gap-[10px]" onSubmit={handleSubmit}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше имя"
        className="rounded-none h-[74px]"
      />
      <Input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+7 (999) 999-99-99"
        className="rounded-none h-[74px]"
      />
      <Input
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Ваш бюджет на покупку"
        className="rounded-none h-[74px]"
      />

      <div className="flex items-center gap-2 flex-row mt-[24px]">
        <Checkbox
          checked={acceptedPrivacy}
          onClick={handleCheckboxClick} // Используем обработчик кликов
        />
        <p className="text-background/40 text-[18px] leading-[20px]">
          Я принимаю условия{' '}
          <Link href={'privacy-policy'} className="underline">
            политики конфиденциальности
          </Link>
        </p>
      </div>

      <Button variant={'light'} className="w-fit mt-[24px]" type="submit">
        <div
          className={cn(
            'rounded-full flex text-background items-center justify-center w-[38.95px] h-[38.95px]',
            'bg-background text-foreground',
          )}
        >
          <ArrowUpRight />
        </div>
        Оставить заявку
      </Button>
    </form>
  );
};

export default SendRequestForm;
