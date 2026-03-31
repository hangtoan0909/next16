'use client';

import { defaultLocale } from '@/i18n/routing';
import { StyleProvider } from '@ant-design/cssinjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import type { Locale as AntdLocale } from 'antd/es/locale';
import enUS from 'antd/locale/en_US';
import koKR from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import { useLocale } from 'next-intl';
import React from 'react';
import myTheme from './theme';

const localeMap: Record<string, { antd: AntdLocale; dayjs: string }> = {
  en: { antd: enUS, dayjs: 'en' },
  kr: { antd: koKR, dayjs: 'ko' },
};

export function AntdProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const current = localeMap[locale] ?? localeMap[defaultLocale];
  dayjs.locale(current.dayjs);

  return (
    <AntdRegistry>
      <StyleProvider hashPriority='low'>
        <ConfigProvider theme={myTheme} locale={current.antd}>
          {children}
        </ConfigProvider>
      </StyleProvider>
    </AntdRegistry>
  );
}
