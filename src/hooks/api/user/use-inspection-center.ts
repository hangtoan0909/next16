import { inspectionCenterAPI } from '@/api/services';
import { useAppMutation, useAppQuery } from '@/hooks/react-query';
import { InspectionCenterDetailParamsType, InspectionCenterNearbyParamsType } from '@/types';

export const useGetInspectionCentersNearby = () =>
  useAppMutation((params: InspectionCenterNearbyParamsType) => inspectionCenterAPI.nearby(params), {
    onErrorOptions: {
      showToast: false,
    },
  });

export const useGetInspectionCenterDetail = (params: InspectionCenterDetailParamsType, enabled = true) =>
  useAppQuery({
    queryKey: ['inspection_center_detail', params],
    queryFn: () => inspectionCenterAPI.detail(params),
    enabled,
  });
