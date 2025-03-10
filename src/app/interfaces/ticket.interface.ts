import { Buy } from "./buy.interface.js";
import { Seat } from "./seat.interface.js";
import { Show } from "./show.interface.js";

export interface Ticket {
  id: number;
  show: Show;
  buy: Buy;
  seat: Seat
}