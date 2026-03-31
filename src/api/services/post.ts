import { backendApi } from '@/api/axios';

export const getPosts = (params: unknown) =>
  backendApi.get<unknown, unknown>('https://66b0310d6a693a95b538097a.mockapi.io/users', params);
