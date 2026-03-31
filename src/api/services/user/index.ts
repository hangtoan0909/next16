import { backendApi } from '@/api/axios';
import { API_ROUTES } from '@/constants';
import { PhoneUpdatePayloadType, ResponseData, UserInfoType } from '@/types';

export * from './inspection-center';
export * from './my-vehicle';
export * from './sign-up';

export const userAPI = {
  get_me: () => backendApi.get<unknown, ResponseData<UserInfoType>>(API_ROUTES.USER.ME),

  update_phone: (payload: PhoneUpdatePayloadType) =>
    backendApi.patch<PhoneUpdatePayloadType, unknown>(API_ROUTES.USER.PHONE_EDIT, payload),
};
