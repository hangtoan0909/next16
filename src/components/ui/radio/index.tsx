'use client';

import type { RadioGroupProps } from 'antd';
import { Radio } from 'antd';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type OptionType = {
  label: string;
  value: string | number;
};

type AppRadioProps = Omit<RadioGroupProps, 'options'> & {
  options?: (OptionType | string | number)[];
  namespace?: string;
  isKey?: boolean; // true → label là key dịch, false → giữ nguyên
};

export const AppRadio = ({ options = [], namespace = 'common', isKey = true, ...rest }: AppRadioProps) => {
  const t = useTranslations(namespace);

  const processedOptions = useMemo(
    () =>
      options.map((o) =>
        typeof o === 'string' || typeof o === 'number'
          ? { label: isKey ? t(String(o)) : o, value: o }
          : { ...o, label: isKey ? t(String(o.label)) : o.label }
      ),
    [options, t, isKey]
  );

  return (
    <Radio.Group className='app-radio-group' {...rest}>
      {processedOptions.map((opt) => (
        <Radio key={opt.value} value={opt.value}>
          {opt.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};
