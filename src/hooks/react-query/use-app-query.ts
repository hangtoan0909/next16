import { ApiError, UseAppQueryResult } from '@/types';
import {
  QueryClient,
  QueryKey,
  QueryObserverResult,
  UseQueryOptions,
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import useQueryErrorHandler from './error-handler/use-query-error';

export function useAppQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryOptions: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient
): UseAppQueryResult<TData, TError> {
  const { handleQueryError } = useQueryErrorHandler();

  const query = useQuery(
    {
      placeholderData: keepPreviousData,
      ...queryOptions,
    },
    queryClient
  );

  const safeRefetch: UseAppQueryResult<TData, TError>['refetch'] = (
    ...args: Parameters<UseQueryResult<TData, TError>['refetch']>
  ): Promise<QueryObserverResult<TData, TError> | void> => {
    if (!query.isRefetching) {
      return query.refetch(...args);
    }
    return Promise.resolve();
  };

  // if (query.isError) {
  //   handleQueryError({ error: query.error as ApiError });
  // }

  useEffect(() => {
    if (query.isError && query.error) {
      handleQueryError({ error: query.error as unknown as ApiError });
    }
  }, [query.isError, query.error, handleQueryError]);

  return { ...query, refetch: safeRefetch };
}
