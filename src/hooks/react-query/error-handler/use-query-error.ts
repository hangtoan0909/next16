import { ApiError, BaseErrorHandlerOptions } from '@/types';
import useLoadError from './use-load-error';

type QueryErrorArgs = {
  error: ApiError;
  options?: BaseErrorHandlerOptions;
};

export default function useQueryErrorHandler() {
  const { loadError } = useLoadError();

  const handleQueryError = (args: QueryErrorArgs) => {
    loadError(args);
  };

  return { handleQueryError };
}
