import { userSignUpAPI } from '@/api/services';
import { useAppMutation, useAppQuery } from '@/hooks/react-query';
import { UserSignUpPayloadType, VerìfyUserPhonePayload } from '@/types';

export const useGetVehicleTypes = () =>
  useAppQuery({
    queryKey: ['vehicle-types'],
    queryFn: () => userSignUpAPI.get_vehicle_types(),
    gcTime: Infinity,
    staleTime: Infinity,
  });

export const useSignUpUser = () => useAppMutation((payload: UserSignUpPayloadType) => userSignUpAPI.sign_up(payload));

export const useVerifyUserPhone = () =>
  useAppMutation((payload: VerìfyUserPhonePayload) => userSignUpAPI.verify_user_phone(payload));
