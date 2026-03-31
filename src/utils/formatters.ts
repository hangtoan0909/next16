import { DATE_FORMAT } from '@/constants';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Định dạng một số thành chuỗi tiền tệ.
 * @param amount Số tiền.
 * @param currency Mã tiền tệ (ví dụ: "VND", "USD").
 * @param locale Mã ngôn ngữ (ví dụ: "vi-VN", "en-US").
 * @returns Chuỗi tiền tệ đã định dạng.
 */
export const formatCurrency = (amount: number, currency: string = 'VND', locale: string = 'vi-VN'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0, // Không hiển thị số thập phân nếu là số nguyên
    maximumFractionDigits: 2, // Tối đa 2 số thập phân
  }).format(amount);
};

/**
 * Định dạng một số lớn thành chuỗi ngắn gọn (ví dụ: 1234567 -> "1.2M").
 * @param num Số cần định dạng.
 * @returns Chuỗi ngắn gọn.
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

/**
 * Định dạng một chuỗi bằng cách viết hoa chữ cái đầu tiên.
 * @param str Chuỗi cần định dạng.
 * @returns Chuỗi đã viết hoa chữ cái đầu tiên.
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// default render value table
export const displayValue = (value?: string) => (value ? String(value) : '-');

// Format date
export const formatDate = (value?: string | Date, formatType: keyof typeof DATE_FORMAT = 'BASIC') => {
  if (!value) return '-';

  let date = dayjs(value);

  if (typeof value === 'string' && !value.endsWith('Z')) {
    date = dayjs.utc(value);
  }

  date = date.tz(dayjs.tz.guess());

  return date.format(DATE_FORMAT[formatType]);
};

export const formatDateRange = (rangeDate?: [Dayjs | null, Dayjs | null], format: string = 'YYYY-MM-DDTHH:mm:ss') => {
  if (!rangeDate) return [undefined, undefined];

  const [startDate, endDate] = rangeDate;

  return [
    startDate ? dayjs(startDate).startOf('day').format(format) : undefined,
    endDate ? dayjs(endDate).endOf('day').format(format) : undefined,
  ];
};

const phoneUtil = PhoneNumberUtil.getInstance();

export const formatPhoneNumberToLocalDigits = (phoneNumber: string) => {
  try {
    const parsedNumber = phoneUtil.parse(phoneNumber, 'KR');
    return phoneUtil.isValidNumber(parsedNumber)
      ? phoneUtil.format(parsedNumber, PhoneNumberFormat.NATIONAL).replace(/[^0-9]/g, '')
      : '';
  } catch {
    return '';
  }
};

export const formatKoreanPhoneNumber = (phoneNumber?: string): string => {
  if (!phoneNumber) return '-';

  const digits = phoneNumber ? phoneNumber.replace(/[^0-9]/g, '') : '';
  try {
    const phoneNumber = phoneUtil.parse(digits, 'KR');
    if (phoneUtil.isValidNumber(phoneNumber)) {
      return phoneUtil.format(phoneNumber, PhoneNumberFormat.NATIONAL);
    }
    return digits;
  } catch {
    return digits;
  }
};

// Format Number
export const formatNumber = (num?: number) => {
  if (num == null) return '0';

  const rounded = Math.round(num * 10) / 10; // làm tròn 1 chữ số
  return Number.isInteger(rounded)
    ? rounded.toLocaleString('ko-KR') // số nguyên
    : rounded.toLocaleString('ko-KR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); // 1 chữ số thập phân
};

export const maskPhoneLast4 = (phone?: string): string => {
  if (!phone) return '';

  const digits = phone.replace(/\D/g, '');

  if (digits.length <= 4) return digits;

  return `***-****-${digits.slice(-4)}`;
};
