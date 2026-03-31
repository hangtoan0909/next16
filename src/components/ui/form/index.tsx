'use client';

import type { ColProps, FormItemProps, RowProps } from 'antd';
import { Col, Form, Row } from 'antd';
import { useTranslations } from 'next-intl';
import { Fragment, PropsWithChildren, ReactNode } from 'react';

type RuleCustom = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  whitespace?: boolean;
  labelRequired?: boolean;
};

export interface FormItemType {
  formItemProps: FormItemProps & RuleCustom;
  component?: ReactNode;
  colProps?: ColProps;
  renderText?: string | boolean;
}

type Props = {
  data: FormItemType[];
  rowProps?: RowProps;
};

export const FormTextDisplay = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        height: 50,
        display: 'flex',
        alignItems: 'center',
        color: 'var(--gray)',
        fontSize: '16px',
      }}
    >
      {children ?? '-'}
    </div>
  );
};

export const GeneratedFormFields = ({ data, rowProps }: Props) => {
  const Wrapper = rowProps ? Row : Fragment;
  const t = useTranslations('common');

  return (
    <Wrapper {...rowProps}>
      {data.map(({ formItemProps, colProps, component, renderText }, index) => {
        const { required, labelRequired, whitespace, minLength, maxLength, rules, name, label, ...restForm } =
          formItemProps;

        const allRules = [
          ...(required
            ? [
                {
                  required: true,
                  message: t('validate.required', {
                    field: label as string,
                  }),
                },
              ]
            : []),
          ...(whitespace ? [{ whitespace: true, message: t('validate.all_space') }] : []),
          ...(maxLength
            ? [
                {
                  min: minLength ?? 1,
                  max: maxLength,
                  message: t('validate.min_max_length', { min: minLength ?? 1, max: maxLength }),
                },
              ]
            : []),
          ...(rules ?? []),
        ];

        return (
          <Col {...colProps} key={`${name}-${index}`}>
            <Form.Item {...restForm} name={name} label={label} rules={allRules} required={labelRequired}>
              {renderText ? (
                <Form.Item noStyle shouldUpdate>
                  {({ getFieldValue }) => (
                    <FormTextDisplay>
                      {typeof renderText === 'string' ? renderText : getFieldValue(name)}
                    </FormTextDisplay>
                  )}
                </Form.Item>
              ) : (
                component
              )}
            </Form.Item>
          </Col>
        );
      })}
    </Wrapper>
  );
};
