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
      className="flex flex-col gap-[10px]"
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
            className="rounded-none h-[74px]"
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
            className="rounded-none h-[74px]"
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
            className="rounded-none h-[74px]"
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
            className="rounded-none h-[74px]"
          />
        )}
      />

      <div className="mt-4 space-y-4">
        <p className="text-background/40 text-[18px] leading-[20px]">
          Выберите способ доставки
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Controller
            name="deliveryMethod"
            control={control}
            render={({ field }) => (
              <>
                <RadioCard
                  {...field}
                  value="pickup"
                  checked={field.value === 'pickup'}
                  label="Самовывоз со склада"
                />
                <RadioCard
                  {...field}
                  value="moscow"
                  checked={field.value === 'moscow'}
                  label="Доставка по г. Москва и МО (1200 ₽ в пределах МКАД, +150 ₽ за км за МКАД)"
                />
                <RadioCard
                  {...field}
                  value="regions"
                  checked={field.value === 'regions'}
                  label="Доставка в регионы РФ (бесплатно до терминала в Москве)"
                />
              </>
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
              className="rounded-none h-[74px]"
            />
          )}
        />
      )}

      <div className="flex items-center gap-2 flex-row mt-[24px]">
        <Controller
          name="acceptedPrivacy"
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <p className="text-background/40 text-[18px] leading-[20px]">
          Нажимая на кнопку «Оформить заказ», вы даете согласие на обработку
          своих персональных данных.
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
        Оформить заказ
      </Button>
    </form>
  );
};

export default BuyForm;
