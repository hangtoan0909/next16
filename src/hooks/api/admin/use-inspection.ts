import { adminInspectionAPI } from '@/api/services';
import { useAppMutation, useAppQuery } from '@/hooks/react-query';
import { AdminInspectionApprovalPayloadType, AdminInspectionRequestParamsType } from '@/types/admin/inspection';

export const useAdminInspectionAPI = (params: AdminInspectionRequestParamsType) =>
  useAppQuery({
    queryKey: ['admin_inspection_approval', params],
    queryFn: () => adminInspectionAPI.gets(params),
  });

export const useAdminInspectionDetailAPI = (id: number | null) =>
  useAppQuery({
    queryKey: ['admin_inspection_detail', id],
    queryFn: () => adminInspectionAPI.detail(id),
    enabled: !!id,
  });

export const useAdminInspectionApprovalAPI = () =>
  useAppMutation(({ id, payload }: { id: number; payload: AdminInspectionApprovalPayloadType }) =>
    adminInspectionAPI.approval(id, payload)
  );

export const useAdminInspectionUpdateStatusAPI = () =>
  useAppMutation(({ id, payload }: { id: number; payload: AdminInspectionApprovalPayloadType }) =>
    adminInspectionAPI.update_status(id, payload)
  );

export const useAdminInspectionManagementAPI = (params: AdminInspectionRequestParamsType) =>
  useAppQuery({
    queryKey: ['admin_inspection_management', params],
    queryFn: () => adminInspectionAPI.list(params),
  });
