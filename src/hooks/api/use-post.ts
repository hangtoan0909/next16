import { getPosts } from '@/api/services';
import { useAppMutation, useAppQuery } from '@/hooks/react-query';

export const useGetPosts = (params: unknown) =>
  useAppQuery({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
  });

export const useAddPostMutation = () =>
  useAppMutation(() => getPosts({}), {
    onErrorOptions: {
      showToast: false,
    },
  });
