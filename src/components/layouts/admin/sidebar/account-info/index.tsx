'use client';

import { useAuthStore } from '@/stores';
import { formatKoreanPhoneNumber } from '@/utils';
import Image from 'next/image';
import styles from './styles.module.scss';

const SPECIALIZATIONS = ['차량점검', '엔진오일', '자격증1', '자격증2', '부가 서비스', '부 서비스'];

export function SidebarAccountInfo() {
  const inspectionInfo = useAuthStore((state) => state.inspection);
  return (
    <div className={styles.account}>
      <div className={styles.info}>
        <Image
          alt='Avatar'
          src='https://cdn.ohanapreschool.edu.vn/wp-content/uploads/2025/11/anh-gai-xinh-2k5.webp'
          width={40}
          height={40}
          unoptimized
        />

        <div className={styles.detail}>
          <span className={styles.name}>{inspectionInfo?.businessName}</span>
          <span className={styles.address}>서울시 강남구 테헤란로 123 </span>
          <span className={styles.phone}>{formatKoreanPhoneNumber(inspectionInfo?.businessPhone ?? '')}</span>
        </div>
      </div>

      <div className={styles.specialization}>
        {SPECIALIZATIONS.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
}
