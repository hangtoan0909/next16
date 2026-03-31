import { userAPI } from '@/api/services';
import { ROLE } from '@/constants';
import { useAppMutation, useAppQuery } from '@/hooks/react-query';
import { useAuthStore } from '@/stores';
import { PhoneUpdatePayloadType } from '@/types';
import { useShallow } from 'zustand/react/shallow';

export const useGetInfoUser = () => {
  const { token, role } = useAuthStore(
    useShallow((s) => ({
      token: s.token,
      role: s.role,
    }))
  );

  return useAppQuery({
    queryKey: ['info_user'],
    queryFn: () => userAPI.get_me(),
    enabled: Boolean(token) && role === ROLE.USER,
  });
};

export const useUpdatePhone = () => useAppMutation((payload: PhoneUpdatePayloadType) => userAPI.update_phone(payload));
