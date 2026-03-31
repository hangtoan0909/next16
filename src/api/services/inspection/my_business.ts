import { backendApi } from '@/api/axios';
import {
  GetServiceManagementData,
  UpdateServiceManagamentPayload,
} from '@/components/features/inspection/my-business/service-management/service-management.types';
import { API_ROUTES } from '@/constants';
import { ResponseData } from '@/types';
import {
  BusinessInformationDetailType,
  InformationBusinessType,
  InspectionMyBusinessIntroductionPayloadType,
  InspectionMyBusinessIntroductionType,
  OperationMyBusinessType,
  SpeciallizationsType,
  UnionAffiliationType,
} from '@/types/inspection/my-business';

export const myBusinessAPI = {
  introduction: {
    get: () =>
      backendApi.get<unknown, ResponseData<InspectionMyBusinessIntroductionType>>(
        API_ROUTES.INSPECTION.MY_BUSINESS.INTRODUCTION.GET
      ),

    update: (payload: InspectionMyBusinessIntroductionPayloadType) =>
      backendApi.put<InspectionMyBusinessIntroductionPayloadType, ResponseData<InspectionMyBusinessIntroductionType>>(
        API_ROUTES.INSPECTION.MY_BUSINESS.INTRODUCTION.UPDATE,
        payload
      ),

    union_affiliation: () =>
      backendApi.get<unknown, ResponseData<UnionAffiliationType[]>>(
        API_ROUTES.INSPECTION.MY_BUSINESS.INTRODUCTION.UNION_AFFILIATION
      ),

    specializations: () =>
      backendApi.get<unknown, ResponseData<SpeciallizationsType[]>>(
        API_ROUTES.INSPECTION.MY_BUSINESS.INTRODUCTION.SPECIALIZATIONS
      ),
  },

  information: {
    get: () =>
      backendApi.get<unknown, ResponseData<BusinessInformationDetailType>>(
        API_ROUTES.INSPECTION.MY_BUSINESS.BASIC_INFO.GET
      ),

    update: (payload: InformationBusinessType) =>
      backendApi.put<InformationBusinessType, ResponseData<InformationBusinessType>>(
        API_ROUTES.INSPECTION.MY_BUSINESS.BASIC_INFO.UPDATE,
        payload
      ),
  },

  operation: {
    get: () =>
      backendApi.get<unknown, ResponseData<OperationMyBusinessType>>(API_ROUTES.INSPECTION.MY_BUSINESS.OPERATION.GET),

    update: (payload: OperationMyBusinessType) =>
      backendApi.put<OperationMyBusinessType, ResponseData<OperationMyBusinessType>>(
        API_ROUTES.INSPECTION.MY_BUSINESS.OPERATION.UPDATE,
        payload
      ),
  },

  serviceManagement: {
    get: () =>
      backendApi.get<unknown, ResponseData<GetServiceManagementData>>(
        API_ROUTES.INSPECTION.MY_BUSINESS.SERVICE_MANAGEMENT.GET
      ),
    update: (payload: UpdateServiceManagamentPayload) =>
      backendApi.put<unknown, ResponseData<unknown>>(
        API_ROUTES.INSPECTION.MY_BUSINESS.SERVICE_MANAGEMENT.UPDATE,
        payload
      ),
  },
};
