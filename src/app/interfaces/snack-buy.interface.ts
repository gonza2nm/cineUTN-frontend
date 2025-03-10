import { Buy } from "./buy.interface.js";
import { Snack } from "./snack.interface.js";

export interface SnackBuy {
  id: number;
  buy: Buy;
  snack: Snack;
  quantity: number;
}