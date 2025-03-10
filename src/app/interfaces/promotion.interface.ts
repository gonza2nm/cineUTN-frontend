import { Cinema } from "./cinema.interface.js";
import { Snack } from "./snack.interface.js";

export interface Promotion {
  code: string;
  name: string;
  description: string;
  promotionStartDate: Date;
  promotionFinishDate: Date;
  price: number;
  cinemas: Cinema[];
  snacks: Snack[];
}