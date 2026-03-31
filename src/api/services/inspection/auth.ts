import { backendApi, nextApi } from '@/api/axios';
import { API_ROUTES } from '@/constants';
import {
  BankDataType,
  InspectionInfoType,
  InspectionResetPasswordPayloadType,
  InspectionResetPayloadType,
  InspectionSignInPayloadType,
  InspectionSignUpPayloadType,
  InspectionVerifyOtpPayloadType,
  ResetPasswordResponseType,
  ResponseData,
  SignInResponseType,
  SignUpResponseType,
  verifyOtpPasswordResponseType,
} from '@/types';

export const authInspectionApi = {
  list_bank: () => backendApi.get<unknown, ResponseData<BankDataType[]>>(API_ROUTES.INSPECTION.BANK_LIST),

  signUp: (payload: InspectionSignUpPayloadType) =>
    backendApi.post<InspectionSignUpPayloadType, ResponseData<SignUpResponseType>>(
      API_ROUTES.INSPECTION.AUTH.SIGN_UP,
      payload
    ),

  signIn: (payload: InspectionSignInPayloadType) =>
    nextApi.post<InspectionSignInPayloadType, ResponseData<SignInResponseType>>(
      API_ROUTES.INSPECTION.AUTH.SIGN_IN,
      payload,
      {
        skipAuthRefresh: true,
      }
    ),

  sendOtp: (payload: InspectionResetPasswordPayloadType) =>
    backendApi.post<InspectionResetPasswordPayloadType, ResponseData<ResetPasswordResponseType>>(
      API_ROUTES.INSPECTION.AUTH.SEND_OTP,
      payload,
      {
        skipAuthRefresh: true,
      }
    ),

  verifyOtp: (payload: InspectionVerifyOtpPayloadType, token: string) =>
    backendApi.post<InspectionVerifyOtpPayloadType, ResponseData<verifyOtpPasswordResponseType>>(
      API_ROUTES.INSPECTION.AUTH.VERIFY_OTP,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        skipAuthRefresh: true,
      }
    ),

  resetPassword: (payload: InspectionResetPayloadType, token: string) =>
    backendApi.post<InspectionResetPayloadType, ResponseData<null>>(
      API_ROUTES.INSPECTION.AUTH.RESET_PASSWORD,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        skipAuthRefresh: true,
      }
    ),

  get_me: () =>
    backendApi.get<
      unknown,
      ResponseData<{
        inspection: InspectionInfoType;
      }>
    >(API_ROUTES.INSPECTION.ME),
};
