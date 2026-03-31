export const ROUTER_PATH = {
  USER: {
    ROOT: '/user',

    AUTH: {
      BRIDGE: '/bridge',
      SIGN_IN: '/user/sign-in',
      SIGN_UP: '/user/sign-up',
    },

    HOME: '/',
    RESERVATION: '/user/reservation',
    PROFILE: '/user/profile',
    EDIT_INFO: '/user/information',
    MY_VEHICLE: '/user/my-vehicle',

    FIND_A_INSPECTION_CENTER: '/find-a-inspection-center',

    INSPECTION: {
      ROOT: '/inspection-center',
      DETAIL: (id: string | number) => `/inspection-center/${id}`,
      RESERVATION: (id: string | number) => `/inspection-center/${id}/reservation`,
    },
  },

  INSPECTION: {
    ROOT: '/inspection',

    AUTH: {
      SIGN_UP: '/inspection/sign-up',
      SIGN_IN: '/inspection/sign-in',
      RESET_PASSWORD: '/inspection/reset-password',
    },

    DASHBOARD: '/inspection/dashboard',

    RESERVATION_TASK: {
      ROOT: '/inspection/task',
      RESERVATION: '/inspection/task/reservation',
      AGENCY: '/inspection/task/agency',
    },

    MY_BUSINESS: {
      ROOT: '/inspection/my-business',
      INFO: '/inspection/my-business/info',
      SERVICE: '/inspection/my-business/service',
      AGENCY: '/inspection/my-business/agency',
    },

    SETTLEMENT: {
      ROOT: '/inspection/settlement',
      DETAIL: '/inspection/settlement/detail',
    },
  },

  ADMIN: {
    ROOT: '/admin',

    AUTH: {
      SIGN_IN: '/admin/sign-in',
    },

    DASHBOARD: '/admin/dashboard',
    USER: {
      ROOT: '/admin',
      INSPECTION_APPROVAL: '/admin/user/inspection-approval',
      INSPECTION_MANAGEMENT: '/admin/user/inspection-management',
      USER_MANAGEMENT: '/admin/user',
    },
  },
} as const;

export const AUTH_ROUTES = [
  ROUTER_PATH.USER.AUTH.SIGN_IN,
  ROUTER_PATH.INSPECTION.AUTH.SIGN_IN,
  ROUTER_PATH.INSPECTION.AUTH.SIGN_UP,
  ROUTER_PATH.INSPECTION.AUTH.RESET_PASSWORD,
  ROUTER_PATH.ADMIN.AUTH.SIGN_IN,
];

// User Private Link
export const PRIVATE_USER_ROUTES = [
  ROUTER_PATH.USER.PROFILE,
  ROUTER_PATH.USER.RESERVATION,
  ROUTER_PATH.USER.EDIT_INFO,
  ROUTER_PATH.USER.MY_VEHICLE,
] as string[];

// Publish page
export const PUBLIC_ROUTES = [
  ROUTER_PATH.USER.HOME,
  ROUTER_PATH.USER.AUTH.BRIDGE,
  ROUTER_PATH.USER.FIND_A_INSPECTION_CENTER,
  ROUTER_PATH.USER.INSPECTION.ROOT,
];

export const SPECICAL_USER_ROUTES = [ROUTER_PATH.USER.AUTH.SIGN_IN] as string[];
