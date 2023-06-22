import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
export const defaultNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',

    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    label: 'Workspaces',
    href: '/workspaces',
    icon: <UserGroupIcon className="h-6 w-6" />,
  },

  {
    label: 'Calendar',
    href: '/calendar',
    icon: <CalendarIcon className="h-6 w-6" />,
  },
];
