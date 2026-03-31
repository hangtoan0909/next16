export const API_ROUTES = {
  AUTH: {
    REFRESH_TOKEN: '/api/auth/refresh-token',
    LOGOUT: '/auth/logout',
  },

  USER: {
    AUTH: {
      SOCIAL_LOGIN: '/auth/social-login',
    },

    ME: '/auth/user/me',

    SIGN_UP: {
      CAR_REGISTRATION: '/auth/user/profile',
      VEHICLE_TYPES: '/reference/vehicle-load-types',
      VERIFY_USER_PHONE: '/auth/verify-user-phone',
    },

    PHONE_EDIT: '/auth/user/phone',

    MY_VEHICLE: {
      LIST: '/vehicle/all-vehicles',
      ADD: '/vehicle/create-vehicle',
      DELETE: (id: string) => `/vehicle/delete-vehicle/${id}`,
      PRIMARY: (id: string) => `/vehicle/update-primary-vehicle/${id}`,
      VERIFY: '/vehicle/external-vehicles',
    },

    INSPECTION_CENTER: {
      NEARBY: '/booking/inspection-centers/nearby',
      DETAIL: '/booking/inspection-centers/detail',
    },
  },

  UPLOAD: {
    IMAGE: '/reference/image/upload',
  },

  INSPECTION: {
    ME: '/auth/inspection/me',

    BANK_LIST: '/reference/bank-name',
    VERIFY_BUSINESS: '/business',
    VERIFY_BANK: '/open-bank',

    AUTH: {
      SIGN_UP: '/auth/inspection/signup',
      SEND_OTP: '/auth/inspection/forgot-password/send-otp',
      VERIFY_OTP: '/auth/inspection/forgot-password/verify-otp',
      RESET_PASSWORD: '/auth/inspection/reset-password',
      SIGN_IN: '/auth/inspection/sign-in',
    },

    MY_BUSINESS: {
      INTRODUCTION: {
        GET: '/inspections/introduction',
        UPDATE: '/inspections/introduction',
        UNION_AFFILIATION: '/inspections/introduction/union-affiliation',
        SPECIALIZATIONS: '/inspections/introduction/specializations',
      },

      BASIC_INFO: {
        GET: '/inspections/information',
        UPDATE: '/inspections/information',
      },

      OPERATION: {
        GET: '/inspections/operation',
        UPDATE: '/inspections/operation',
      },

      SERVICE_MANAGEMENT: {
        GET: '/inspections/service-management',
        UPDATE: '/inspections/service-management',
      },
    },

    AGENCY: {
      GET: '/inspections/agency',
      UPDATE: '/inspections/agency',
    },
  },

  ADMIN: {
    AUTH: {
      SIGN_IN: '/auth/admin/login',
      VERIFY_OTP: '/auth/admin/sign-in',
    },
    INSPECTION: {
      APPROVAL_LIST: '/admin/inspection-approval/approvals',
      DETAIL: (id: number | null) => `admin/inspection-approval/${id}`,
      APPROVAL: (id: number) => `admin/inspection-approval/${id}/status`,
      UPDATE_STATUS: (id: number) => `/admin/inspection-management/${id}/status`,
      LIST: '/admin/inspection-management',
    },
  },
} as const;
