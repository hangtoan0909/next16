import { PaginationSortParamsType } from '@/types';

export type AdminInspectionRequestParamsType = PaginationSortParamsType & {
  status?: number | null;
  startDate?: string;
  endDate?: string;
  keyword?: string;
  type?: number | null;
};

export type AdminInspectionResponseType = {
  id: number;
  businessRegistrationNumber: string;
  businessPhone: string;
  businessName: string;
  representativeName: string;
  status: number;
  registrationDate: string;
  type: number;
  email: string;
  representativePhone: string;
  address: string;
  bankAccountNumber: string;
  bankName: string;
  bankOwner: string;
  businessCertUrl: string;
  licenseCertUrl: string;
  reasonReject?: string;
};

export type AdminInspectionApprovalPayloadType = {
  status: number;
  reason: string;
};
