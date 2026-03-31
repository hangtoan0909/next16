import { adminAuthAPI } from '@/api/services';
import { useAppMutation } from '@/hooks/react-query';
import { InspectionVerifyOtpPayloadType, ResponseData, SignInResponseType } from '@/types';

type VerifyOtpVariables = {
  payload: InspectionVerifyOtpPayloadType;
  token: string;
};

export const useAdminSignInMutation = () =>
  useAppMutation(adminAuthAPI.login, {
    onErrorOptions: {
      showToastUnAuthor: true,
    },
  });

export const useAdminVerifyOtpLoginAdmin = () =>
  useAppMutation<ResponseData<SignInResponseType>, Error, VerifyOtpVariables>(
    ({ payload, token }) => adminAuthAPI.verifyOtp(payload, token),
    {
      onErrorOptions: {
        showToastUnAuthor: true,
      },
    }
  );
