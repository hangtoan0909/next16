import { PaginationSortParamsType } from '@/types';

export type InspectionCenterNearbyParamsType = {
  lat: string;
  lng: string;
  plate: string;
  ownerName: string;
  vehicleLoadTypeId: string;
  date: string;
} & PaginationSortParamsType;

export type InspectionCenterNearbyResponseItemType = {
  partnerId: number;
  name: string;
  address: string;
  detailAddress: string | null;
  introductionImage: string | null;
  distance: number;
  unionAffiliation: string | null;
  certifications: string[];
  additionalServices: string[];
  specializations: string[];
};

export type InspectionCenterNearbyResponseType = {
  data: InspectionCenterNearbyResponseItemType[];
  pagination: PaginationMeta;
};

export type InspectionCenterDetailParamsType = {
  inspectionId: number | string;
  vehicleLoadTypeId?: number | string;
  lat: string;
  lng: string;
};

export type InspectionCenterDetailServiceType = {
  serviceName: string;
  servicePrice?: string | number | null;
};

export type InspectionCenterDetailResponseType = {
  inspectionId?: number;
  businessName?: string;
  address?: string;
  detailAddress?: string | null;
  businessPhone?: string | null;
  latitude?: string | number | null;
  longitude?: string | number | null;
  distance?: number | string | null;
  isClosedOnPublicHolidays?: boolean;
  images?: { id: number; url: string; isThumbnail: boolean; sortOrder: number }[];
  unionAffiliation?: string | null;
  introduction?: string | null;
  services?: InspectionCenterDetailServiceType[];
  sns?: { id: number; name: string; url: string }[];
  specializations?: { id?: number; name: string }[];
  certifications?: { id?: number; name: string }[];
  additionalServices?: { id?: number; name: string }[];
  businessHours?: {
    dayOfWeek: string;
    isOpen: boolean;
    openTime: string | null;
    closeTime: string | null;
    lunchStartTime: string | null;
    lunchEndTime: string | null;
  }[];
  holidays?: {
    id?: number;
    startDate: string;
    endDate: string;
    reason: string;
  }[];
};
