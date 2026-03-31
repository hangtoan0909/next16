import { RESPONSE_CODE } from '@/constants';
import { ApiError, MutationErrorHandlerOptions, ValidationError } from '@/types';
import { attachErrorsIntoForm } from './form';
import useLoadError from './use-load-error';

type MutationErrorArgs = {
  error: ApiError;
  options?: MutationErrorHandlerOptions;
};

export default function useMutationErrorHandler() {
  const { loadError } = useLoadError();

  const handleMutationError = (args: MutationErrorArgs) => {
    const { error, options } = args;
    const { form } = options || {};

    if (!error) return;

    // Xử lý lỗi VALIDATION_ERROR (422) và gắn vào form
    if (form && error.status === RESPONSE_CODE.VALIDATION_ERROR) {
      const validationError = error.data as ValidationError;
      attachErrorsIntoForm(validationError, form);
      return;
    }

    // Đối với các loại lỗi khác, chuyển giao cho useLoadError xử lý
    loadError(args);
  };

  return { handleMutationError };
}
