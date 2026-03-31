import { AntdProvider, NextAuthProviders, QueryProvider, ToastProvider } from '@/components/providers';
import { routing } from '@/i18n/routing';
import { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Hato - Nextjs',
  description: 'Hato - Nextjs',
};

// export function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale}>
      <QueryProvider>
        <AntdProvider>
          <ToastProvider>
            <NextAuthProviders> {children}</NextAuthProviders>
          </ToastProvider>
        </AntdProvider>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
