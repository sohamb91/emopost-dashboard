import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React, { useState } from 'react';

import Sidebar from '@/components/Sidebar';

const DashboardLayout = (props: PropsWithChildren) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  return (
    <aside
      className={classNames({
        sticky: true,
        'grid min-h-screen': true,
        'grid-cols-sidebar': !collapsed,
        'grid-cols-sidebar-collapsed': collapsed,
        'transition-[grid-template-columns] duration-30 ease-in-out': true,
      })}
    >
      {/* sidebar */}
      <div className="bg-primary">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
        />
      </div>
      {/* content */}
      <div className="flex"> {props.children}</div>
    </aside>
  );
};

export { DashboardLayout };
