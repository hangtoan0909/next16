import { uploadAPI } from '@/api/services';
import { useAppMutation } from '../react-query';

export const useUploadImage = () => useAppMutation((payload: FormData) => uploadAPI.IMAGE(payload));
