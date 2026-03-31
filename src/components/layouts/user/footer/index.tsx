'use client';

import LogoIcon from '@/assets/icons/logo.svg';
import { AppContainer } from '@/components/ui';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './styles.module.scss';

const FooterUser = () => {
  const t = useTranslations('user/home');

  return (
    <AppContainer as='footer' paddingY={40} className={classNames(styles.footer, 'app-layout-user-footer')}>
      <div className={styles.logo}>
        <LogoIcon />
      </div>

      <div className={styles.info}>
        <h5>{t('footer.search.title')}</h5>

        <ul className={styles.find}>
          <li>
            <Link href='#'>{t('footer.search.findInspectionCenter')}</Link>
          </li>
          <li>
            <Link href='#'>{t('footer.search.findCarCenter')}</Link>
          </li>
        </ul>
      </div>

      <div className={styles.info}>
        <h5>{t('footer.support.title')}</h5>

        <ul className={styles.find}>
          <li>
            <Link href='#'>{t('footer.support.blog')}</Link>
          </li>
          <li>
            <Link href='#'>{t('footer.support.faq')}</Link>
          </li>
        </ul>
      </div>

      <div className={styles.info}>
        <h5>{t('footer.company.title')}</h5>

        <ul>
          <li>
            {t('footer.company.name')}&nbsp;&nbsp;{t('footer.company.ceo')}
          </li>

          <li>
            <span>{t('footer.company.bizNumber.label')}</span> <span>{t('footer.company.bizNumber.value')}</span>
          </li>

          <li>
            <span>{t('footer.company.call.label')}</span> <span>{t('footer.company.call.value')}</span>
          </li>

          <li>
            <span>{t('footer.company.email.label')}</span> <span>{t('footer.company.email.value')}</span>
          </li>

          <li>
            <span>{t('footer.company.address.label')}</span> <span>{t('footer.company.address.value')}</span>
          </li>
        </ul>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>{t('footer.copyright')}</div>
    </AppContainer>
  );
};

export default FooterUser;
