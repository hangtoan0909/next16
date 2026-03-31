'use client';

import { AppButton, AppInput, AppPagination, FormItemType, GeneratedFormFields } from '@/components/ui';
import { PAGINATION_DEFAULT, SORT } from '@/constants';
import { useMounted } from '@/hooks/utils/use-mounted';
import { Form, PaginationProps, Table, TableProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { SorterResult, SortOrder } from 'antd/es/table/interface';
import { FormInstance } from 'antd/lib';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import React, { Key, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';

type SortValue = SORT | undefined;

interface TableAction {
  text: string;
  onClick?: (selectedRowKeys?: Key[]) => void;
  disabled?: boolean;
  requireSelection?: boolean;
}

interface AppTableProps<T extends object = Record<string, unknown>, K extends object = Record<string, unknown>>
  extends TableProps<K> {
  rowKey?: string | ((record: K) => Key);
  pagination?: PaginationProps;
  filter?: {
    data: FormItemType[];
    initValue?: T;
    onFilter?: (value: T) => void;
    onChange?: (form: FormInstance<T>, key?: string) => void;
  };
  onSort?: (field?: Key, order?: SortValue) => void;
  btnActions?: TableAction[];
  showTotal?: boolean;
  showHeader?: boolean;

  /** Checkbox row selection */
  rowSelectionEnabled?: boolean;
  selectedKeys?: Key[];
  onSelectedKeysChange?: (selectedRowKeys: Key[], selectedRows: K[]) => void;
  getRowDisabled?: (record: K) => boolean;

  /** Search input */
  isSearch?: boolean;
  keySearch?: string;
}

type TableIndexProps = {
  index: number;
  page?: number;
  pageSize?: number;
  style?: React.CSSProperties;
};

/** format AntD sort order -> custom SORT enum */
const formatSortTable = (value?: SortOrder): SortValue => {
  if (value === 'ascend') return SORT.ASC;
  if (value === 'descend') return SORT.DESC;
  return undefined;
};

const scrollToTableTop = () => {
  const tableBody = document.querySelector('.app-table .ant-table-body');
  tableBody?.scrollTo({ top: 0, behavior: 'smooth' });
};

export function AppTable<T extends object, K extends object>({
  pagination,
  filter,
  isSearch = true,
  onSort,
  btnActions = [],
  showTotal = false,
  showHeader = true,
  columns,
  dataSource,
  rowSelectionEnabled = false,
  selectedKeys = [],
  onSelectedKeysChange,
  getRowDisabled,
  rowKey = 'id',
  keySearch = 'keyword',
  ...rest
}: AppTableProps<T, K>) {
  const [form] = useForm<T>();
  const t = useTranslations('common');
  const pathName = usePathname();
  const paramsURL = useParams();
  const mounted = useMounted();

  const [tableHeight, setTableHeight] = useState<number>(0);

  // ✅ NEW: search state (không auto-filter khi onChange nữa)
  const [searchValue, setSearchValue] = useState<string>('');

  /**
   * ✅ Debounce chỉ áp dụng cho filter fields (GeneratedFormFields)
   * Search input sẽ filter khi click nút Search / Enter
   */
  const handleFilterDebounce = useMemo(
    () =>
      debounce((values: T) => {
        filter?.onFilter?.(values);
        scrollToTableTop();
      }, 500),
    [filter]
  );

  // ✅ click/enter để search
  const handleSearch = () => {
    const currentValues = form.getFieldsValue() as Record<string, unknown>;

    filter?.onFilter?.({
      ...(currentValues as T),
      [keySearch]: searchValue,
    } as T);

    scrollToTableTop();
  };

  // ✅ cleanup debounce khi unmount
  useEffect(() => {
    return () => {
      handleFilterDebounce.cancel();
    };
  }, [handleFilterDebounce]);

  useEffect(() => {
    const calcHeight = () => {
      const getHeight = (selector: string) =>
        (document.querySelector(selector) as HTMLElement | null)?.offsetHeight ?? 0;

      let totalOffset = 0;

      if (pathName.startsWith('/tablet')) {
        totalOffset =
          getHeight('.app-layout-content-header') + // header layout
          getHeight('.app-table-header') + // filter / action header
          getHeight('.app-pagination') + // pagination
          135;
      } else {
        totalOffset =
          getHeight('.app-layout-content-header') + // header layout
          getHeight('.app-table-header') + // filter / action header
          getHeight('.app-pagination') + // pagination
          100;
      }

      setTableHeight(window.innerHeight - totalOffset);
    };

    const timeout = setTimeout(calcHeight, 200);

    window.addEventListener('resize', calcHeight);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', calcHeight);
    };
  }, [pagination?.total, pathName]);

  /** reset form when route changes */
  useEffect(() => {
    if (filter) form.resetFields();
    setSearchValue(''); // ✅ reset search luôn khi đổi route
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName, paramsURL, form]);

  /** rowSelection config */
  const rowSelection = rowSelectionEnabled
    ? {
        fixed: 'left' as const,
        preserveSelectedRowKeys: true,
        selectedRowKeys: selectedKeys,
        onChange: (keys: Key[], rows: K[]) => {
          onSelectedKeysChange?.(keys, rows);
        },
        getCheckboxProps: (record: K) => ({
          disabled: getRowDisabled?.(record) ?? false,
        }),
      }
    : undefined;

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* HEADER */}
      {showHeader && (
        <div className={classNames(styles.header, 'app-table-header')}>
          <div className={styles.left}>
            {showTotal && (
              <p className={styles.count}>
                {t('table.total')} <span>{pagination?.total}</span>
              </p>
            )}

            {/* FILTER FIELDS */}
            {filter && (
              <Form
                form={form}
                layout='horizontal'
                initialValues={filter.initValue}
                onValuesChange={(changes) => {
                  filter.onChange?.(form, Object.keys(changes)[0]);
                  handleFilterDebounce(form.getFieldsValue() as T);
                }}
              >
                {filter.data.length > 0 && <GeneratedFormFields data={filter.data} rowProps={{ gutter: 10 }} />}
              </Form>
            )}

            {/* ✅ SEARCH INPUT + BUTTON (click/enter mới search) */}
            {filter && isSearch && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <AppInput.Search
                  style={{ width: 225 }}
                  className='app-table-input-search'
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onPressEnter={handleSearch}
                />

                <AppButton size='small' width={57} onClick={handleSearch}>
                  {t('button.search')}
                </AppButton>

                <AppButton
                  size='small'
                  type='text'
                  width={69}
                  onClick={() => {
                    form.resetFields();
                    setSearchValue('');
                    filter?.onFilter?.({
                      ...(filter.initValue as T),
                      [keySearch]: '',
                    } as T);
                    scrollToTableTop();
                  }}
                >
                  {t('button.reset')}
                </AppButton>
              </div>
            )}
          </div>

          <div className={styles.right}>
            {btnActions.length > 0 && (
              <div className={styles.btnActions}>
                {btnActions.map(({ text, onClick, disabled, requireSelection }) => (
                  <AppButton
                    size='small'
                    key={text}
                    onClick={() => onClick?.(selectedKeys)}
                    disabled={disabled || (requireSelection && selectedKeys.length === 0)}
                  >
                    {text}
                  </AppButton>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* BODY */}
      <div className={styles.body}>
        <Table<K>
          className='app-table'
          rowKey={rowKey}
          columns={columns}
          pagination={false}
          showSorterTooltip={false}
          dataSource={dataSource}
          scroll={{
            scrollToFirstRowOnChange: true,
            x: 'max-content',
            y: tableHeight,
          }}
          rowSelection={rowSelection}
          locale={{
            emptyText: !rest.loading && (
              <div className={styles.empty}>
                <p>{t('no_data')}</p>
              </div>
            ),
          }}
          onChange={(_, __, sorter: SorterResult<K> | SorterResult<K>[]) => {
            if (!Array.isArray(sorter)) {
              onSort?.(sorter.field as Key, formatSortTable(sorter.order));
            }
          }}
          {...rest}
        />

        {/* PAGINATION */}
        {(pagination?.total ?? 0) > PAGINATION_DEFAULT.PAGE_SIZE && (
          <AppPagination
            align='center'
            pageSize={PAGINATION_DEFAULT.PAGE_SIZE}
            {...pagination}
            onChange={(page, pageSize) => {
              pagination?.onChange?.(page, pageSize);
              scrollToTableTop();
            }}
          />
        )}
      </div>
    </div>
  );
}

/** Component render index (STT) */
export const TableIndex: React.FC<TableIndexProps> = ({
  index,
  page = 0,
  pageSize = PAGINATION_DEFAULT.PAGE_SIZE,
  style,
}) => {
  const no = page * pageSize + index + 1;
  return <span style={{ fontWeight: 700, ...style }}>{no}</span>;
};
