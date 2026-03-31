import { DATE_FORMAT } from '@/constants';
import { Input } from 'antd';
import { PatternFormat } from 'react-number-format';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export const AppDateInput = ({ value, onChange }: Props) => {
  return (
    <PatternFormat
      format='####/##/##'
      placeholder={DATE_FORMAT.SLASH}
      mask='-'
      customInput={Input}
      value={value}
      onValueChange={(values) => {
        onChange?.(values.formattedValue);
      }}
    />
  );
};
