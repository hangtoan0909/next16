import { Button, ButtonProps } from 'antd';

export type AppButtonProps = ButtonProps & {
  width?: number | string;
};

export const AppButton = ({ type = 'primary', width, style, className, ...rest }: AppButtonProps) => {
  return (
    <Button
      type={type}
      className={`app-button ${className ?? ''}`}
      style={width ? { width, ...style } : style}
      {...rest}
    />
  );
};
