import { ContactResource } from "../resources/ContactResource";

export class SaveVehicle {
  id: number;
  modelId: number;
  makeId: number;
  isRegistered: boolean;
  contact: ContactResource;
  vehicleFeatures: number[];
}