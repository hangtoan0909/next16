import { DATE_FORMAT } from '@/constants';
import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const AppDatePicker = ({ ...rest }: DatePickerProps) => {
  return <AntdDatePicker format={DATE_FORMAT.BASIC} placeholder={DATE_FORMAT.BASIC} {...rest} />;
};

export const BaseRangePicker = ({ ...rest }: RangePickerProps) => {
  return (
    <AntdDatePicker.RangePicker
      className='app-rangepicker'
      separator={<span className='range-picker-separator'>~</span>}
      format={DATE_FORMAT.BASIC}
      placeholder={[DATE_FORMAT.BASIC, DATE_FORMAT.BASIC]}
      {...rest}
    />
  );
};

AppDatePicker.RangePicker = BaseRangePicker;
