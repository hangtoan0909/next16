export const normalizeNumber = (value?: string): string => {
  return value?.replace(/\D/g, '') ?? '';
};

export const formatBusinessNumber = (value: string): string => {
  if (!value) return '-';

  const digits = value.replace(/\D/g, '');

  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
};

export const formatBankNumber = (value: string): string => {
  if (!value) return '-';

  const digits = value.replace(/\D/g, '');

  if (digits.length <= 3) return digits;
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 9)}-${digits.slice(9)}`;
};
