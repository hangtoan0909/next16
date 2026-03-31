'use client';

import React from 'react';

import HomeIcon from '@/assets/icons/menus/user/home_page.svg';
import HomeActiveIcon from '@/assets/icons/menus/user/home_page_active.svg';
import ProfileIcon from '@/assets/icons/menus/user/profile.svg';
import ProfileActiveIcon from '@/assets/icons/menus/user/profile_active.svg';
import ReservationIcon from '@/assets/icons/menus/user/reservation_list.svg';
import ReservationActiveIcon from '@/assets/icons/menus/user/reservation_list_active.svg';
import { ROUTER_PATH } from '@/constants';

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

type MenuConfig = {
  key: string;
  label: string;
  Active?: IconComponent;
  Inactive?: IconComponent;
};

export const USER_MENUS: MenuConfig[] = [
  {
    key: ROUTER_PATH.USER.HOME,
    label: 'user.menus.home',
    Active: HomeActiveIcon,
    Inactive: HomeIcon,
  },
  {
    key: ROUTER_PATH.USER.RESERVATION,
    label: 'user.menus.reservation',
    Active: ReservationActiveIcon,
    Inactive: ReservationIcon,
  },
  {
    key: ROUTER_PATH.USER.PROFILE,
    label: 'user.menus.profile',
    Active: ProfileActiveIcon,
    Inactive: ProfileIcon,
  },
];
