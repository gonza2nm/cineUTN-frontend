import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ResponseCinema,
  ResponseGenre,
  ResponseMovie,
  ResponseWithError,
  ReponseSingleCinema,
} from './interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  readonly urlCines = 'http://localhost:3000/api/cinemas';
  readonly urlMovies = 'http://localhost:3000/api/movies';
  readonly urlGenres = 'http://localhost:3000/api/genres';
  constructor(private http: HttpClient) {}

  getCinemas(): Observable<ResponseCinema | ResponseWithError> {
    return this.http.get<ResponseCinema | ResponseWithError>(this.urlCines);
  }
  getCinema(id: number): Observable<ReponseSingleCinema | ResponseWithError> {
    return this.http.get<ReponseSingleCinema | ResponseWithError>(
      `${this.urlCines}/${id}?genres=all`
    );
  }
  getGenres(): Observable<ResponseGenre | ResponseWithError> {
    return this.http.get<ResponseGenre | ResponseWithError>(this.urlGenres);
  }
  getMovies(): Observable<ResponseMovie | ResponseWithError> {
    return this.http.get<ResponseMovie | ResponseWithError>(this.urlMovies);
  }
}
