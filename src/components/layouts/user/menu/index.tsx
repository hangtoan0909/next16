'use client';

import { PRIVATE_USER_ROUTES, ROUTER_PATH } from '@/constants';
import { Link, usePathname } from '@/i18n/navigation';
import { useAuthStore } from '@/stores';
import { useTranslations } from 'next-intl';
import React from 'react';
import { USER_MENUS } from './menu';
import styles from './styles.module.scss';

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const Icon: React.FC<{ active: boolean; Active?: IconComponent; Inactive?: IconComponent }> = ({
  active,
  Active,
  Inactive,
}) => {
  if (!Active || !Inactive) return null;
  return active ? <Active /> : <Inactive />;
};

const isActive = (path: string, current: string) => {
  const prefix = current.split('/').slice(0, path.split('/').length).join('/');
  return prefix === path;
};

const UserMenuBar = () => {
  const pathname = usePathname();
  const t = useTranslations('common');
  const user = useAuthStore((state) => state.user);

  const getMenuHref = (itemKey: string) => {
    const needAuth = !user || user.needProfile;
    return needAuth && PRIVATE_USER_ROUTES.includes(itemKey) ? ROUTER_PATH.USER.AUTH.SIGN_IN : itemKey;
  };

  return (
    <nav className={styles.menus}>
      {USER_MENUS.map((item) => {
        const active = isActive(item.key, pathname);
        const href = getMenuHref(item.key);

        return (
          <div key={item.key} className={styles.item}>
            <Link href={href}>
              <Icon active={active} Active={item.Active} Inactive={item.Inactive} />
              <span className={active ? styles.active : ''}>{t(item.label)}</span>
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default UserMenuBar;
