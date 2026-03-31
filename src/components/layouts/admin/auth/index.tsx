'use client';

import LoginBackgroundImage from '@/assets/images/inspection_login_bg.png';
import { Col, Row } from 'antd';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

export const AdminAuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.wrapper}>
      <Row>
        <Col xs={24} md={12} className={styles.image} span={12}>
          <Image src={LoginBackgroundImage.src} alt='Background' layout='fill' unoptimized />
        </Col>
        <Col xs={24} md={12} className={styles.form}>
          {children}
        </Col>
      </Row>
    </div>
  );
};
