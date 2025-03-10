import { Show } from "./show.interface.js";

export interface Seat {
  id: number;
  seatNumber: string;
  status: string;
  show: Show;
}