'use client';

import ArrowDoubleLeftIcon from '@/assets/icons/arrow_double_left.svg';
import ArrowDoubleRightIcon from '@/assets/icons/arrow_double_right.svg';
import ArrowLeftIcon from '@/assets/icons/pagination/arrow_left.svg';
import ArrowRightIcon from '@/assets/icons/pagination/arrow_right.svg';
import { PAGINATION_DEFAULT } from '@/constants';
import type { PaginationProps } from 'antd';
import { Button, Pagination } from 'antd';
import classNames from 'classnames';
import styles from './styles.module.scss';

type AppPaginationProps = Omit<PaginationProps, 'current' | 'onChange'> & {
  current?: number;
  onChange?: (page: number, pageSize: number) => void;
  showDouble?: boolean;
};

export const AppPagination = ({
  current = PAGINATION_DEFAULT.PAGE, // default = 1
  total = 0,
  pageSize = PAGINATION_DEFAULT.PAGE_SIZE,
  onChange,
  showDouble = false,
  ...rest
}: AppPaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const renderBtn = (Icon: React.ElementType, onClick?: () => void, disabled?: boolean) => (
    <Button className={classNames(styles.btn, disabled && styles.disable)} onClick={onClick} disabled={disabled}>
      <Icon />
    </Button>
  );

  return (
    <div className={classNames(styles.pagination, 'app-pagination')}>
      {/* ⏮ first page */}
      {showDouble &&
        renderBtn(
          ArrowDoubleLeftIcon,
          () => onChange?.(PAGINATION_DEFAULT.PAGE, pageSize),
          current === PAGINATION_DEFAULT.PAGE
        )}

      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        showSizeChanger={false}
        onChange={(page, size) => onChange?.(page, size)}
        itemRender={(_, type, originalElement) =>
          type === 'prev'
            ? renderBtn(
                ArrowLeftIcon,
                () => onChange?.(Math.max(PAGINATION_DEFAULT.PAGE, current - PAGINATION_DEFAULT.PAGE), pageSize),
                current === PAGINATION_DEFAULT.PAGE
              )
            : type === 'next'
              ? renderBtn(
                  ArrowRightIcon,
                  () => onChange?.(Math.min(totalPages, current + PAGINATION_DEFAULT.PAGE), pageSize),
                  current === totalPages
                )
              : originalElement
        }
        {...rest}
      />

      {/* ⏭ last page */}
      {showDouble && renderBtn(ArrowDoubleRightIcon, () => onChange?.(totalPages, pageSize), current === totalPages)}
    </div>
  );
};
