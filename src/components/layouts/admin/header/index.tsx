'use client';

import { STORAGE_KEYS } from '@/constants';
import { useGetInfoInspection } from '@/hooks/api/inspection/use-auth';
import { useAuthStore } from '@/stores';
import { cookies } from '@/utils';
import { useEffect } from 'react';
import styles from './styles.module.scss';
import UserInfoContent from './user-info';

const Header = () => {
  const { data: inspectionAdmin } = useGetInfoInspection();

  const setInspection = useAuthStore((state) => state.setInspection);
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const token = cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      setToken(token);
    }
  }, [setToken]);

  useEffect(() => {
    if (inspectionAdmin?.data.inspection) {
      setInspection(inspectionAdmin.data.inspection);
    }
  }, [inspectionAdmin?.data, setInspection]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>차바 파트너</span>
        <span>(Partner)</span>
      </div>

      <div className={styles.content}>
        <div className={styles.actions}>
          <UserInfoContent />
        </div>
      </div>
    </header>
  );
};

export default Header;
