export enum SORT {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ROLE {
  USER = 'user',
  SYSTEM_ADMIN = 'admin',
  INSPECTION = 'inspection',
}

export const USER_TYPE_OPTIONS = [
  {
    label: 'options.partner_type.inspection',
    value: 1,
  },
];

export enum ADMIN_INSPECTION_STATUS {
  PENDING = 1,
  ACTIVE = 2,
  REJECTED = 3,
  SUSPENDED = 4,
  WITHDRAWN = 5,
}

export enum ADMIN_INSPECTION_TYPE {
  INSPECTION = 1,
  CAR_CENTER = 2,
}

export const ADMIN_INSPECTION_STATUS_OPTIONS = [
  {
    label: 'options.partner_status.pending',
    value: ADMIN_INSPECTION_STATUS.PENDING,
  },
  {
    label: 'options.partner_status.active',
    value: ADMIN_INSPECTION_STATUS.ACTIVE,
  },
  {
    label: 'options.partner_status.rejected',
    value: ADMIN_INSPECTION_STATUS.REJECTED,
  },
  {
    label: 'options.partner_status.suspended',
    value: ADMIN_INSPECTION_STATUS.SUSPENDED,
  },
  {
    label: 'options.partner_status.withdrawn',
    value: ADMIN_INSPECTION_STATUS.WITHDRAWN,
  },
];

export const INSPECTION_PROXY_AREA_OPTIONS = [
  { value: '3', label: '3km' },
  { value: '5', label: '5km' },
  { value: '10', label: '10km' },
];
