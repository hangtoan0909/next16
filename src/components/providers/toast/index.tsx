'use client';

import { useToast } from '@/hooks/toast/use-toast';
import React from 'react';

export const ToastContext = React.createContext<ReturnType<typeof useToast> | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {toast.contextHolder}
      {children}
    </ToastContext.Provider>
  );
};
