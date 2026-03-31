import { API_ROUTES } from '@/constants';
import { ResponseData, UploadValueType } from '@/types';
import { backendApi } from '../axios';

export const uploadAPI = {
  IMAGE: (payload: FormData) =>
    backendApi.post<FormData, ResponseData<UploadValueType>>(API_ROUTES.UPLOAD.IMAGE, payload),
};
