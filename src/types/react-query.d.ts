import {
  DefaultError,
  QueryKey,
  QueryObserverResult,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { FormInstance } from 'antd';

export interface ServerError {
  code: API_RETURN_CODE;
  message: string;
  status?: number;
}

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export interface ValidationError extends ServerError {
  detail: ValidationErrorDetail[];
}

export interface ApiError extends DefaultError {
  status?: number;
  data?: ServerError | ValidationError;
  statusText?: string;
}

// Global Error Handling Options
export interface BaseErrorHandlerOptions {
  showToast?: boolean;
  showToastUnAuthor?: boolean;
}

// Options cho Mutation Error Handler
export interface MutationErrorHandlerOptions extends BaseErrorHandlerOptions {
  form?: FormInstance; // Form chỉ liên quan đến Mutation Validation
}

// Options cho App Mutation Hook
export interface UseAppMutationProps<TData, TError, TVariables, TContext> {
  queryOptions?: UseMutationOptions<TData, TError, TVariables, TContext>;
  onErrorOptions?: MutationErrorHandlerOptions; // Tùy chọn truyền cho error handler
}

// Types cho App Query Hook
export type UseAppQueryResult<TData, TError> = Omit<UseQueryResult<TData, TError>, 'refetch'> & {
  refetch: (
    ...args: Parameters<UseQueryResult<TData, TError>['refetch']>
  ) => Promise<QueryObserverResult<TData, TError> | void>;
};

export interface UseAppQueryProps<TQueryFnData, TError, TData, TQueryKey extends QueryKey> {
  onErrorOptions?: BaseErrorHandlerOptions; // Tùy chọn truyền cho error handler
  queryOptions?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
}
