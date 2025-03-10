import { Cinema } from "./cinema.interface.js";
import { Format } from "./format.interface.js";
import { Genre } from "./genre.interface.js";
import { Language } from "./language.interface.js";

export interface Movie {
  id: number;
  name: string;
  duration: number;
  description: string;
  imageLink: string;
  genres: Genre[];
  cinemas: Cinema[];
  formats: Format[];
  languages: Language[];
}