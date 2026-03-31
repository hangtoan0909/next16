import { ApiError, UseAppMutationProps } from '@/types';
import { DefaultError, MutationFunction, useMutation, UseMutationResult } from '@tanstack/react-query';
import useMutationErrorHandler from './error-handler/use-mutation-error';

export function useAppMutation<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  props?: UseAppMutationProps<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { handleMutationError } = useMutationErrorHandler();

  const mutation = useMutation({
    ...props?.queryOptions,
    mutationFn,
    onError: (error) => {
      handleMutationError({
        error: error as unknown as ApiError,
        options: props?.onErrorOptions,
      });
    },
  });

  const safeMutate = (...args: Parameters<typeof mutation.mutate>) => {
    if (!mutation.isPending) {
      return mutation.mutate(...args);
    }
    return Promise.resolve();
  };

  return { ...mutation, mutate: safeMutate };
}
