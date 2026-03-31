'use client';

import BackIcon from '@/assets/icons/arrow_back.svg';
import ArrowCircleIcon from '@/assets/icons/arrow_circle_top_right.svg';
import CloseIcon from '@/assets/icons/close.svg';
import HamburgerMenuIcon from '@/assets/icons/menus/hamburger.svg';
import UserProfileMenu from '@/components/features/user/user-info';
import { AppButton } from '@/components/ui';
import { ROLE, ROUTER_PATH, USER_MENU_PRIVATE, USER_MENU_PUBLIC } from '@/constants';
import { useMounted } from '@/hooks/utils/use-mounted';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/stores';
import useSidebarStore from '@/stores/sidebar';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { ReactNode, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import styles from './styles.module.scss';

export type HeaderProps = {
  title: string | ReactNode;
  showBack?: boolean;
  onBack?: () => void;
};

const HeaderUser = ({ title, showBack = true, onBack }: HeaderProps) => {
  const t = useTranslations('user/auth');
  const { isCollapse, toggleCollapse } = useSidebarStore();
  const { user: userInfo, role } = useAuthStore(
    useShallow((s) => ({
      user: s.user,
      role: s.role,
    }))
  );
  const router = useRouter();
  const pathName = usePathname();
  const mounted = useMounted();

  const buttonKey = useMemo(() => {
    if (!mounted) return 'go_to_login_sign_up';
    if (role === ROLE.INSPECTION) return 'go_to_partner_site';
    if (role === ROLE.SYSTEM_ADMIN) return 'go_to_admin_site';
    return 'go_to_login_sign_up';
  }, [mounted, role]);

  const handleGoToAuth = () => {
    // Nếu đang ở trang login → chỉ đóng drawer
    if (pathName === ROUTER_PATH.USER.AUTH.SIGN_IN) {
      toggleCollapse();
      return;
    }

    // Role khác USER → mở tab mới
    if (role === ROLE.INSPECTION || role === ROLE.SYSTEM_ADMIN) {
      window.open(ROUTER_PATH.USER.AUTH.SIGN_IN, '_blank', 'noopener,noreferrer');
      toggleCollapse();
      return;
    }

    // USER thường → đi cùng tab
    router.push(ROUTER_PATH.USER.AUTH.SIGN_IN);
  };

  return (
    <>
      <header className={classNames(styles.header, 'app-layout-user-header')}>
        <div
          className={styles.title}
          onClick={() => {
            if (!showBack) return;
            if (onBack) onBack();
            else router.back();
          }}
        >
          {showBack && <BackIcon />}
          <h2>{title}</h2>
        </div>

        <span onClick={toggleCollapse}>
          <HamburgerMenuIcon />
        </span>
      </header>

      <div className={classNames(styles.drawer, isCollapse && styles.active)}>
        <div className={styles.drawerBody}>
          <span className={styles.close} onClick={toggleCollapse}>
            <CloseIcon />
          </span>

          <div className={styles.content}>
            {!userInfo || userInfo.needProfile ? (
              <>
                <p dangerouslySetInnerHTML={{ __html: t.markup('login_to_find') }} />

                <AppButton width='100%' size='middle' onClick={handleGoToAuth}>
                  {t(buttonKey)} <ArrowCircleIcon />
                </AppButton>

                <UserProfileMenu menus={USER_MENU_PUBLIC} showUser={false} />
              </>
            ) : (
              <UserProfileMenu menus={[...USER_MENU_PUBLIC, ...USER_MENU_PRIVATE]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderUser;
