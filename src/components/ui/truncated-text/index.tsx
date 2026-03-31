import { Tooltip } from 'antd';
import { JSX } from 'react';

interface TruncatedTextProps<T extends keyof JSX.IntrinsicElements = 'span'> {
  as?: T;
  text?: string;
  width?: string | number;
  lineClamp?: number;
  fallback?: React.ReactNode;
  elementProps?: JSX.IntrinsicElements[T];
}

export const TruncatedText = <T extends keyof JSX.IntrinsicElements = 'span'>(props: TruncatedTextProps<T>) => {
  const { as, text, width = 'fit-content', lineClamp = 1, fallback = '-', elementProps } = props;

  if (!text?.trim()) return <>{fallback}</>;

  const Tag = (as || 'span') as React.ElementType; // 👈 cast kiểu này

  const style: React.CSSProperties = {
    maxWidth: width,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '0',
    WebkitLineClamp: lineClamp,
    whiteSpace: 'normal',
  };

  return (
    <Tooltip title={text}>
      <Tag style={style} {...elementProps}>
        {text}
      </Tag>
    </Tooltip>
  );
};
