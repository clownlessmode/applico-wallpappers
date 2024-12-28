'use client';
import type { FC } from 'react';
import React, { useState } from 'react';

import { Dialog, DialogTrigger, DialogContent } from '@/src/shared/ui/dialog';
import Text from '@/src/shared/ui/Text';

import BuyForm from './BuyForm';
import type { Wallpaper } from '../sidebar-filters/SidebarFilters';
interface Props {
  data: Wallpaper;
}
const BuyButton: FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false); // Состояние для открытия/закрытия модалки
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={handleOpen} // Открываем модалку при клике
          className="text-[14px] w-[114px] h-[43px] bg-foreground rounded-full hover:scale-105 transition-all"
        >
          <Text>Купить</Text>
        </button>
      </DialogTrigger>
      <DialogContent className="pt-10">
        <BuyForm onSuccess={handleClose} datas={data} />
      </DialogContent>
    </Dialog>
  );
};

export default BuyButton;
