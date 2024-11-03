import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cinema, Format, Language, Movie, ResponseList, ResponseOne, ResponseWithError, Show} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  movieData!: Show;

  readonly urlShows = 'http://localhost:3000/api/shows';
  readonly urlMovies = 'http://localhost:3000/api/movies'
  readonly urlLanguages = 'http://localhost:3000/api/languages'
  readonly urlFormats = 'http://localhost:3000/api/formats'
  readonly urlCinemas = 'http://localhost:3000/api/cinemas'

  constructor(private http: HttpClient) { }

  getAllCinemasByMovie(movieId: number) {
    return this.http.get<ResponseList<Cinema>>(`${this.urlCinemas}/movie/${movieId}`).pipe(map(response=> response.data));
  }
  getOneCinema(id: number){
    return this.http.get<ResponseOne<Cinema>>(`${this.urlCinemas}/${id}`).pipe(map(response=> response.data));
  }
  getMovieDetails(id: number){
    return this.http.get<ResponseOne<Movie>>(`${this.urlMovies}/${id}`).pipe(map(response=> response.data));
  }
  getAllFormats(){
    return this.http.get<ResponseList<Format>>(this.urlFormats).pipe(map(response=> response.data));
  }
  getAllLanguages(){
    return this.http.get<ResponseList<Language>>(this.urlLanguages).pipe(map(response=> response.data));
  }
  getAllShowsByMovieAndCinema(movieID: number, cinemaID: number){
    return this.http.post<ResponseList<Show>>(`${this.urlShows}/showtimes`,{
      movieId: movieID,
      cinemaId: cinemaID
    }).pipe(map(response=> response.data));
  }

  //-----------------------------------------------------------------------

  //Comunicacion con buy.component.ts -----------------------------------


  getShowHourAndDay(show: Show){
    let date = new Date(show.dayAndTime)
    let hour = date.getHours().toString().padStart(2,'0');
    let minutes = date.getMinutes().toString().padStart(2,'0');
    const dateString = `${hour}:${minutes}`
    return dateString
  }

  getFormattedWeekday(show: Date) {
    const fecha = new Date(show);
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    // Obtener los valores de día de la semana, día del mes y mes
    const diaSemana = diasSemana[fecha.getDay()];
    const diaMes = fecha.getDate(); 
    const mes = fecha.getUTCMonth() + 1;
    const fechaFormateada = `${diaSemana} ${diaMes}/${mes}`;
    return fechaFormateada
  }

  setMovieData(show: Show) {
    this.movieData = show;
  }
  
  getMovieData(): Show {
    return this.movieData;
  }
}
