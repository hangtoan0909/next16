export type SearchCarType = {
  plate: string;
  owner_name: string;
  vehicle_type: number;
};

export type InfoCarType = {
  owner_name: string;
  plate: string;
  car_name: string;
  vehicle_type_id: number;
  vehicle_type: string;
};

export type VehicleType = {
  id: number;
  name: string;
};

export type VerìfyUserPhonePayload = {
  phoneNumber: string;
};

export type UserSignUpPayloadType = {
  name?: string;
  phoneNumber: string;
  ownerName: string;
  plate: string;
  vehicleLoadTypeId: number;
  agreements: Re;
};
