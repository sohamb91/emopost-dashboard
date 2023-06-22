// components/Sidebar.tsx
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import cn from 'classnames';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import { StoreContext } from '@/store/StoreContext';
import { defaultNavItems } from '@/utils/Mocks';

// 👇 props to get and set the collapsed state from parent component
type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
};
const Sidebar = ({ collapsed, setCollapsed }: Props) => {
  // 👇 use the correct icon depending on the state.
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  const router = useRouter();

  const { state: { workSpaces: { selectedWorkSpaceId = '' } = {} } = {} } =
    useContext(StoreContext);

  return (
    <div
      className={cn({
        'bg-primary text-zinc-50 z-20': true,
      })}
    >
      <div
        className={cn({
          'flex flex-col justify-between': true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={cn({
            'flex items-center flex-col': true,
            'p-4 justify-between': !collapsed,
            'py-4 justify-center': collapsed,
          })}
        >
          {/* {!collapsed && <span className="whitespace-nowrap">My Logo</span>} */}
          <button
            type="button"
            className={cn({
              'grid place-content-center text-white': true, // position
              'hover:bg-accent ': true, // colors
              'w-10 h-10 rounded-full': true, // shape
              'absolute -right-0 top-0': true,
            })}
            // 👇 set the collapsed state on click
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="h-5 w-5" />
          </button>
          <nav className="mt-12 w-full">
            <ul
              className={classNames({
                'my-2 flex flex-col gap-2 items-stretch': true,
              })}
            >
              {defaultNavItems?.map((item, index) => {
                return (
                  <li
                    key={`nav-item-${index}`}
                    className={classNames({
                      'text-white hover:bg-accent flex cursor-pointer': true,
                      'trransition-colors duration-300': true,
                      'rounded-md p-2 mx-3 gap-4': !collapsed,
                      'rounded-full p-2 mx-3 w-10 h-10': collapsed,
                      'no-underline hover:no-underline': true,
                    })}
                    onClick={() =>
                      router.push(
                        item?.href === '/calendar'
                          ? `${item?.href}/${selectedWorkSpaceId}`
                          : item?.href
                      )
                    }
                    role="button"
                    onKeyDown={() =>
                      router.push(
                        item?.href === '/calendar'
                          ? `${item?.href}/${selectedWorkSpaceId}`
                          : item?.href
                      )
                    }
                  >
                    <p
                      className="flex gap-2 text-white no-underline hover:no-underline"
                      style={{ textDecoration: 'none' }}
                    >
                      {item?.icon}{' '}
                      <span className="no-underline hover:no-underline">
                        {!collapsed && item?.label}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
