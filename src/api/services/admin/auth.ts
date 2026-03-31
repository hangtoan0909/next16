import { backendApi, nextApi } from '@/api/axios';
import { API_ROUTES } from '@/constants';
import {
  AdminSignInPayloadType,
  InspectionVerifyOtpPayloadType,
  ResetPasswordResponseType,
  ResponseData,
  SignInResponseType,
} from '@/types';

export const adminAuthAPI = {
  login: (payload: AdminSignInPayloadType) =>
    backendApi.post<AdminSignInPayloadType, ResponseData<ResetPasswordResponseType>>(
      API_ROUTES.ADMIN.AUTH.SIGN_IN,
      payload,
      {
        skipAuthRefresh: true,
      }
    ),

  verifyOtp: (payload: InspectionVerifyOtpPayloadType, token: string): Promise<ResponseData<SignInResponseType>> =>
    nextApi.post(API_ROUTES.ADMIN.AUTH.VERIFY_OTP, payload, {
      skipAuthRefresh: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
