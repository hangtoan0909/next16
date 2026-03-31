'use client';
import CloseIcon from '@/assets/icons/close_black.svg';
import { ActionButtonsProps, AppActionButtons } from '@/components/ui';
import { Modal, ModalProps } from 'antd';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

export interface ModalCustomProps extends ModalProps {
  title: string | ReactNode;
  children?: ReactNode;
  actions?: ActionButtonsProps;
  type?: 'mb' | 'pc';
  className?: string;
}

export const AppModal: React.FC<ModalCustomProps> = ({ title, children, actions, type = 'mb', className, ...rest }) => (
  <Modal
    className={classNames('app-modal', className, {
      'app-modal-pc': type === 'pc',
      'app-modal-mb': type === 'mb',
    })}
    footer={null}
    centered
    destroyOnHidden
    closeIcon={<CloseIcon />}
    getContainer={() => (type === 'mb' ? (document.querySelector('.app-layout-user') as HTMLElement) : document.body)}
    {...rest}
  >
    <h2 className='text-body1-bold'>{title}</h2>
    {children}
    {actions && <AppActionButtons {...actions} cancelProps={{ type: 'text', ...actions.cancelProps }} />}
  </Modal>
);
