import { ROLE } from '@/constants';
import { JwtPayload } from 'jwt-decode';

export type SignInPayloadType = {
  username: string;
  password: string;
};

export type SignInDataType = {
  accessToken: string;
  refreshToken: string;
  expired_access: string;
  expired_refresh: string;
};

// Admin
export type AdminInfoType = {
  id: number;
  email: string;
  parent_id: string | null;
  is_active: boolean;
  name: string;
  username: string;
  phoneNumber: string;
  type: string;
  registrationAt?: string;
};

export type RefreshTokenType = {
  refreshToken: string;
};

export type ResetPasswordPayloadType = {
  email: string;
};

export type ChangePasswordPayloadType = {
  currentPassword: string;
  newPassword: string;
};

export type JWTPayload = JwtPayload & {
  role: ROLE;
};

export type VerifyOtpInspectionPayloadType = {
  otp: string;
};

export type VerifyOtpInspectionDataType = {
  resetPasswordToken: string;
};
