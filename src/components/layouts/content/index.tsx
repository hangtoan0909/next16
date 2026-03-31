import { AppLoading } from '@/components/ui';
import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

type PageContentLayoutProps = {
  title?: string;
  loading?: boolean;
  notFound?: boolean;
  headerActions?: React.ReactNode;
  footerAction?: React.ReactNode;
  wrapperClassName?: string;
} & PropsWithChildren;

const PageHeader = ({ title, headerActions }: Pick<PageContentLayoutProps, 'title' | 'headerActions'>) => {
  if (!title) return null;

  return (
    <div className={classNames(styles.header, 'app-layout-content-header')}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {headerActions}
    </div>
  );
};

export const PageContentLayout = ({
  children,
  title,
  loading,
  notFound,
  headerActions,
  footerAction,
  wrapperClassName,
}: PageContentLayoutProps) => {
  return (
    <div className={classNames(styles.wrapper, wrapperClassName)}>
      <div
        className={classNames(styles.content, 'app-layout-content')}
        style={{
          height: `calc(100vh - ${footerAction ? '200px' : '56px'})`,
        }}
      >
        <PageHeader title={title} headerActions={headerActions} />
        {loading ? <AppLoading /> : notFound ? null : children}
      </div>

      {footerAction && !loading && !notFound && <div className={styles.footerAction}>{footerAction}</div>}
    </div>
  );
};
