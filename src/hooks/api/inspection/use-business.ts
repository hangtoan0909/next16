import {
  BusinessAPI,
  ParamBusinessBank,
  ParamBusinessRegistration,
  VerifyBusinessBankResponse,
} from '@/api/services/inspection/business';
import { useAppMutation } from '@/hooks/react-query';

export const useVerifyBusinessRegistration = () =>
  useAppMutation((payload: ParamBusinessRegistration) => BusinessAPI.verifyBusinessRegistration(payload));

export const useVerifyBusinessBank = () =>
  useAppMutation<VerifyBusinessBankResponse, Error, ParamBusinessBank>(
    (payload) => BusinessAPI.verifyBusinessBank(payload) as Promise<VerifyBusinessBankResponse>
  );
