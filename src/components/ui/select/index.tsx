import ArrowDownIcon from '@/assets/icons/arrow_down.svg';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { DefaultOptionType, LabeledValue } from 'antd/es/select';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

type ValueType = string | number | null;

type AppSelectProps = Omit<SelectProps<ValueType>, 'options' | 'value'> & {
  width?: number | string;
  namespace?: string;
  isKey?: boolean;
  hasAllOption?: boolean;
  allOptionLabel?: string;
  options: { label: React.ReactNode; value: string | number }[];
  value?: ValueType;
  labelType?: string | null;
};

export const ALL_VALUE = '__ALL__';

export const AppSelect = ({
  width,
  options = [],
  namespace = 'options',
  isKey = true,
  hasAllOption = false,
  allOptionLabel = 'all',
  onChange,
  value,
  labelType = null,
  ...rest
}: AppSelectProps) => {
  const t = useTranslations(namespace);

  const processedOptions = useMemo(() => {
    const mappedOptions: DefaultOptionType[] = options.map((option) => ({
      ...option,
      label: isKey ? t(option.label as string) : option.label,
    }));

    return hasAllOption
      ? [{ label: isKey ? t(allOptionLabel) : allOptionLabel, value: ALL_VALUE }, ...mappedOptions]
      : mappedOptions;
  }, [options, t, isKey, hasAllOption, allOptionLabel]);

  const handleChange = useCallback<NonNullable<SelectProps<ValueType>['onChange']>>(
    (val, option) => {
      const mappedValue = val === ALL_VALUE ? null : val;
      onChange?.(mappedValue, option);
    },
    [onChange]
  );

  // map value null -> ALL_VALUE để Select hiển thị đúng
  const internalValue = value === null ? ALL_VALUE : value;

  const selectedValue = useMemo<LabeledValue | undefined>(() => {
    const selectedOption = processedOptions.find((opt) => opt.value === internalValue);

    return internalValue
      ? {
          value: internalValue,
          label: labelType
            ? `${isKey ? t(labelType) : labelType}: ${selectedOption?.label ?? internalValue}`
            : selectedOption?.label,
        }
      : undefined;
  }, [internalValue, processedOptions, labelType, isKey, t]);

  const UnsafeValue = selectedValue as unknown as ValueType;

  return (
    <Select<ValueType>
      style={width ? { width } : undefined}
      maxTagCount='responsive'
      optionFilterProp='label'
      options={processedOptions}
      suffixIcon={<ArrowDownIcon />}
      onChange={handleChange}
      value={UnsafeValue}
      {...rest}
    />
  );
};
