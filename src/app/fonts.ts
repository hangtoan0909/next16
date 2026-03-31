import localFont from 'next/font/local';

export const gMarketFont = localFont({
  src: [
    { path: '../../public/fonts/GmarketSansLight.otf', weight: '400' },
    { path: '../../public/fonts/GmarketSansMedium.otf', weight: '500' },
    { path: '../../public/fonts/GmarketSansBold.otf', weight: '700' },
  ],
  variable: '--font-gmarket',
});

export const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Thin.otf',
      weight: '100',
    },
    {
      path: '../../public/fonts/Pretendard-ExtraLight.otf',
      weight: '200',
    },
    {
      path: '../../public/fonts/Pretendard-Light.otf',
      weight: '300',
    },
    {
      path: '../../public/fonts/Pretendard-Regular.otf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.otf',
      weight: '500',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.otf',
      weight: '600',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.otf',
      weight: '700',
    },
    {
      path: '../../public/fonts/Pretendard-ExtraBold.otf',
      weight: '800',
    },
    {
      path: '../../public/fonts/Pretendard-Black.otf',
      weight: '900',
    },
  ],
  variable: '--font-main',
});
