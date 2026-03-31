import { myBusinessAPI } from '@/api/services/inspection/my_business';
import { UpdateServiceManagamentPayload } from '@/components/features/inspection/my-business/service-management/service-management.types';
import { useAppMutation, useAppQuery } from '@/hooks/react-query';
import { useAuthStore } from '@/stores';
import { isNil } from 'lodash';
import { useShallow } from 'zustand/react/shallow';

export const useGetInspectionServiceManagement = () => {
  const inspection = useAuthStore(useShallow((s) => s.inspection));
  return useAppQuery({
    queryKey: ['my_business_service_management', inspection?.email],
    queryFn: async () => {
      const res = await myBusinessAPI.serviceManagement.get();
      return res.data;
    },
    enabled: !isNil(inspection),
  });
};

export const useUpdateInpsectionServiceManagement = () =>
  useAppMutation((payload: UpdateServiceManagamentPayload) => myBusinessAPI.serviceManagement.update(payload));
