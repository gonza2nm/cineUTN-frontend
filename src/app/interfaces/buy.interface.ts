import { PromotionBuy } from "./promotion-buy.interface.js";
import { SnackBuy } from "./snack-buy.interface.js";
import { Ticket } from "./ticket.interface.js";
import { User } from "./user.interface.js";

export interface Buy {
  id: number;
  total: number;
  fechaHora: Date;
  user: User;
  status: string;
  tickets: Ticket[];
  snacksBuy: SnackBuy[];
  promotionsBuy?: PromotionBuy[];
}