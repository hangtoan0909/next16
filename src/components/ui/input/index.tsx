'use client';

import SearchIcon from '@/assets/icons/search.svg';
import { Input as AntdInput, InputProps } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { isNil } from 'lodash';
import { useTranslations } from 'next-intl';
import React, { Fragment, useState } from 'react';
import { InputAttributes, NumericFormat, NumericFormatProps } from 'react-number-format';
import styles from './index.module.scss';

function formatThousand(value: string) {
  if (!value) return value;

  const num = Number(value.replace(/,/g, ''));
  if (isNaN(num)) return value;

  const formatedNum = new Intl.NumberFormat('en-US').format(num);

  return formatedNum;
}

export const AppInput = ({ ...rest }: InputProps) => {
  return <AntdInput {...rest} />;
};

const TextArea = ({ ...rest }: TextAreaProps) => <AntdInput.TextArea {...rest} />;

const InputSearch = ({ ...rest }: InputProps) => {
  const t = useTranslations('common');
  return <AppInput placeholder={t('filter.search')} {...rest} prefix={<SearchIcon />} />;
};

const InputPassword = ({ ...rest }: InputProps) => {
  return <AntdInput.Password {...rest} />;
};

interface InputNumberProps extends Omit<NumericFormatProps, 'onChange'> {
  min?: number;
  max?: number;
  isDecimal?: boolean;
  onChange?: (value: string) => void;
  fallbackSymbol?: string;
}

const InputNumber = ({ min, max, isDecimal = false, onChange, value, fallbackSymbol, ...props }: InputNumberProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const shouldShowEmptyVal = (isNil(value) || value === '') && !isFocused;
  const Tag = fallbackSymbol ? 'div' : Fragment;

  return (
    <Tag className={fallbackSymbol ? styles.NumberWithFallbackWrapper : undefined}>
      <NumericFormat
        autoComplete='off'
        customInput={AppInput as React.ComponentType<InputAttributes>}
        thousandSeparator=','
        isAllowed={({ floatValue, value }) => {
          const reg = isDecimal ? /^(\d*\.?\d*|)$/ : /^\d*$/;
          if (!reg.test(value)) return false;
          if (floatValue === undefined) return true;

          const sanitizedVal = formatThousand(value);

          if (props?.maxLength && sanitizedVal.length > props?.maxLength) {
            return false;
          }

          return (min === undefined || floatValue >= min) && (max === undefined || floatValue <= max);
        }}
        onChange={(e) => {
          const inputVal = e.target.value;
          const val = inputVal.replace(/[^0-9.]/g, '');
          onChange?.(val);
        }}
        onFocus={(e) => {
          props?.onFocus?.(e);
          if (fallbackSymbol) {
            setIsFocused(true);
          }
        }}
        onBlur={(e) => {
          props?.onBlur?.(e);
          if (fallbackSymbol) {
            setIsFocused(false);
          }
        }}
        value={value}
        {...props}
      />
      {shouldShowEmptyVal && <span className={styles.FallbackValue}>{fallbackSymbol}</span>}
    </Tag>
  );
};

AppInput.TextArea = TextArea;
AppInput.Password = InputPassword;
AppInput.Number = InputNumber;
AppInput.Search = InputSearch;
