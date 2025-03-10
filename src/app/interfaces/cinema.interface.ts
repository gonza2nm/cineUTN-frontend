import { Movie } from "./movie.interface.js";
import { Theater } from "./theater.interface.js";

export interface Cinema {
  id: number;
  name: string;
  address: string;
  theaters: Theater[];
  movies: Movie[];
}