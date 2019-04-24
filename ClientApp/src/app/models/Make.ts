import { Model } from "./Model";

export interface Make {
  id: number;
  name: string;

  models: Model[];
}