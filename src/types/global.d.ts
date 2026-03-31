declare module '*.scss';
declare module '*.sass';
declare module '*.css';
declare module '@/styles/*.scss';

export type PaginationSortParamsType = {
  page: number;
  limit: number;
  sortBy?: string;
  sortField?: Key;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ResponseData<T, K extends string = 'data'> = Record<K, T>;

export type ResponseDataList<T, K extends string = 'items'> = {
  data: ResponseData<T, K> & { meta: PaginationMeta };
};

export type OptionType = {
  label: string;
  value: string | number;
};

export type UploadValueType = {
  url: string;
  fileName: string;
  fileSize: number;
};
