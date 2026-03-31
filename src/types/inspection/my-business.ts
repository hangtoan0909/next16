export type ImageMyBusinessType = {
  url: string;
  isThumbnail: boolean;
};

export type NameUrl = {
  name: string;
  url: string;
};

export type Certification = {
  name: string;
  number: string;
};

export type IdName = {
  id: number;
  name: string;
};

export type UnionAffiliationType = {
  id: string;
  code: string;
  name: string;
};

export type SpeciallizationsType = {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
};

export type InspectionMyBusinessIntroductionType = {
  introduction: string;
  images?: ImageMyBusinessType[];
  specializations?: string[];
  unionAffiliation: Pick<UnionAffiliationType, 'id' | 'code'>;
  certifications?: Certification[];
  additionalServices?: IdName[];
  sns?: NameUrl[];
};

export type InspectionMyBusinessIntroductionPayloadType = {
  introduction: string;
  images?: ImageMyBusinessType[];
  specializationCodes?: string[];
  unionAffiliationId: string;
  certifications?: Certification[];
  additionalServices?: string[];
  snsList?: NameUrl[];
};

export type BusinessHourType = {
  dayOfWeek: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  lunchStartTime?: string;
  lunchEndTime?: string;
};

export type HolidayType = {
  startDate: string;
  endDate: string;
  reason: string;
};

export type OperationMyBusinessType = {
  businessHours: BusinessHourType[];
  isClosedOnPublicHolidays: boolean;
  holidays: HolidayType[];
};

export type BusinessInformationDetailType = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  businessRegistrationNumber: string;
  businessName: string;

  representativeName: string;
  representativePhone: string;

  status: number;
  type: number;
  registrationDate: string;
  reasonReject: string | null;

  businessPhone: string;
  email: string;
  address: string;

  bankName: string;
  bankAccountNumber: string;

  maintenanceBusinessRegistrationNumber: string | null;

  contactPersonName: string | null;
  contactPersonPhone: string | null;

  accountHolderInfo: string;
  isClosedOnPublicHolidays: boolean;
  inspectionCapacityPer30Mins: number;
};

export type InformationBusinessType = {
  maintenanceBusinessRegistrationNumber?: string;
  contactPersonName: string;
  contactPersonPhone: string;
  address: string;
  email: string;
  businessPhone: string;
  representativeName: string;
  representativePhone: string;
};
