import { RESPONSE_CODE } from '@/constants';
import { useToastContext } from '@/hooks/toast/use-toast-context';
import { ApiError, BaseErrorHandlerOptions, ServerError } from '@/types';

type LoadErrorArgs = {
  error: ApiError;
  options?: BaseErrorHandlerOptions;
};

/**
 * Hook chung để tải và xử lý các lỗi từ server hoặc client.
 */
export default function useLoadError() {
  const { toast } = useToastContext();
  const loadError = (args: LoadErrorArgs) => {
    const { error, options } = args;
    const { showToast = true, showToastUnAuthor } = options || {};

    if (!error) return;

    // Xử lý lỗi client-side (ví dụ: lỗi mạng, request bị hủy bởi người dùng)
    // const isClientError = !Object.prototype.hasOwnProperty.call(error, 'response') && error.statusText === '';

    // if (isClientError) {
    //   if (error.message === 'canceled') return; // Không hiển thị lỗi khi request bị hủy

    //   if (showToast) {
    //     toast('error', {
    //       description:
    //         error.message || 'There was a network error or the request was canceled. Please check your connection.',
    //     });
    //   }
    //   return;
    // }

    // Xử lý lỗi BAD_REQUEST (400)
    if (
      error.status === RESPONSE_CODE.BAD_REQUEST ||
      error.status === RESPONSE_CODE.PERMISSION ||
      (showToastUnAuthor && error.status === RESPONSE_CODE.UNAUTHORIZED)
    ) {
      const serverError = error.data as ServerError;
      const message = serverError?.message;

      if (showToast && typeof message === 'string') {
        toast('error', { description: message });
      }

      return;
    }

    // Xử lý lỗi SERVER_ERROR (500) và các lỗi không được xử lý cụ thể
    // Lỗi VALIDATION_ERROR (422) sẽ được xử lý riêng ở tầng gọi nếu có form
    // if (showToast) {
    //   const serverError = error.data as ServerError;
    //   toast('error', {
    //     description: serverError?.message || 'An error occurred on the server. Please try again later.',
    //   });
    // }
  };

  return { loadError };
}
