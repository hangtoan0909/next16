'use client';

import { ToastContext } from '@/components/providers/toast';
import { useContext } from 'react';

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToastContext must be used within ToastProvider');
  return context;
};
