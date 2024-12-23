import type { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = async ({ children }) => {
  return (
    <main className="w-full max-w-[95.625rem] flex flex-col md:gap-[9.375rem] gap-[6.375rem] mx-auto pt-[50px]">
      {children}
    </main>
  );
};

export default Layout;
