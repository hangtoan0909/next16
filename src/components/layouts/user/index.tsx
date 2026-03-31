'use client';

import { AppContainer, AppLoading } from '@/components/ui';
import { useAuthStore } from '@/stores';
import useSidebarStore from '@/stores/sidebar';
import classNames from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';
import Footer from './footer';
import Header, { HeaderProps } from './header';
import UserMenuBar from './menu';
import styles from './styles.module.scss';

type Props = PropsWithChildren & {
  className?: string;
  header: HeaderProps;
  showFooter?: boolean;
  showNav?: boolean;
  actions?: ReactNode;
  shadowActions?: boolean;
  loadingUser?: boolean;
  loading?: boolean;
};

export const UserLayout = ({
  children,
  className,
  header,
  showFooter = true,
  showNav = true,
  actions,
  shadowActions = false,
  loadingUser = false,
  loading = false,
}: Props) => {
  const isCollapse = useSidebarStore((s) => s.isCollapse);
  const user = useAuthStore((s) => s.user);

  const isLoading = loading || (loadingUser && !user);

  return (
    <div
      className={classNames(styles.container, className, 'app-layout-user')}
      style={isCollapse ? { overflow: 'hidden', height: '100dvh' } : undefined}
    >
      <Header {...header} />

      {isLoading ? (
        <AppLoading center />
      ) : (
        <>
          <main className={styles.content} id='content'>
            {children}
            {showFooter && <Footer />}
          </main>

          {actions && (
            <AppContainer
              as='div'
              className={classNames(styles.actions, 'app-layout-user-actions')}
              contentStyle={shadowActions ? { boxShadow: '0 3px 10px #ccc' } : {}}
            >
              {actions}
            </AppContainer>
          )}

          {showNav && <UserMenuBar />}
        </>
      )}
    </div>
  );
};
