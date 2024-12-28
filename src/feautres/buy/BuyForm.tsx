/* eslint-disable no-console */
/* eslint-disable no-undef */
'use client';

import type { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/src/shared/lib/utils';
import { Input } from '@/src/shared/ui/input';
import { Button } from '@/src/shared/ui/button';
import { Checkbox } from '@/src/shared/ui/checkbox';
import Text from '@/src/shared/ui/Text';

import { RadioCard } from './RadioCard';
import type { Wallpaper } from '../sidebar-filters/SidebarFilters';

interface FormData {
  name: string;
  phone: string;
  email: string;
  deliveryMethod: 'pickup' | 'moscow' | 'regions';
  address: string;
  comment: string;
  acceptedPrivacy: boolean;
}

interface Props {
  onSuccess: () => void;
  datas: Wallpaper;
}

const BuyForm: FC<Props> = ({ onSuccess, datas }) => {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      deliveryMethod: 'pickup',
      acceptedPrivacy: false,
    },
  });

  const deliveryMethod = watch('deliveryMethod');

  const onSubmit = async (data: FormData) => {
    if (!data.acceptedPrivacy) {
      alert('Пожалуйста, примите условия политики конфиденциальности.');
      return;
    }

    // Добавляем артикул и заголовок в данные для отправки
    const payload = {
      ...data,
      artikul: datas.artikul, // предполагается, что `datas` доступен в области видимости
      title: datas.title,
    };

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Заказ отправлен!');
        onSuccess();
      } else {
        alert('Ошибка отправки заказа.');
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      alert('Ошибка при отправке заказа.');
    }
  };

  return (
    <form
      className="flex flex-col gap-[10px] mt-[50px] max-h-[calc(100vh-100px)] overflow-y-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Ваше имя*"
            className="rounded-none h-[44px] placeholder:text-[16px] pl-3"
          />
        )}
      />
      <Controller
        name="phone"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="+7 (XXX) XXX-XX-XX*"
            className="rounded-none h-[44px] placeholder:text-[16px] pl-3"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Ваш email*"
            className="rounded-none h-[44px] placeholder:text-[16px] pl-3"
          />
        )}
      />
      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Добавить комментарий"
            className="rounded-none h-[44px] placeholder:text-[16px] pl-3"
          />
        )}
      />

      <div className="mt-4 space-y-2">
        <Text color={'black'}>Выберите способ доставки</Text>
        <div className="">
          <Controller
            name="deliveryMethod"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <RadioCard
                  {...field}
                  value="pickup"
                  checked={field.value === 'pickup'}
                  title="Самовывоз со склада"
                  address="г. Москва, ул. Смирновская, д. 25, стр. 1"
                  cost="0"
                />
                <RadioCard
                  {...field}
                  value="moscow"
                  checked={field.value === 'moscow'}
                  title="Доставка по г. Москва и МО"
                  address="г. Москва и Московская область В пределах МКАД — 1200 руб. за МКАД — 1200 руб. + 150 руб. за 1 км."
                  cost="1200"
                />
                <RadioCard
                  {...field}
                  value="regions"
                  checked={field.value === 'regions'}
                  title="Доставка в регионы РФ"
                  address="Доставка до терминала транспортной компании в г. Москве осуществляется бесплатно (ПЭК, Байкал-Сервис, Деловые Линии, СДЭК)."
                  cost="0"
                />
              </div>
            )}
          />
        </div>
      </div>

      {(deliveryMethod === 'moscow' || deliveryMethod === 'regions') && (
        <Controller
          name="address"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Адрес доставки*"
              className="rounded-none h-[44px] placeholder:text-[16px] pl-3"
            />
          )}
        />
      )}

      <div className="flex items-center gap-2 flex-row mt-[8px]">
        <Controller
          name="acceptedPrivacy"
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="bg-foreground"
            />
          )}
        />
        <Text color={'black'} className="opacity-40">
          Нажимая на кнопку «Оформить заказ», вы даете согласие на обработку
          своих персональных данных.
        </Text>
      </div>

      <Button variant={'dark'} className="w-full" type="submit">
        <div
          className={cn(
            'rounded-full flex text-background items-center justify-center w-[38.95px] h-[38.95px]',
            'bg-background text-foreground',
          )}
        >
          <ArrowUpRight />
        </div>
        Оформить заказ
      </Button>
    </form>
  );
};

export default BuyForm;
