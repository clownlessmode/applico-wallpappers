import React from 'react';

interface Props {
  discount: number;
}
const DiscountBadge: React.FC<Props> = ({ discount }) => {
  if (discount == 0) return <div />;

  return (
    <div className="bg-foreground h-[45px] w-[45px] text-[12px] flex items-center justify-center rounded-full text-background">
      {discount}%
    </div>
  );
};

export default DiscountBadge;
