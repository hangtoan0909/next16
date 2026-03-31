import { useAppMutation, useAppQuery } from '@/hooks/react-query';
import { agencyAPI } from '@/api/services';
import { InspectionAgencyPayloadType } from '@/types';

export const useGetInspectionAgency = () => {
  return useAppQuery({
    queryKey: ['inspection_agency'],
    queryFn: async () => {
      const res = await agencyAPI.get();
      return res.data;
    },
  });
};

export const useUpdateInspectionAgency = () =>
  useAppMutation((payload: InspectionAgencyPayloadType) => agencyAPI.update(payload));
