'use client';
import { Drawer, DrawerProps } from 'antd';
import classNames from 'classnames';
import React from 'react';

export const AppDrawer: React.FC<DrawerProps> = ({ className, ...rest }) => (
  <Drawer className={classNames('app-drawer', className)} placement='bottom' {...rest} />
);
