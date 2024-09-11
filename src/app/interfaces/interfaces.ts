export interface ResponseWithError {
  message: string;
  error: string;
}
export interface ResponseCinema {
  message: string;
  data: Cinema[];
}
export interface ResponseSingleCinema {
  message: string;
  data: Cinema;
}
export interface ResponseGenre {
  message: string;
  data: Genre[];
}
export interface ResponseMovie {
  message: string;
  data: Movie[];
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
  format: string;
  imageLink: string;
  genres: Genre[];
}
