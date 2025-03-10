import { Format } from "./format.interface.js";
import { Language } from "./language.interface.js";
import { Movie } from "./movie.interface.js";
import { Theater } from "./theater.interface.js";
import { Ticket } from "./ticket.interface.js";

export interface Show {
  id: number;
  dayAndTime: Date;
  finishTime: Date;
  duration?: number
  theater: Theater;
  movie: Movie;
  tickets: Ticket[];
  format: Format;
  language: Language;
}