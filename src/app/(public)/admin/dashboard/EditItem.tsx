import type { FC } from 'react';
import React, { useState } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/src/shared/ui/dialog';
import Text from '@/src/shared/ui/Text';
import type { Wallpaper } from '@/src/feautres/sidebar-filters/SidebarFilters';

import EditForm from './EditForm';

interface Props {
  data: Wallpaper;
}

const EditItem: FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false); // Состояние для открытия/закрытия модалки

  // Функция для открытия модалки
  const handleOpen = () => setOpen(true);

  // Функция для закрытия модалки
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={handleOpen} // Открываем модалку при клике
          className="text-[14px] border border-foreground w-full h-[43px] bg-background rounded-full hover:scale-105 transition-all mb-3"
        >
          <Text color={'black'}>Изменить</Text>
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[500px] px-[50px] py-[141px] flex flex-col items-start justify-start">
        <EditForm data={data} onSuccess={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default EditItem;
