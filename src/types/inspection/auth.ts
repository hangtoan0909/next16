export type InspectionInfoType = {
  id: string;
  businessRegistrationNumber: string;
  businessName: string;
  representativeName: string;
  representativePhone: string;
  businessPhone: string;
  email: string;
};

export type BankDataType = {
  name: string;
  id: number;
  bankCode: string;
  swiftCode: string;
};

export interface CompanyItem {
  company: string;
  bno: string;
  cno: string;
  bsttcd: string;
  bstt: string;
  TaxTypeCd: string;
  taxtype: string;
  EndDt: string;
}

export interface CompanyResponse {
  resultCode: number;
  resultMsg: string;
  page: number;
  maxpage: number;
  pagecnt: number;
  totalCount: number;
  items: Array<CompanyItem | null>;
}

export type InspectionSignUpPayloadType = {
  businessCertUrl: string;
  licenseCertUrl: string;
  businessRegistrationNumber: string;
  password: string;
  verifyPassword: string;
  businessName: string;
  representativeName: string;
  representativePhone: string;
  businessPhone: string;
  eml: string;
  address: string;
  bankName: string;
  bankAccountNumber: string;
  accountHolderInfo: string;
  agreements: object;
  jibunAddress?: string;
  roadAddress?: string;
};

export type SignUpResponseType = {
  data: InspectionSignUpPayloadType;
};

export type InspectionSignInPayloadType = {
  username: string;
  password: string;
};

export type InspectionType = {
  id: number;
  username: string;
  role: string;
};

export type SignInResponseType = {
  accessToken: string;
  refreshToken: string;
  user: InspectionType;
};

export type ResetPasswordResponseType = {
  otpSessionToken: string;
};

export type verifyOtpPasswordResponseType = {
  resetPasswordToken: string;
};

export type InspectionVerifyOtpPayloadType = {
  otp: string;
};

export type InspectionResetPasswordPayloadType = {
  businessRegistrationNumber: string;
  representativePhone: string;
  representativeName: string;
};

export type InspectionResetPayloadType = {
  newPassword: string;
  confirmPassword: string;
};
