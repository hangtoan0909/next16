type VehicleBase = {
  name: string;
  licensePlate: string;
  manufacturer: string;
  model: string;
  vehicleSize: string;
  vinNumber: string;
  vehicleLoadTypeId: number;
};

export type VehicleItemType = {
  id?: string;
  owner_name: string;
  ownerName: string;
  plate: string;
  vin: string;
  spec_id: string;
  model_name: string;
  modelName: string;
  model_year: number;
  color: string;
  mileage: number;
  fuelType: string;
  engineCC: string;
  isPrimary?: boolean;
  vehicleLoadTypeId: number;
};

export type VehiclePayloadType = VehicleVerifyType & {
  vehicleLoadTypeId: number;
};

export type VehicleVerifyType = {
  plate: string;
  ownerName: string;
};
