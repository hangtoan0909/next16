import { nextApi } from '@/api/axios';
import { API_ROUTES } from '@/constants';
import { ResponseData, SignInDataType, SocialSignInPayload, UserSignInDataType } from '@/types';

export const authApi = {
  social_login: (data: SocialSignInPayload): Promise<ResponseData<UserSignInDataType>> =>
    nextApi.post(API_ROUTES.USER.AUTH.SOCIAL_LOGIN, data),

  logout: () => nextApi.delete(API_ROUTES.AUTH.LOGOUT),

  refresh_token: (): Promise<ResponseData<SignInDataType>> => nextApi.post(API_ROUTES.AUTH.REFRESH_TOKEN),
};
