import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cinema, Format, Language, Movie, ResponseList, ResponseOne, ResponseWithError} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

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
}
