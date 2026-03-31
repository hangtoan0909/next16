import { backendApi } from '@/api/axios';
import { API_ROUTES } from '@/constants';
import { ResponseData, UserSignUpPayloadType, VehicleType, VerìfyUserPhonePayload } from '@/types';

export const userSignUpAPI = {
  get_vehicle_types: () => backendApi.get<unknown, ResponseData<VehicleType[]>>(API_ROUTES.USER.SIGN_UP.VEHICLE_TYPES),

  sign_up: (payload: UserSignUpPayloadType) =>
    backendApi.patch<UserSignUpPayloadType, unknown>(API_ROUTES.USER.SIGN_UP.CAR_REGISTRATION, payload),

  verify_user_phone: (payload: VerìfyUserPhonePayload) =>
    backendApi.post<VerìfyUserPhonePayload, unknown>(API_ROUTES.USER.SIGN_UP.VERIFY_USER_PHONE, payload),
};
