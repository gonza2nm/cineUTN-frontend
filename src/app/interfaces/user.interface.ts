import { Buy } from "./buy.interface.js";
import { Cinema } from "./cinema.interface.js";

export interface User {
  id: number;
  dni: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  type: "user" | "manager";
  cinema?: Cinema; //Opcionales por si es user
  buys: Buy[]; //Opcionales por si es manager
}