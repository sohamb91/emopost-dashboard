import type { PropsWithChildren } from 'react';
import React from 'react';

import Header from '@/components/Header';

const CommonLayout = (props: PropsWithChildren) => {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <section className="flex-1 px-12 py-4">
        <div>{props?.children}</div>
      </section>
      <footer className="bg-gray-100 p-4">
        <div className="text-center text-sm text-gray-500">
          © <span id="year">2023</span> Joyverse Innovation Labs Inc. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

export { CommonLayout };
