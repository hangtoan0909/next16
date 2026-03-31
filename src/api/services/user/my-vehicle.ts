import { backendApi } from '@/api/axios';
import { API_ROUTES } from '@/constants';
import { ResponseData, VehicleItemType, VehiclePayloadType, VehicleVerifyType } from '@/types';

export const vehicleUserAPI = {
  list: () => backendApi.get<unknown, ResponseData<VehicleItemType[]>>(API_ROUTES.USER.MY_VEHICLE.LIST),

  add: (payload: VehiclePayloadType) =>
    backendApi.post<VehiclePayloadType, unknown>(API_ROUTES.USER.MY_VEHICLE.ADD, payload),

  set_primary: (id: string) => backendApi.patch<unknown, unknown>(API_ROUTES.USER.MY_VEHICLE.PRIMARY(id)),

  delete: (id: string) => backendApi.delete<unknown, unknown>(API_ROUTES.USER.MY_VEHICLE.DELETE(id)),

  verify: (params: VehicleVerifyType) =>
    backendApi.get<VehicleVerifyType, ResponseData<VehicleItemType>>(API_ROUTES.USER.MY_VEHICLE.VERIFY, params),
};
