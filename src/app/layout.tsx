import '@/styles/antd-custom.scss';
import '@/styles/global.scss';
import { Metadata } from 'next';
import Script from 'next/script';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { gMarketFont, myFont } from './fonts';

export const metadata: Metadata = {
  title: 'App',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${gMarketFont.variable} ${myFont.variable} `}>
      <body suppressHydrationWarning className={` ${gMarketFont.className} ${myFont.className}`}>
        <Script src='/tinymce/tinymce.min.js' strategy='beforeInteractive' />
        {children}
      </body>
    </html>
  );
}
