import { authInspectionApi } from '@/api/services';
import { useAppMutation, useAppQuery } from '@/hooks/react-query';
import { InspectionResetPayloadType, InspectionSignUpPayloadType, InspectionVerifyOtpPayloadType } from '@/types';

export const useGetInfoInspection = () => {
  return useAppQuery({
    queryKey: ['info_inspection'],
    queryFn: () => authInspectionApi.get_me(),
  });
};

export const useGetBankList = () =>
  useAppQuery({
    queryKey: ['banks'],
    queryFn: authInspectionApi.list_bank,
  });

export const useSignUpInspection = () =>
  useAppMutation((payload: InspectionSignUpPayloadType) => authInspectionApi.signUp(payload));

export const useSignInInspection = () =>
  useAppMutation(authInspectionApi.signIn, {
    onErrorOptions: {
      showToastUnAuthor: true,
    },
  });

export const useSendOtpInspection = () =>
  useAppMutation(authInspectionApi.sendOtp, {
    onErrorOptions: {
      showToastUnAuthor: true,
    },
  });

export const useVerifyOtpInspection = () =>
  useAppMutation(
    ({ payload, token }: { payload: InspectionVerifyOtpPayloadType; token: string }) =>
      authInspectionApi.verifyOtp(payload, token),
    {
      onErrorOptions: {
        showToastUnAuthor: true,
      },
    }
  );

export const useResetPasswordInspection = () =>
  useAppMutation(
    ({ payload, token }: { payload: InspectionResetPayloadType; token: string }) =>
      authInspectionApi.resetPassword(payload, token),
    {
      onErrorOptions: {
        showToastUnAuthor: true,
      },
    }
  );
