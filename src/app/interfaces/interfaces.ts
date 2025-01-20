export interface ResponseWithError {
  message: string;
  error: string;
}
export interface ResponseList<T> {
  message: string;
  data: T[];
}
export interface ResponseOne<T> {
  message: string;
  data: T;
}
export interface Cinema {
  id: number;
  name: string;
  address: string;
  theaters: Theater[];
  movies: Movie[];
}
export interface Genre {
  id: number;
  name: string;
}
export interface Theater {
  id: number;
  numChairs: number;
  cinema: number;
}
export interface Movie {
  id: number;
  name: string;
  description: string;
  imageLink: string;
  genres: Genre[];
  cinemas: Cinema[];
  formats: Format[];
  languages: Language[];
}
export interface Show {
  id: number;
  dayAndTime: Date;
  finishTime: Date;
  theater: Theater;
  movie: Movie;
  tickets: Ticket[];
  format: Format;
  language: Language;
}
export interface Format {
  id: number;
  formatName: string;
}
export interface Language {
  id: number;
  languageName: string;
}
export interface Ticket {
  id: number;
  show: Show;
  buy: Buy;
}
export interface Buy {
  id: number;
  description: string;
  total: number;
  fechaHora: Date;
  user: User;
  status: string;
  tickets: Ticket[];
}
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
export interface Event {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  finishDate: Date;
  cinemas: Cinema[];
}

export interface Promotion {
  code: number;
  name: string;
  description: string;
  startDate: Date;
  finishDate: Date;
  discount: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  urlPhoto: string;
}

