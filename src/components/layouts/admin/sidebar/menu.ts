'use client';

import DashboardIcon from '@/assets/icons/menus/inspection/dashboard.svg';
import DashboardActiveIcon from '@/assets/icons/menus/inspection/dashboard_active.svg';
import MyBusinessIcon from '@/assets/icons/menus/inspection/my_business.svg';
import MyBusinessActiveIcon from '@/assets/icons/menus/inspection/my_business_active.svg';
import ReservationIcon from '@/assets/icons/menus/inspection/reservation.svg';
import ReservationActiveIcon from '@/assets/icons/menus/inspection/reservation_active.svg';
import SettlementIcon from '@/assets/icons/menus/inspection/settlement.svg';
import SettlementActiveIcon from '@/assets/icons/menus/inspection/settlement_active.svg';
import ApprovalIcon from '@/assets/icons/menus/admin/users.svg';
import { ROUTER_PATH } from '@/constants';
import React from 'react';

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

type MenuConfig = {
  key: string;
  label: string;
  Active?: IconComponent;
  Inactive?: IconComponent;
  children?: MenuConfig[];
};

export const INSPECTION_MENUS: MenuConfig[] = [
  {
    key: ROUTER_PATH.INSPECTION.DASHBOARD,
    label: 'menus.inspection.dashboard',
    Active: DashboardActiveIcon,
    Inactive: DashboardIcon,
  },
  {
    key: ROUTER_PATH.INSPECTION.RESERVATION_TASK.ROOT,
    label: 'menus.inspection.reservation_task.title',
    Active: ReservationActiveIcon,
    Inactive: ReservationIcon,
    children: [
      {
        key: ROUTER_PATH.INSPECTION.RESERVATION_TASK.RESERVATION,
        label: 'menus.inspection.reservation_task.reservation',
      },
      {
        key: ROUTER_PATH.INSPECTION.RESERVATION_TASK.AGENCY,
        label: 'menus.inspection.reservation_task.agency',
      },
    ],
  },
  {
    key: ROUTER_PATH.INSPECTION.MY_BUSINESS.ROOT,
    label: 'menus.inspection.my_business.title',
    Active: MyBusinessActiveIcon,
    Inactive: MyBusinessIcon,
    children: [
      {
        key: ROUTER_PATH.INSPECTION.MY_BUSINESS.INFO,
        label: 'menus.inspection.my_business.info',
      },
      {
        key: ROUTER_PATH.INSPECTION.MY_BUSINESS.SERVICE,
        label: 'menus.inspection.my_business.service',
      },
      {
        key: ROUTER_PATH.INSPECTION.MY_BUSINESS.AGENCY,
        label: 'menus.inspection.my_business.agency',
      },
    ],
  },
  {
    key: ROUTER_PATH.INSPECTION.SETTLEMENT.ROOT,
    label: 'menus.inspection.settlement.title',
    Active: SettlementActiveIcon,
    Inactive: SettlementIcon,
    children: [
      {
        key: ROUTER_PATH.INSPECTION.SETTLEMENT.DETAIL,
        label: 'menus.inspection.settlement.detail',
      },
    ],
  },
];

export const SUPER_ADMIN_MENUS: MenuConfig[] = [
  {
    key: ROUTER_PATH.ADMIN.USER.ROOT,
    label: 'menus.admin.heading',
    Active: ApprovalIcon,
    Inactive: ApprovalIcon,
    children: [
      {
        key: ROUTER_PATH.ADMIN.USER.INSPECTION_APPROVAL,
        label: 'menus.admin.inspection_approval',
      },
      {
        key: ROUTER_PATH.ADMIN.USER.INSPECTION_MANAGEMENT,
        label: 'menus.admin.inspection_management',
      },
      {
        key: ROUTER_PATH.ADMIN.USER.USER_MANAGEMENT,
        label: 'menus.admin.user_management',
      },
    ],
  },
];
