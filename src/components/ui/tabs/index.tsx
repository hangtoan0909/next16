'use client';

import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import React from 'react';

// export type BaseTabsItem = {
//   key: string;
//   label: React.ReactNode;
//   disabled?: boolean;
// };

// type BaseTabsProps = {
//   items: BaseTabsItem[];
//   queryKey?: string;
// } & Omit<TabsProps, 'items' | 'onChange'>;

export const AppTabs: React.FC<TabsProps> = ({ ...rest }) => {
  return <Tabs className='app-tabs' {...rest} />;
};
