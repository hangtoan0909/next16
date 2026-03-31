import { vehicleUserAPI } from '@/api/services';
import { useAppMutation, useAppQuery } from '@/hooks/react-query';
import { VehiclePayloadType, VehicleVerifyType } from '@/types';

export const useGetVehicles = (enabled: boolean = true) =>
  useAppQuery({
    queryKey: ['user_my_vehicle'],
    queryFn: () => vehicleUserAPI.list(),
    enabled,
  });

export const useAddVehicle = () => useAppMutation((payload: VehiclePayloadType) => vehicleUserAPI.add(payload));

export const useSetVehiclePrimary = () => useAppMutation((id: string) => vehicleUserAPI.set_primary(id));

export const useDeleteVehicle = () => useAppMutation((id: string) => vehicleUserAPI.delete(id));

export const useVerifyVehicle = () => useAppMutation((params: VehicleVerifyType) => vehicleUserAPI.verify(params));
