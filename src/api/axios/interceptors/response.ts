import { API_ROUTES, RESPONSE_CODE, ROUTER_PATH, STORAGE_KEYS } from '@/constants';
import { useAuthStore } from '@/stores';
import { ResponseData, SignInDataType } from '@/types';
import { cookies } from '@/utils';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

// Định nghĩa kiểu cho các request bị lỗi và cần retry
interface FailedRequest {
  resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void;
  reject: (reason?: AxiosError) => void;
  config: AxiosRequestConfig & { _retry?: boolean; skipAuthRefresh?: boolean };
}

let isRefreshing = false; // Cờ để kiểm tra xem quá trình refresh token đang diễn ra hay không
let failedRequestsQueue: Array<FailedRequest> = []; // Hàng đợi các request bị lỗi 401

export const setupResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
        skipAuthRefresh?: boolean;
      };

      // Không refresh cho các request public như login, signup, otp verify...
      if (originalRequest.skipAuthRefresh) {
        return Promise.reject(error.response);
      }

      if (error.response?.status === RESPONSE_CODE.UNAUTHORIZED && !originalRequest._retry) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const res = await axios.post<ResponseData<{ data: SignInDataType }>>(
              API_ROUTES.AUTH.REFRESH_TOKEN,
              {},
              { withCredentials: true }
            );
            const response = res.data.data;
            const decode = jwtDecode(response.data.accessToken);
            if (!decode.exp) throw new Error('Access token missing exp');
            const expires = new Date();
            expires.setDate(expires.getDate() + 365);
            cookies.set(STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken, { expires });
            const { setToken } = useAuthStore.getState();
            setToken(response.data.accessToken);

            failedRequestsQueue.forEach((queuedRequest) => {
              if (queuedRequest.config.headers) {
                queuedRequest.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                instance(queuedRequest.config)
                  .then((res) => queuedRequest.resolve(res))
                  .catch((err) => queuedRequest.reject(err));
              }
            });

            failedRequestsQueue = [];
          } catch {
            if (typeof window !== 'undefined') {
              window.location.href = ROUTER_PATH.USER.HOME;
            }
          } finally {
            isRefreshing = false;
          }

          originalRequest._retry = true;
          return instance(originalRequest);
        } else {
          return new Promise<AxiosResponse>((resolve, reject) => {
            failedRequestsQueue.push({
              resolve,
              reject,
              config: originalRequest,
            });
          });
        }
      }

      if (error.response?.status === RESPONSE_CODE.SERVER_ERROR) {
        return Promise.reject(error.response);
      }

      return Promise.reject(error.response);
    }
  );
};
