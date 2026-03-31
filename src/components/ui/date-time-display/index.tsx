import { formatDate } from '@/utils';

export const DateTimeDisplay = (value?: string | Date) =>
  value ? (
    <div style={{ fontSize: 16, lineHeight: 1.5 }}>
      <div>{formatDate(value, 'BASIC')}</div>
      <div>{formatDate(value, 'TIME')}</div>
    </div>
  ) : (
    '-'
  );
