'use client';
import type { FC } from 'react';
import React, { useState } from 'react';

import Text from '@/src/shared/ui/Text';
import { Dialog, DialogContent, DialogTrigger } from '@/src/shared/ui/dialog';

import AddForm from './AddForm';

const AddItem: FC = () => {
  const [open, setOpen] = useState(false); // Состояние для открытия/закрытия модалки

  // Функция для открытия модалки
  const handleOpen = () => setOpen(true);

  // Функция для закрытия модалки
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Управляем состоянием модалки */}
      <DialogTrigger asChild>
        <button
          className="text-[14px] border border-foreground w-full h-[43px] bg-background rounded-full hover:scale-105 transition-all mb-3"
          onClick={handleOpen} // Открываем модалку при клике
        >
          <Text color={'black'}>Добавить</Text>
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[500px] px-[50px] py-[141px] flex flex-col items-start justify-start ">
        <AddForm onSuccess={handleClose} />
        {/* Передаем функцию для закрытия модалки в AddForm */}
      </DialogContent>
    </Dialog>
  );
};

export default AddItem;
