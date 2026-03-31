'use client';

import CloseIcon from '@/assets/icons/close_20.svg';
import { useEffect, useRef, useState } from 'react';
import { Sheet, type SheetProps, type SheetRef } from 'react-modal-sheet';
import { ActionButtonsProps, AppActionButtons } from '../action-buttons';

interface BottomSheetProps extends SheetProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: ActionButtonsProps;
  showHeader?: boolean;
}

export function AppBottomSheet({
  isOpen,
  onClose,
  title,
  children,
  actions,
  showHeader = true,
  snapPoints = [0, 300, 1],
  initialSnap,
  ...rest
}: BottomSheetProps) {
  const [mountPoint, setMountPoint] = useState<HTMLElement | null>(null);

  const sheetRef = useRef<SheetRef>(null);

  const lastSnap = snapPoints.length - 1;

  const defaultButtonProps = {
    type: 'primary',
    size: 'middle',
  } as const;

  useEffect(() => {
    setMountPoint(document.querySelector('.app-layout-user') as HTMLElement);
  }, []);

  if (!mountPoint) return null;

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={snapPoints as number[]}
      initialSnap={initialSnap ?? lastSnap} // ✅ mở full từ đầu
      detent='content'
      mountPoint={mountPoint}
      className='app-bottom-sheet'
      {...rest}
    >
      <Sheet.Container>
        {showHeader && (
          <Sheet.Header className='app-bottom-sheet-header'>
            <span className='text-body2-bold'>{title}</span>

            <span onClick={onClose}>
              <CloseIcon />
            </span>
          </Sheet.Header>
        )}

        <Sheet.Content className='app-bottom-sheet-content' disableScroll={(state) => state.currentSnap !== lastSnap}>
          {/* BODY */}
          <div className='app-bottom-sheet-body'>{children}</div>

          {/* FOOTER (sticky) */}
          {actions && (
            <div className='app-bottom-sheet-footer'>
              <AppActionButtons
                {...actions}
                cancelProps={{
                  ...defaultButtonProps,
                  ...(actions.cancelProps ?? {}),
                }}
                saveProps={{
                  ...defaultButtonProps,
                  ...(actions.saveProps ?? {}),
                }}
              />
            </div>
          )}
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
}
