import { Model } from "./Model";
import { VehicleFeature } from "./VehicleFeature";

export class Vehicle {
  id: number;

  model: Model;
  modelId: number;

  isRegistered: boolean;

  contactName: string;
  contactEmail: string;
  contactPhone: string;

  lastUpdate: Date;

  vehicleFeature: VehicleFeature[];
}