import { KeyValuePair } from "../interfaces/KeyValuePair";
import { ContactResource } from "./ContactResource";

export class VehicleResource {
  id: number;

  model: KeyValuePair;
  make: KeyValuePair;

  isRegistered: boolean;

  contact: ContactResource;

  lastUpdate: Date;

  vehicleFeatures: KeyValuePair[];

}