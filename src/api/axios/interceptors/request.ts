import { STORAGE_KEYS } from '@/constants';
import { cookies } from '@/utils';
import { AxiosInstance, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';

export const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
      let lang = cookies.get(STORAGE_KEYS.NEXT_LOCALE);
      if (!lang || lang === 'kr') lang = 'ko';
      return {
        ...config,
        headers: {
          ...config.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(lang ? { 'Accept-Language': lang } : {}),
        } as AxiosRequestHeaders,
      };
    },
    (error) => Promise.reject(error)
  );
};
