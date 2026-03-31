import UserRootLayout from '@/components/layouts/user/root';
import { Viewport } from 'next';
import { PropsWithChildren } from 'react';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function Layout({ children }: PropsWithChildren) {
  return <UserRootLayout>{children}</UserRootLayout>;
}
