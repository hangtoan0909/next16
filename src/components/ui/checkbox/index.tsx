import { Checkbox } from 'antd';
import type { CheckboxGroupProps, CheckboxOptionType, CheckboxProps } from 'antd/es/checkbox';
import { useTranslations } from 'next-intl';
import React, { ReactNode, useMemo } from 'react';

type Props = {
  value?: string[];
  onChange?: (value: string[]) => void;
  options: CheckboxOptionType[];
  namespace?: string;
  showAll?: boolean;
  allLabel?: string;
  isKey?: boolean; // true: dịch theo key, false: giữ nguyên
} & Omit<CheckboxGroupProps, 'options' | 'onChange'>;

export const AppCheckbox = ({ ...rest }: CheckboxProps) => <Checkbox {...rest} />;

export const AppCheckboxGroup: React.FC<Props> = ({
  value = [],
  onChange,
  options,
  namespace = 'common',
  showAll = false,
  allLabel,
  isKey = true,
  ...rest
}) => {
  const t = useTranslations(namespace);
  const tCommon = useTranslations('common');

  /**
   * Safe translate:
   * - Nếu label là ReactNode → không dịch
   * - Nếu label là string → dịch nếu isKey=true
   * - Nếu label là number → convert sang string và dịch
   */
  const translateLabel = (label: ReactNode | undefined): ReactNode => {
    if (React.isValidElement(label)) return label; // JSX giữ nguyên
    if (typeof label === 'string') return isKey ? t(label) : label;
    if (typeof label === 'number') return isKey ? t(String(label)) : String(label);
    return label ?? '';
  };

  const displayOptions: CheckboxOptionType[] = useMemo(
    () =>
      options.map((o) => {
        if (typeof o === 'string' || typeof o === 'number') {
          return {
            label: translateLabel(o),
            value: String(o),
          };
        }

        return {
          ...o,
          value: typeof o.value === 'number' ? String(o.value) : o.value,
          label: translateLabel(o.label),
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options, t, isKey]
  );

  const allValues = useMemo(() => displayOptions.map((o) => String(o.value)), [displayOptions]);
  const checkAll = value.length === allValues.length;

  const handleCheckAll = (checked: boolean) => {
    onChange?.(checked ? allValues : []);
  };

  return (
    <div className='app-checkbox-group'>
      {showAll && (
        <Checkbox checked={checkAll} onChange={(e) => handleCheckAll(e.target.checked)}>
          {allLabel ?? tCommon('filter.all')}
        </Checkbox>
      )}

      <Checkbox.Group value={value} onChange={(v) => onChange?.(v as string[])} {...rest}>
        {displayOptions.map(({ value, label, ...others }) => (
          <Checkbox key={String(value)} required={value} value={value} {...others}>
            {label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
};
