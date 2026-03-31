import Axios from 'axios';
import { createApiClient } from './api-client';
import { setupRequestInterceptor } from './interceptors/request';
import { setupResponseInterceptor } from './interceptors/response';

// Internal API (Next.js API routes)
export const nextApiClient = Axios.create({
  baseURL: '/api',
  timeout: 3 * 60 * 1000,
  withCredentials: true,
});
setupRequestInterceptor(nextApiClient);
setupResponseInterceptor(nextApiClient);

// External API (backend server)
export const backendApiClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 3 * 60 * 1000,
  withCredentials: true,
  paramsSerializer: (params) => {
    const cleanParams: Record<string, string> = {};

    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        cleanParams[key] = String(value);
      }
    });

    return new URLSearchParams(cleanParams).toString();
  },
});

setupRequestInterceptor(backendApiClient);
setupResponseInterceptor(backendApiClient);

export const nextApi = createApiClient(nextApiClient);
export const backendApi = createApiClient(backendApiClient);
