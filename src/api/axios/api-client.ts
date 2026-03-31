import { AxiosInstance, AxiosRequestConfig } from 'axios';

export const createApiClient = (instance: AxiosInstance) => ({
  get<ReqType, ResType>(url: string, params?: ReqType): Promise<ResType> {
    return instance.get(url, { params });
  },

  post<ReqType, ResType>(url: string, data?: ReqType, config?: AxiosRequestConfig<ReqType>): Promise<ResType> {
    return instance.post(url, data, config);
  },

  put<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType> {
    return instance.put(url, data);
  },

  patch<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType> {
    return instance.patch(url, data);
  },

  delete<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType> {
    return instance.delete(url, { data });
  },
});
