'use client';

import Sider from 'antd/es/layout/Sider';
import { PropsWithChildren } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import styles from './styles.module.scss';

export const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <Header />
      <Sider collapsedWidth={0} collapsed={false} width={240} trigger={null} className={styles.sidebar}>
        <Sidebar />
      </Sider>
      <main className={styles.content} id='content'>
        {children}
      </main>
    </div>
  );
};
