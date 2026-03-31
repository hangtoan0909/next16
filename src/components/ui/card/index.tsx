import { Card, CardProps } from 'antd';
import classNames from 'classnames';

export const AppCard = ({ className, ...rest }: CardProps) => {
  return <Card className={classNames('app-card', className)} {...rest} />;
};
