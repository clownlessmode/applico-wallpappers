import type { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = async ({ children }) => {
  return (
    <main className="w-full max-w-[95.625rem] flex flex-col gap-[9.375rem] mx-auto pt-[50px]">
      {children}
    </main>
  );
};

export default Layout;
