import { PatternFormat, PatternFormatProps } from 'react-number-format';

interface KoreanPhoneNumberInputProps extends Omit<PatternFormatProps, 'onChange' | 'format' | 'mask'> {
  onChange?: (value: string) => void;
  value?: string;
}

export const AppPhoneInput = ({ onChange, value, ...rest }: KoreanPhoneNumberInputProps) => {
  const determineFormat = (input: string) => {
    const cleaned = input.replace(/\D/g, '');
    const length = cleaned.length;

    if (cleaned.startsWith('02')) {
      if (length < 3) return '###';
      if (length < 6) return '##-####';
      return length === 10 ? '##-####-####' : '##-###-#####';
    } else {
      if (length < 4) return '####';
      if (length < 7) return '###-####';
      return length === 11 ? '###-####-####' : length === 10 ? '###-###-#####' : '###-###-####';
    }
  };

  return (
    <PatternFormat
      value={value}
      onValueChange={(values) => onChange && onChange(values.formattedValue.replace(/_+$/, '').trim())}
      format={determineFormat(value ?? '')}
      className='app-korea-phone'
      autoComplete='off'
      {...rest}
    />
  );
};
