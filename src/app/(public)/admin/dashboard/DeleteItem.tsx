/* eslint-disable no-console */
/* eslint-disable no-undef */
import type { FC } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';

import Text from '@/src/shared/ui/Text';
import { deleteWallpaper } from '@/src/shared/lib/wallpapers.service';

interface DeleteItemProps {
  id: string; // Идентификатор элемента, который нужно удалить
  onDeleted?: () => void; // Коллбек для обновления интерфейса после удаления
}

const DeleteItem: FC<DeleteItemProps> = ({ id }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const { error } = await deleteWallpaper(id); // Вызов функции удаления
    if (error) {
      console.error('Ошибка при удалении элемента:', error);
      alert('Не удалось удалить элемент. Попробуйте снова.');
    } else {
      alert('Элемент успешно удалён!');
      router.refresh();
    }
  };

  return (
    <div>
      <button
        className="text-[14px] w-[114px] h-[43px] bg-foreground rounded-full hover:scale-105 transition-all"
        onClick={handleDelete} // Привязка обработчика
      >
        <Text>Удалить</Text>
      </button>
    </div>
  );
};

export default DeleteItem;
