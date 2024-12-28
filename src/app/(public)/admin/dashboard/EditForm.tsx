'use client';

import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/ui/select';
import { Label } from '@/src/shared/ui/label';
import { Button } from '@/src/shared/ui/button';
import type { Wallpaper } from '@/src/feautres/sidebar-filters/SidebarFilters';
import { Input } from '@/src/shared/ui/input';
import {
  updateWallpaper,
  uploadImage,
} from '@/src/shared/lib/wallpapers.service';

type FormInputs = {
  artikul: string;
  collections: string;
  color: string;
  metallicColor: string;
  roomTypes: string;
  styles: string;
  subjects: string;
  nature: string;
  properties: string;
  animals: string;
  children: string;
  image?: FileList;
};
interface Props {
  data: Wallpaper;
  onSuccess: () => void; // Проп для закрытия модалки
}

const EditForm: FC<Props> = ({ data, onSuccess }) => {
  const { control, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      artikul: data.artikul || '',
      animals: data.animals || '',
      children: data.children || '',
      collections: data.collections || '',
      color: data.color || '',
      metallicColor: data.metallicColors || '',
      nature: data.nature || '',
      properties: data.properties || '',
      roomTypes: data.roomTypes || '',
      styles: data.styles || '',
      subjects: data.subjects || '',
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const updates = {
      artikul: formData.artikul,
      collections: formData.collections,
      color: formData.color,
      metallicColors: formData.metallicColor,
      roomTypes: formData.roomTypes,
      styles: formData.styles,
      subjects: formData.subjects,
      nature: formData.nature,
      properties: formData.properties,
      animals: formData.animals,
      children: formData.children,
    };

    if (formData.image && formData.image.length > 0) {
      const file = formData.image[0]; // Получаем выбранный файл
      const fileName = `${formData.artikul}.jpg`; // Формируем имя файла на основе артикула

      // Загружаем новое изображение в Supabase Storage
      const { error: uploadError } = await uploadImage(file, fileName);

      if (uploadError) {
        return; // Если ошибка при загрузке изображения, прерываем процесс
      }
    }

    // Отправляем обновленные данные в базу
    const { error } = await updateWallpaper(data.id, updates);

    if (!error) {
      onSuccess(); // Можно добавить логику для показа уведомления об успешном обновлении
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div className="flex flex-col gap-1">
        <Label htmlFor="image">Изображение</Label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files)}
              className="h-[36px]"
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="id">Артикул</Label>
        <Controller
          name="artikul"
          control={control}
          render={({ field }) => (
            <Input
              onChange={field.onChange}
              defaultValue={field.value}
              className="h-[36px]"
            />
          )}
        />
      </div>
      <div>
        <Label htmlFor="collection">Коллекции</Label>
        <Controller
          name="collections"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите коллекцию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Коллекция ONE">Коллекция ONE</SelectItem>
                <SelectItem value="Коллекция TWO">Коллекция TWO</SelectItem>
                <SelectItem value="Коллекция THREE">Коллекция THREE</SelectItem>
                <SelectItem value="Коллекция FOUR">Коллекция FOUR</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label htmlFor="color">Цвет</Label>
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={String(field.value || '')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите цвет" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Светлые</SelectItem>
                <SelectItem value="2">Тёмные</SelectItem>
                <SelectItem value="3">Чёрно-белые</SelectItem>
                <SelectItem value="4">Голубые</SelectItem>
                <SelectItem value="5">Жёлтые</SelectItem>
                <SelectItem value="6">Зелёные</SelectItem>
                <SelectItem value="7">Красные</SelectItem>
                <SelectItem value="8">Оранжевые</SelectItem>
                <SelectItem value="9">Серебряные</SelectItem>
                <SelectItem value="10">Синие</SelectItem>
                <SelectItem value="11">Фиолетовые</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label htmlFor="metallicColor">Металлизированные цвета</Label>
        <Controller
          name="metallicColor"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите металлизированный цвет" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Золото</SelectItem>
                <SelectItem value="2">Серебро</SelectItem>
                <SelectItem value="3">Бронза</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label htmlFor="roomType">Тип помещения</Label>
        <Controller
          name="roomTypes"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип помещения" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Ванная</SelectItem>
                <SelectItem value="2">Гостинная</SelectItem>
                <SelectItem value="3">Детская</SelectItem>
                <SelectItem value="4">Кабинет</SelectItem>
                <SelectItem value="5">Кухня</SelectItem>
                <SelectItem value="6">На потолок</SelectItem>
                <SelectItem value="7">Прихожая</SelectItem>
                <SelectItem value="8">Спальня</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label htmlFor="style">Стиль</Label>
        <Controller
          name="styles"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите стиль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">3D</SelectItem>
                <SelectItem value="2">Абстракция</SelectItem>
                <SelectItem value="3">Ар-деко (современное)</SelectItem>
                <SelectItem value="4">Арт</SelectItem>
                <SelectItem value="5">Геометрия</SelectItem>
                <SelectItem value="6">Графика</SelectItem>
                <SelectItem value="7">Китайские</SelectItem>
                <SelectItem value="8">Классика</SelectItem>
                <SelectItem value="9">Лофт</SelectItem>
                <SelectItem value="10">Минимализм</SelectItem>
                <SelectItem value="11">Прованс</SelectItem>
                <SelectItem value="12">Современные</SelectItem>
                <SelectItem value="13">Шинуазри</SelectItem>
                <SelectItem value="14">Японский</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label htmlFor="subject">Сюжет</Label>
        <Controller
          name="subjects"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите сюжет" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Космос</SelectItem>
                <SelectItem value="2">Линии</SelectItem>
                <SelectItem value="3">Перья</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label htmlFor="nature">Природа</Label>
        <Controller
          name="nature"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите природный элемент" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Весна</SelectItem>
                <SelectItem value="2">Вода</SelectItem>
                <SelectItem value="3">Водопад</SelectItem>
                <SelectItem value="4">Город</SelectItem>
                <SelectItem value="5">Горы</SelectItem>
                <SelectItem value="6">Джунгли</SelectItem>
                <SelectItem value="7">Зеленые листья</SelectItem>
                <SelectItem value="8">Лес</SelectItem>
                <SelectItem value="9">Листья</SelectItem>
                <SelectItem value="10">Листья пальмы</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label htmlFor="properties">Свойства</Label>
        <Controller
          name="properties"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите свойство" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Бесшовные</SelectItem>
                <SelectItem value="2">На стену</SelectItem>
                <SelectItem value="3">Флизелиновые</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label htmlFor="animals">Животные</Label>
        <Controller
          name="animals"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите животное" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Журавли</SelectItem>
                <SelectItem value="2">Олень</SelectItem>
                <SelectItem value="3">Птицы</SelectItem>
                <SelectItem value="4">С живностью</SelectItem>
                <SelectItem value="5">Фламинго</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label htmlFor="children">Детские</Label>
        <Controller
          name="children"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип детских обоев" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Для девочек</SelectItem>
                <SelectItem value="2">Для мальчиков</SelectItem>
                <SelectItem value="3">Для подростка</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <Button type="submit" className="w-full" variant={'dark'}>
        Обновить
      </Button>
    </form>
  );
};

export default EditForm;
