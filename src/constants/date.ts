export const DATE_FORMAT = {
  // Ngày
  BASIC: 'YYYY-MM-DD', // 2025-08-25
  SLASH: 'YYYY/MM/DD', // 2025/08/25
  DOT: 'YYYY.MM.DD', // 2025.08.25
  SHORT: 'YY-MM-DD', // 25-08-25
  SHORT_SLASH: 'YY/MM/DD', // 25/08/25
  MONTH_DAY: 'M/D', // 11/29
  YEAR: 'YYYY년',
  KOREA_DATE: 'YYYY년 M월 D일',
  // Giờ
  TIME: 'HH:mm', // 13:45
  TIME_SECONDS: 'HH:mm:ss', // 13:45:30
  TIME_12H: 'hh:mm A', // 01:45 PM

  // Ngày + Giờ
  DATE_TIME: 'YYYY-MM-DD HH:mm', // 2025-08-25 13:45
  DATE_TIME_SECONDS: 'YYYY-MM-DD HH:mm:ss', // 2025-08-25 13:45:30
  DATE_TIME_SLASH: 'YYYY/MM/DD HH:mm', // 2025/08/25 13:45

  READABLE: 'DD MMM YYYY', // 25 Aug 2025
  READABLE_TIME: 'DD MMM YYYY HH:mm', // 25 Aug 2025 13:45
  FULL: 'dddd, DD MMMM YYYY HH:mm', // Monday, 25 August 2025 13:45

  // Date + day
  DATE_DAY: 'YYYY.MM.dd', // 2025-09-23
};

export const KO_WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;
