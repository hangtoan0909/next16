'use client';

import { SNS_PROVIDER, STORAGE_KEYS } from '@/constants';
import { useGetInfoUser } from '@/hooks/api/user/use-user';
import { usePathname } from '@/i18n/navigation';
import { useAuthStore } from '@/stores';
import useSidebarStore from '@/stores/sidebar';
import { cookies } from '@/utils';
import { PropsWithChildren, useEffect } from 'react';

const UserRootLayout = ({ children }: PropsWithChildren) => {
  const { setCollapse } = useSidebarStore();
  const { setToken, token, setUser, provider, setProvider } = useAuthStore();
  const { data: info } = useGetInfoUser();
  const pathName = usePathname();

  useEffect(() => {
    setCollapse(false);
  }, [pathName, setCollapse]);

  useEffect(() => {
    if (info?.data) {
      setUser(info.data);
    }
  }, [info?.data, setUser]);

  useEffect(() => {
    if (!provider && typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.SNS_PROVIDER) as SNS_PROVIDER | null;
      if (stored) {
        setProvider(stored);
      }
    }
  }, [provider, setProvider]);

  useEffect(() => {
    const tokenCookies = cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
    if (!token && tokenCookies) {
      setToken(tokenCookies);
    }
  }, [setToken, token]);

  // useEffect(() => {
  //   if (!userInfo) return;

  //   const isSignIn = pathName === ROUTER_PATH.USER.AUTH.SIGN_IN;
  //   const isSignUp = pathName === ROUTER_PATH.USER.AUTH.SIGN_UP;
  //   const inPrivateRoute = PRIVATE_USER_ROUTES.includes(pathName);

  //   const shouldGoHome = !userInfo.needProfile;
  //   const shouldCompleteProfile = userInfo.needProfile;

  //   // 1. Đã login đầy đủ nhưng vào SIGN IN hoặc SIGN UP
  //   if ((isSignIn || isSignUp) && shouldGoHome) {
  //     return router.replace(ROUTER_PATH.USER.HOME);
  //   }

  //   // 2. Chưa hoàn thiện profile mà vào trang private
  //   if (inPrivateRoute && shouldCompleteProfile) {
  //     return router.replace(ROUTER_PATH.USER.AUTH.SIGN_IN);
  //   }
  // }, [userInfo, pathName, router]);

  return children;
};

export default UserRootLayout;
