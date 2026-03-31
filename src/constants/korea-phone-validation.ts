'use client';

import { RuleObject } from 'antd/es/form';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const isKoreanPhone = (_rule: RuleObject, value?: string): Promise<void> => {
  if (!value) return Promise.resolve();

  // Kiểm tra dấu + chỉ được phép ở đầu, các ký tự khác phải hợp lệ
  const validPhoneRegex = /^\+?[0-9\s\-$$$$]+$/;
  if (!validPhoneRegex.test(value)) {
    return Promise.reject(new Error('validate.korea_phone'));
  }

  try {
    const number = phoneUtil.parse(value, 'KR');

    if (phoneUtil.isValidNumberForRegion(number, 'KR')) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('validate.korea_phone'));
  } catch {
    return Promise.reject(new Error('validate.korea_phone'));
  }
};
