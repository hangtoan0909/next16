'use client';
import { Input } from 'antd';
import { InputProps } from 'antd/lib';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import React, { useCallback, useEffect, useState } from 'react';

interface KoreanPhoneInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
}

const phoneUtil = PhoneNumberUtil.getInstance();

const formatKoreanPhoneNumber = (input: string): string => {
  const digits = input ? input.replace(/[^0-9]/g, '') : '';
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

export const AppKoreanPhoneInput: React.FC<KoreanPhoneInputProps> = ({ value = '', onChange, ...rest }) => {
  const [inputValue, setInputValue] = useState(value);

  const updateValue = useCallback(
    (newValue: string) => {
      setInputValue(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateValue(e.target.value);
    },
    [updateValue]
  );

  const handleInputBlur = useCallback(() => {
    if (inputValue) {
      const formattedValue = formatKoreanPhoneNumber(inputValue);
      updateValue(formattedValue);
    }
  }, [inputValue, updateValue]);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(formatKoreanPhoneNumber(value));
    }
  }, [value, inputValue]);

  return <Input type='tel' value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} {...rest} />;
};
