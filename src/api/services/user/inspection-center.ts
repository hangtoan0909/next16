import { backendApi } from '@/api/axios';
import { API_ROUTES } from '@/constants';
import {
  InspectionCenterDetailParamsType,
  InspectionCenterDetailResponseType,
  InspectionCenterNearbyParamsType,
  InspectionCenterNearbyResponseType,
  ResponseData,
} from '@/types';

export const inspectionCenterAPI = {
  nearby: (params: InspectionCenterNearbyParamsType) =>
    backendApi.get<InspectionCenterNearbyParamsType, ResponseData<InspectionCenterNearbyResponseType>>(
      API_ROUTES.USER.INSPECTION_CENTER.NEARBY,
      params
    ),

  detail: (params: InspectionCenterDetailParamsType) =>
    backendApi.get<InspectionCenterDetailParamsType, ResponseData<InspectionCenterDetailResponseType>>(
      API_ROUTES.USER.INSPECTION_CENTER.DETAIL,
      params
    ),
};
