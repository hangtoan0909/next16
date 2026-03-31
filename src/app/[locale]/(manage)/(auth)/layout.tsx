import { AdminAuthLayout } from '@/components/layouts/admin/auth';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <AdminAuthLayout>{children}</AdminAuthLayout>;
}
