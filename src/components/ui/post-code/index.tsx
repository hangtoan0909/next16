'use client';

import AddressSearchIcon from '@/assets/icons/inspection-center/search-address.svg';
import CurrentLocation from '@/components/features/user/find-a-inspection-center/current-location';
import { AppBottomSheet, AppButton, AppInput, TruncatedText } from '@/components/ui';
import { Flex } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';
import DaumPostcodeEmbed, { Address, useDaumPostcodePopup } from 'react-daum-postcode';

type PostcodeValue = {
  full: string;
  jibunAddress: string;
  roadAddress: string;
};

type KoreaPostcodeProps = {
  value?: string;
  onChange?: (value: PostcodeValue) => void;
  allowSearch?: boolean;
  className?: string;
  mode?: 'window' | 'bottom-sheet';
};

const SCRIPT_URL = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const buildFullAddress = (data: Address) => {
  const jibunAddress =
    data.jibunAddress && data.jibunAddress.trim() !== '' ? data.jibunAddress : data.autoJibunAddress || '';

  const roadAddress = data.roadAddress || '';

  let full = data.address || '';
  let extra = '';

  if (data.addressType === 'R') {
    if (data.bname) extra += data.bname;
    if (data.buildingName) {
      extra += extra ? `, ${data.buildingName}` : data.buildingName;
    }
    if (extra) full += ` (${extra})`;
  }

  return {
    full,
    jibunAddress,
    roadAddress,
  };
};

export const KoreaPostcode: React.FC<KoreaPostcodeProps> = ({
  value,
  onChange,
  allowSearch = true,
  className,
  mode = 'window',
}) => {
  const t = useTranslations('common');
  const popupOpen = useDaumPostcodePopup(SCRIPT_URL);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSelectAddress = useCallback(
    (data: Address) => {
      const result = buildFullAddress(data);
      onChange?.(result);
    },
    [onChange]
  );

  const handleOpen = () => {
    if (!allowSearch) return;

    if (mode === 'window') {
      popupOpen({ onComplete: handleSelectAddress });
    } else {
      setSheetOpen(true);
    }
  };

  const handleCompleteEmbed = (data: Address) => {
    handleSelectAddress(data);
    setSheetOpen(false);
  };

  // TRIGGERS
  const WindowTrigger = (
    <div style={{ display: 'flex', gap: 15 }}>
      <AppInput value={value} disabled placeholder={t('placeholder.postal_code')} />
      <AppButton className={className} size='small' type='primary' onClick={handleOpen} disabled={!allowSearch}>
        {t('app.address_search')}
      </AppButton>
    </div>
  );

  const BottomSheetTrigger = (
    <Flex gap={8}>
      <AppButton type='text' width='100%' onClick={handleOpen}>
        <span style={{ flexShrink: 0 }}>
          <AddressSearchIcon />
        </span>
        <TruncatedText text={value || '주소 및 건물명 검색'} />
      </AppButton>

      <CurrentLocation
        onLocation={(value) => {
          console.log(value);
        }}
      />
    </Flex>
  );

  return (
    <>
      {mode === 'window' ? WindowTrigger : BottomSheetTrigger}

      {mode === 'bottom-sheet' && (
        <AppBottomSheet title='주소 검색' isOpen={sheetOpen} onClose={() => setSheetOpen(false)}>
          <div style={{ height: 520 }}>
            <DaumPostcodeEmbed onComplete={handleCompleteEmbed} style={{ width: '100%', height: '100%' }} />
          </div>
        </AppBottomSheet>
      )}
    </>
  );
};
