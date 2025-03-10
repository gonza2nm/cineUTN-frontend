import { Cinema } from "./cinema.interface.js";

export interface Event {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  finishDate: Date;
  cinemas: Cinema[];
}
