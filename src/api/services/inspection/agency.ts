import { backendApi } from '@/api/axios';
import { API_ROUTES } from '@/constants';
import { InspectionAgencyPayloadType, InspectionAgencyType, ResponseData } from '@/types';

export const agencyAPI = {
  get: () => backendApi.get<unknown, ResponseData<InspectionAgencyType>>(API_ROUTES.INSPECTION.AGENCY.GET),

  update: (payload: InspectionAgencyPayloadType) =>
    backendApi.put<InspectionAgencyPayloadType, ResponseData<InspectionAgencyType>>(
      API_ROUTES.INSPECTION.AGENCY.UPDATE,
      payload
    ),
};
