'use client';

import ArrowDownIcon from '@/assets/icons/menus/arrow_down.svg';
import ArrowUpIcon from '@/assets/icons/menus/arrow_up.svg';
import { ROLE } from '@/constants';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/stores';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useState } from 'react';
import { SidebarAccountInfo } from './account-info';
import { INSPECTION_MENUS, SUPER_ADMIN_MENUS } from './menu';
import styles from './styles.module.scss';

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

type MenuConfig = {
  key: string;
  label: string;
  Active?: IconComponent;
  Inactive?: IconComponent;
  children?: MenuConfig[];
};

type MenuItem = Required<MenuProps>['items'][number];

function getMenusByRole(role: ROLE | null): MenuConfig[] {
  switch (role) {
    case ROLE.SYSTEM_ADMIN:
      return SUPER_ADMIN_MENUS;
    case ROLE.INSPECTION:
      return INSPECTION_MENUS;
    default:
      return [];
  }
}

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

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');
  const role = useAuthStore((state) => state.role);

  const menusByRole = useMemo(() => getMenusByRole(role), [role]);

  const onMenuClick: MenuProps['onClick'] = async ({ key }) => {
    router.push(key);
  };

  const defaultOpenKeys = useMemo(() => menusByRole.filter((m) => m.children?.length).map((m) => m.key), [menusByRole]);

  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys as string[]);
  };

  const toMenuItems = (list: MenuConfig[]): MenuItem[] =>
    list.map((m) => ({
      key: m.key,
      label: t(m.label),
      icon: m.Inactive && <Icon active={isActive(m.key, pathname)} Active={m.Active} Inactive={m.Inactive} />,
      children: m.children ? toMenuItems(m.children) : undefined,
    }));

  const selectedKeys = useMemo(() => {
    const allMenus: MenuConfig[] = menusByRole.flatMap((m) => [m, ...(m.children || [])]);
    return allMenus.filter((m) => isActive(m.key, pathname)).map((m) => m.key);
  }, [pathname, menusByRole]);

  useEffect(() => {
    setOpenKeys(defaultOpenKeys);
  }, [defaultOpenKeys]);

  return (
    <div className={styles.menus}>
      <SidebarAccountInfo />
      <Menu
        mode='inline'
        items={toMenuItems(menusByRole)}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onMenuClick}
        inlineCollapsed={false}
        expandIcon={({ isOpen }) => (isOpen ? <ArrowDownIcon /> : <ArrowUpIcon />)}
      />
    </div>
  );
};

export default SideBar;
