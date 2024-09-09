// Permiten definir el tipo de datos que se espera recibir. Es util para usarlos en los observables ej: GetAllCinemas(): Observable<Cinema[]> {}. Aca estamos diciendo que esperamos un observable que emitira un arreglo de elementos de tipo Cinema

export interface ResponseWithError {
  message: string;
  error: string;
}
export interface ResponseCinema {
  message: string;
  data: Cinema[];
}
export interface ReponseSingleCinema {
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
