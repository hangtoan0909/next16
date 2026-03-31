import { authApi } from '@/api/services';
import { useAppMutation } from '../react-query';

export const useSocialSignInMutation = () => useAppMutation(authApi.social_login);

export const useSignOutMutation = () => useAppMutation(authApi.logout);

export const useResetPasswordMutation = () => useAppMutation(authApi.logout);
