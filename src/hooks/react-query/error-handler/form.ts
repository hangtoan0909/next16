import { ValidationError } from '@/types';
import { FormInstance } from 'antd';
import find from 'lodash/find';
import forEach from 'lodash/forEach';

export const attachErrorsIntoForm = (data: ValidationError, form: FormInstance) => {
  const formValues = form.getFieldsValue();

  forEach(formValues, (_: unknown, key: string) => {
    const info = find(data.detail, (item) => item.field === key);
    if (info) {
      form.setFields([
        {
          name: key,
          errors: [info.message],
        },
      ]);
    }
  });
};
