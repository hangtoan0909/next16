'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { AppButton, AppButtonProps } from '../button';

export type ActionButtonsProps = {
  saveLabel?: string;
  cancelLabel?: string;
  hideCancel?: boolean;
  hideSubmit?: boolean;
  saveProps?: AppButtonProps;
  cancelProps?: AppButtonProps;
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  width?: string | number;
  nameSpace?: string;
};

export const AppActionButtons: React.FC<ActionButtonsProps> = ({
  saveLabel,
  cancelLabel,
  hideCancel = false,
  hideSubmit = false,
  saveProps,
  cancelProps,
  justify = 'center',
  width = 120,
  nameSpace = 'common',
}) => {
  const t = useTranslations(nameSpace);

  return (
    <div
      className='app-action-buttons'
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: justify,
        gap: '10px',
      }}
    >
      {!hideCancel && (
        <AppButton type='default' width={width} {...cancelProps}>
          {t(cancelLabel ?? 'button.cancel')}
        </AppButton>
      )}

      {!hideSubmit && (
        <AppButton type='primary' width={width} {...saveProps}>
          {t(saveLabel ?? 'button.confirm')}
        </AppButton>
      )}
    </div>
  );
};
