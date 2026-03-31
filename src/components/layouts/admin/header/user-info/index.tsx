'use client';

import ArrowDownIcon from '@/assets/icons/arrow_down_gray-700.svg';
import LogOutIcon from '@/assets/icons/log_out.svg';
import { ROLE, ROUTER_PATH } from '@/constants';
import { useSignOutMutation } from '@/hooks/api/use-auth';
import { useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/stores';
import { Dropdown } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import styles from './styles.module.scss';

const UserMenu = ({ onLogout }: { onLogout: () => void; onClose: () => void }) => {
  const t = useTranslations('common');

  return (
    <div className={styles.info}>
      <div onClick={onLogout} className={styles.logout}>
        <LogOutIcon /> {t('header.user.logout')}
      </div>
    </div>
  );
};

const UserInfoContent = () => {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  const removeCredentials = useAuthStore((state) => state.removeCredentials);
  const { mutate } = useSignOutMutation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        removeCredentials();
        router.push(role === ROLE.INSPECTION ? ROUTER_PATH.INSPECTION.AUTH.SIGN_IN : ROUTER_PATH.ADMIN.AUTH.SIGN_IN);
        router.refresh();
      },
    });
  };

  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      placement='bottomRight'
      trigger={['click']}
      popupRender={() => <UserMenu onLogout={handleLogout} onClose={() => setOpen(false)} />}
    >
      <div className={styles.account}>
        <Image
          alt='Avatar'
          src='https://cdn.ohanapreschool.edu.vn/wp-content/uploads/2025/11/anh-gai-xinh-2k5.webp'
          width={24}
          height={24}
          unoptimized
        />
        <span>변무영 대표님</span>
        <ArrowDownIcon />
      </div>
    </Dropdown>
  );
};

export default UserInfoContent;
