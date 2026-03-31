import { AdminLayout } from '@/components/layouts';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <AdminLayout>{children}</AdminLayout>;
}
