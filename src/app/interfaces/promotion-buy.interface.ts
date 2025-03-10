import { Buy } from "./buy.interface.js";
import { Promotion } from "./promotion.interface.js";

export interface PromotionBuy {
  id: number;
  buy: Buy;
  promotion: Promotion;
  quantity: number;
}