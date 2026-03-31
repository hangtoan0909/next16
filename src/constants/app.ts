export const THEME_CONFIG = {
  colors: {
    primary: '#1677ff',
    secondary: '#52c41a',
    error: '#ff4d4f',
    warning: '#faad14',
    info: '#1677ff',
    success: '#52c41a',
  },
  breakpoints: {
    xs: 480,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
  },
} as const;

export const LOCALE = {
  EN: 'en',
  KR: 'kr',
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  THEME: 'theme',
  LANGUAGE: 'language',
  NEXT_LOCALE: 'NEXT_LOCALE',
  SNS_PROVIDER: 'sns_provider',
  USER_NEED_PROFILE: 'user_need_profile',
} as const;

export enum SNS_PROVIDER {
  GOOGLE = 'google',
  KAKAO = 'kakao',
  NAVER = 'naver',
}

export const PAGINATION_DEFAULT = {
  PAGE: 1,
  PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 1000000,
};

export const PAGINATION_PARAMS_DEFAULT = {
  page: PAGINATION_DEFAULT.PAGE,
  limit: PAGINATION_DEFAULT.PAGE_SIZE,
};

export const PAGINATION_PARAMS_MAX = {
  page: PAGINATION_DEFAULT.PAGE,
  size: PAGINATION_DEFAULT.MAX_PAGE_SIZE,
};

export const DEFAULT_MAX_IMAGE_SIZE = 5;

export const DEFAULT_MAX_FILE_SIZE = 50;
