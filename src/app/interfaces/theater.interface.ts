import { Cinema } from "./cinema.interface.js";

export interface Theater {
  id: number;
  numChairs: number;
  cantRows: number;
  cantCols: number;
  cinema: Cinema;
}