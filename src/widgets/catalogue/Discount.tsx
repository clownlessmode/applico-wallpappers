import React from 'react';

const getRandomDiscount = (): number => {
  const possibleValues = [0, 15, 20, 50];
  return possibleValues[Math.floor(Math.random() * possibleValues.length)];
};

const DiscountBadge: React.FC = () => {
  const discount = getRandomDiscount();

  if (discount === 0) return <div />;

  return (
    <div className="bg-foreground h-[45px] w-[45px] text-[12px] flex items-center justify-center rounded-full text-background">
      {discount}%
    </div>
  );
};

export default DiscountBadge;
