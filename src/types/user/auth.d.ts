export type SocialSignInPayload = {
  provider: string;
  token: string;
};

export type UserType = {
  id: number;
  username: string;
  name?: string;
  phoneNumber?: string;
  email: string;
  needProfile: boolean;
};

export type UserInfoType = {
  needProfile?: boolean;
  user: UserType;
};

export type UserSignInDataType = SignInDataType & UserInfoType;
