import { ChangeEvent } from 'react';
import type { InputProps } from 'antd';
import { AppInput } from '@/components/ui';

/* ================= TYPES ================= */

export type BusinessFormatType = 'RRN' | 'BRN' | 'AUTO' | 'BANK';

type Props = {
  value?: string;
  onChange?: (value?: string) => void;
  disabled?: boolean;
  formatType?: BusinessFormatType;
} & Omit<InputProps, 'value' | 'onChange'>;

/* ================= UTILS ================= */

const digitsOnly = (v?: string) => v?.replace(/\D/g, '') || '';

/* -------- RRN: XXXXXX-X -------- */
const formatRRN = (digits: string) => {
  const v = digitsOnly(digits).slice(0, 7);

  if (v.length <= 6) return v;

  return `${v.slice(0, 6)}-${v.slice(6)}`;
};

/* -------- BRN: XXX-XX-XXXXX -------- */
const formatBRN = (digits: string) => {
  const v = digitsOnly(digits).slice(0, 10);

  if (v.length <= 3) return v;
  if (v.length <= 5) return `${v.slice(0, 3)}-${v.slice(3)}`;

  return `${v.slice(0, 3)}-${v.slice(3, 5)}-${v.slice(5)}`;
};

const formatBANK = (value: string) => {
  const v = digitsOnly(value).slice(0, 14);

  if (v.length <= 3) return v;
  if (v.length <= 9) return `${v.slice(0, 3)}-${v.slice(3)}`;

  return `${v.slice(0, 3)}-${v.slice(3, 9)}-${v.slice(9)}`;
};

const formatValue = (rawValue: string, formatType: BusinessFormatType) => {
  const digits = digitsOnly(rawValue);
  if (!digits) return '';

  switch (formatType) {
    case 'RRN':
      return formatRRN(digits);

    case 'BRN':
      return formatBRN(digits);

    case 'BANK':
      return formatBANK(digits);

    default:
      // AUTO
      if (digits.length <= 7) return formatRRN(digits);
      if (digits.length <= 10) return formatBRN(digits);
      return formatBANK(digits);
  }
};

const getMaxDigits = (formatType: BusinessFormatType) => {
  if (formatType === 'RRN') return 7;
  if (formatType === 'BRN') return 10;
  if (formatType === 'BANK') return 14;
  return 10;
};

/* ================= COMPONENT ================= */

export const AppBusinessFormat = ({ value, onChange, disabled, formatType = 'AUTO', ...rest }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = digitsOnly(e.target.value);
    const max = getMaxDigits(formatType);

    onChange?.(digits.slice(0, max));
  };

  return (
    <AppInput
      {...rest}
      value={formatValue(value || '', formatType)}
      onChange={handleChange}
      disabled={disabled}
      autoComplete='off'
      inputMode='numeric'
    />
  );
};
