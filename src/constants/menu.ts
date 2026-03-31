import { ROUTER_PATH } from './router-paths';

export const USER_MENU_PUBLIC = [
  { key: 'inspection_center', label: 'menus.inspection_center' },
  { key: 'inspection_center_near_me', label: 'menus.inspection_center_near_me' },
  { key: 'car_center_near_me', label: 'menus.car_center_near_me' },
  { key: 'terms_and_policies', label: 'menus.term_and_policies' },
];

export const USER_MENU_PRIVATE = [
  { key: 'reservation_history', label: 'menus.my_reservation_history' },
  { key: ROUTER_PATH.USER.MY_VEHICLE, label: 'menus.my_vehicle' },
];

export const USER_MENU_PROFILES = [
  {
    key: 'edit_my_info',
    label: 'menus.edit_my_info',
  },
  ...USER_MENU_PRIVATE,
];
