import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Cinema, Format, Language, Movie, ResponseList, ResponseOne, ResponseWithError, Show } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  movieData!: Show;

  readonly urlShows = `${environment.apiBaseUrl}/shows`;
  readonly urlMovies = `${environment.apiBaseUrl}/movies`;
  readonly urlLanguages = `${environment.apiBaseUrl}/languages`;
  readonly urlFormats = `${environment.apiBaseUrl}/formats`;
  readonly urlCinemas = `${environment.apiBaseUrl}/cinemas`;

  constructor(private http: HttpClient) { }

  getAllCinemasByMovie(movieId: number) {
    return this.http.get<ResponseList<Cinema>>(`${this.urlCinemas}/movie/${movieId}`).pipe(map(response => response.data));
  }
  getOneCinema(id: number) {
    return this.http.get<ResponseOne<Cinema>>(`${this.urlCinemas}/${id}`).pipe(map(response => response.data));
  }
  getMovieDetails(id: number) {
    return this.http.get<ResponseOne<Movie>>(`${this.urlMovies}/${id}`).pipe(map(response => response.data));
  }
  getAllFormats() {
    return this.http.get<ResponseList<Format>>(this.urlFormats).pipe(map(response => response.data));
  }
  getAllLanguages() {
    return this.http.get<ResponseList<Language>>(this.urlLanguages).pipe(map(response => response.data));
  }
  getAllShowsByMovieAndCinema(movieID: number, cinemaID: number) {
    return this.http.post<ResponseList<Show>>(`${this.urlShows}/showtimes`, {
      movieId: movieID,
      cinemaId: cinemaID
    }).pipe(map(response => response.data));
  }
  getOneShow(showId: number) {
    return this.http.get<ResponseOne<Show>>(`${this.urlShows}/${showId}`).pipe(map(response => response.data));
  }

  getShowHourAndDay(show: Show) {
    let date = new Date(show.dayAndTime)
    let hour = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    const dateString = `${hour}:${minutes}`
    return dateString
  }


  getFormattedWeekday(show: Date) {
    const fecha = new Date(show);
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diaSemana = diasSemana[fecha.getDay()];
    const diaMes = fecha.getDate();
    const mes = fecha.getUTCMonth() + 1;
    const fechaFormateada = `${diaSemana} ${diaMes}/${mes}`;
    return fechaFormateada
  }

}
