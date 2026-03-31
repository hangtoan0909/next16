import { Flex, Spin } from 'antd';

interface Props {
  center?: boolean;
}

export const AppLoading = ({ center }: Props) => (
  <Flex align='center' justify='center' gap='middle' style={center ? { height: 'calc(100vh - 32px)' } : {}}>
    <Spin size='large' />
  </Flex>
);
