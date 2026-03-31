import { backendApi } from '@/api/axios';
import { API_ROUTES } from '@/constants';
import {
  AdminInspectionApprovalPayloadType,
  AdminInspectionRequestParamsType,
  AdminInspectionResponseType,
  ResponseData,
  ResponseDataList,
} from '@/types';

export const adminInspectionAPI = {
  gets: (params: AdminInspectionRequestParamsType) =>
    backendApi.get<AdminInspectionRequestParamsType, ResponseDataList<AdminInspectionResponseType[]>>(
      API_ROUTES.ADMIN.INSPECTION.APPROVAL_LIST,
      params
    ),

  detail: (id: number | null) =>
    backendApi.get<null, ResponseData<AdminInspectionResponseType>>(API_ROUTES.ADMIN.INSPECTION.DETAIL(id)),

  approval: (id: number, payload: AdminInspectionApprovalPayloadType) =>
    backendApi.patch<AdminInspectionApprovalPayloadType, ResponseData<AdminInspectionResponseType>>(
      API_ROUTES.ADMIN.INSPECTION.APPROVAL(id),
      payload
    ),

  update_status: (id: number, payload: AdminInspectionApprovalPayloadType) =>
    backendApi.patch<AdminInspectionApprovalPayloadType, ResponseData<AdminInspectionResponseType>>(
      API_ROUTES.ADMIN.INSPECTION.UPDATE_STATUS(id),
      payload
    ),

  list: (params: AdminInspectionRequestParamsType) =>
    backendApi.get<AdminInspectionRequestParamsType, ResponseDataList<AdminInspectionResponseType[]>>(
      API_ROUTES.ADMIN.INSPECTION.LIST,
      params
    ),
};
