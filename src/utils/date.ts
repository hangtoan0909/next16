import { cookies } from '@/utils/cookies';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isToday from 'dayjs/plugin/isToday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useTranslations } from 'next-intl';

dayjs.extend(isBetween);
dayjs.extend(isToday);
dayjs.extend(localizedFormat);
dayjs.extend(isSameOrAfter);

export const isValidDate = (dateInput: string | Date | dayjs.Dayjs | undefined | null): boolean => {
  if (!dateInput) {
    return false;
  }

  if (typeof dateInput === 'string') {
    // Kiểm tra chuỗi theo định dạng YYYY/MM/DD
    if (!/^\d{4}\/\d{2}\/\d{2}$/.test(dateInput)) return false;
    return dayjs(dateInput, 'YYYY/MM/DD', true).isValid();
  }

  if (dateInput instanceof Date) {
    return !isNaN(dateInput.getTime());
  }

  // Trường hợp là dayjs object
  if (dayjs.isDayjs(dateInput)) {
    return dateInput.isValid();
  }

  return false; // Các trường hợp khác trả về false
};

/**
 * Tính số ngày giữa hai ngày.
 * @param startDate Ngày bắt đầu (chuỗi, Date object, hoặc Day.js object).
 * @param endDate Ngày kết thúc (chuỗi, Date object, hoặc Day.js object).
 * @returns Số ngày giữa hai ngày (làm tròn lên), hoặc null nếu ngày không hợp lệ.
 */
export const getDaysBetween = (
  startDate: string | Date | dayjs.Dayjs,
  endDate: string | Date | dayjs.Dayjs
): number | null => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (!start.isValid() || !end.isValid()) {
    return null;
  }

  // diff với đơn vị 'day' và true để tính số ngày làm tròn lên (ceil)
  return Math.ceil(end.diff(start, 'day', true));
};

/**
 * Kiểm tra xem một ngày có phải là hôm nay hay không.
 * @param dateInput Ngày cần kiểm tra.
 * @returns True nếu là hôm nay, ngược lại là false.
 */
export const isDateToday = (dateInput: string | Date | dayjs.Dayjs): boolean => {
  const date = dayjs(dateInput);
  if (!date.isValid()) {
    return false;
  }
  return date.isToday();
};

/**
 * Lấy ngày hiện tại.
 * @returns Đối tượng Day.js của ngày hiện tại.
 */
export const getCurrentDate = (): dayjs.Dayjs => {
  return dayjs();
};

/**
 * Thêm số lượng đơn vị thời gian vào một ngày.
 * @param dateInput Ngày bắt đầu.
 * @param amount Số lượng cần thêm.
 * @param unit Đơn vị thời gian (year, month, day, hour, minute, second).
 * @returns Đối tượng Day.js mới sau khi thêm.
 */
export const addTimeToDate = (
  dateInput: string | Date | dayjs.Dayjs,
  amount: number,
  unit: dayjs.ManipulateType
): dayjs.Dayjs => {
  const date = dayjs(dateInput);
  if (!date.isValid()) {
    return dayjs(); // Trả về ngày hiện tại hoặc ném lỗi
  }
  return date.add(amount, unit);
};

/**
 * Trừ số lượng đơn vị thời gian từ một ngày.
 * @param dateInput Ngày bắt đầu.
 * @param amount Số lượng cần trừ.
 * @param unit Đơn vị thời gian (year, month, day, hour, minute, second).
 * @returns Đối tượng Day.js mới sau khi trừ.
 */
export const subtractTimeFromDate = (
  dateInput: string | Date | dayjs.Dayjs,
  amount: number,
  unit: dayjs.ManipulateType
): dayjs.Dayjs => {
  const date = dayjs(dateInput);
  if (!date.isValid()) {
    return dayjs();
  }
  return date.subtract(amount, unit);
};

// disable date select future
export const disableFutureDate = (current: Dayjs | null): boolean => {
  return current ? current.isAfter(dayjs(), 'day') : false;
};

// disable date select future
export const disableFromCurrentDate = (current: Dayjs | null): boolean => {
  return current ? current.isSameOrAfter(dayjs(), 'day') : false;
};

// disable date select pass
export const disablePassDate = (current: Dayjs | null): boolean => {
  return current ? current.isBefore(dayjs(), 'day') : false;
};

export const disableBeforeTomorrow = (current: Dayjs | null): boolean => {
  if (!current) return false;

  return current.isBefore(dayjs().add(1, 'day'), 'day');
};

export const getFormattedTime = (): { time: string; text: string; greeting: string } => {
  const locale = cookies.get('NEXT_LOCALE');
  const now = dayjs().locale(locale as string);
  const hour = now.hour();

  let greeting = '';
  if (hour < 12) greeting = 'morning';
  else if (hour < 18) greeting = 'afternoon';
  else greeting = 'evening';

  return {
    time: now.format('h:mm'),
    text: now.format('a'),
    greeting,
  };
};
export const useFormatKoreanDate = () => {
  const t = useTranslations('common');

  const formatKoreanDate = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';

    const days = t.raw('day') as Record<string, string>;
    const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = days[dayKeys[date.getDay()]];

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ( ${dayName} )`;
  };

  return formatKoreanDate;
};
