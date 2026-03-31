import type { RuleObject } from 'antd/es/form';
import type { NamePath, StoreValue } from 'antd/es/form/interface';

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD_STRONG_REGEX: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
  NAME_REGEX: /^(?!\s*$)[A-Za-z\uAC00-\uD7A3\u1100-\u11FF\u3131-\u318E ]{2,20}$/u,
  PHONE_NUMBER_REGEX: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  CAR_NUMBER_REGEX: /^(?=.*[0-9])(?=.*[가-힣])[가-힣0-9]{7,8}$/,
  PASSWORD_MIN_LENGTH: 8,
  MAX_TEXT_INPUT_LENGTH: 256,
  ONLY_NUMBER: /^[0-9]+$/,
  ONLY_10_DIGITS: /^\d{12}$/,
  BUSINESS_REGISTRATION_FORMAT: /^\d{3}-\d{2}-\d{5}$/,
  WEB_REGEX: /^(?:(?:https?:\/\/)?(?:www\.)?)[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:[\/?#][^\s]*)?$/,

  isEmailValid: (email: string): boolean => {
    return VALIDATION_RULES.EMAIL_REGEX.test(email);
  },

  isCarNumberValid: (carNumber: string): boolean => {
    return VALIDATION_RULES.CAR_NUMBER_REGEX.test(carNumber);
  },

  isPasswordStrong: (password: string): boolean => {
    return VALIDATION_RULES.PASSWORD_STRONG_REGEX.test(password);
  },

  isPhoneNumberValid: (phoneNumber: string): boolean => {
    return VALIDATION_RULES.PHONE_NUMBER_REGEX.test(phoneNumber);
  },

  isPasswordConfirm:
    (fieldName: NamePath, message: string) =>
    ({ getFieldValue }: { getFieldValue: (name: NamePath) => StoreValue }) => ({
      validator(_: RuleObject, value: StoreValue) {
        if (!value || value === getFieldValue(fieldName)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(message));
      },
    }),
};
