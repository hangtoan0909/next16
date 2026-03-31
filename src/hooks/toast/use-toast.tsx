'use client';

import CloseIcon from '@/assets/icons/toast/close.svg';
import SuccessIcon from '@/assets/icons/toast/completed.svg';
import ErrorIcon from '@/assets/icons/toast/error.svg';
import InfoIcon from '@/assets/icons/toast/information.svg';
import WarningIcon from '@/assets/icons/toast/warning.svg';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

notification.config({ maxCount: 1 });

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface ToastOptions {
  message?: string;
  description?: string;
  placement?: NotificationPlacement;
  closable?: boolean;
  duration?: number;
}

// 🔒 Biến toàn cục tránh hiển thị trùng
const shownMessages = new Set<string>();

// ✅ Hàm helper: nếu message giống nhau trong 2s thì không show lại
const canShowToast = (key: string, ttl = 2000) => {
  if (shownMessages.has(key)) return false;
  shownMessages.add(key);
  setTimeout(() => shownMessages.delete(key), ttl);
  return true;
};

export const useToast = () => {
  const [api, contextHolder] = notification.useNotification();
  const t = useTranslations('common');

  const toast = useCallback(
    (type: NotificationType, options: ToastOptions): void => {
      const { description, placement = 'top', closable = true, duration = 3 } = options;

      const config = {
        success: { icon: <SuccessIcon />, color: 'var(--success-900)', defaultMessage: t('toast.completed') },
        info: { icon: <InfoIcon />, color: 'var(--info-900)', defaultMessage: t('toast.information') },
        warning: { icon: <WarningIcon />, color: 'var(--warning-900)', defaultMessage: t('toast.warning') },
        error: { icon: <ErrorIcon />, color: 'var(--danger-600)', defaultMessage: t('toast.error') },
      } as const;

      // const finalMessage = message || config[type].defaultMessage;
      const uniqueKey = `${type}-${description || ''}`;

      //  Nếu message giống nhau trong 2s thì bỏ qua
      if (!canShowToast(uniqueKey)) return;

      api[type]({
        message: '',
        description,
        placement,
        closable,
        closeIcon: <CloseIcon />,
        duration,
        className: `app-notification app-notification-${type}`,
        icon: config[type].icon,
      });
    },
    [api, t]
  );

  return { toast, contextHolder };
};
