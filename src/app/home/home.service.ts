import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ResponseCinema,
  ResponseMovie,
  ResponseWithError,
  ReponseSingleCinema,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  readonly urlCines = 'http://localhost:3000/api/cinemas';
  readonly urlMovies = 'http://localhost:3000/api/movies';
  constructor(private http: HttpClient) {}

  getCinemas(): Observable<ResponseCinema | ResponseWithError> {
    return this.http.get<ResponseCinema | ResponseWithError>(this.urlCines);
  }
  getCinema(id: number): Observable<ReponseSingleCinema | ResponseWithError> {
    return this.http.get<ReponseSingleCinema | ResponseWithError>(
      `${this.urlCines}/${id}?genres=all`
    );
  }
  getMovies(): Observable<ResponseMovie | ResponseWithError> {
    return this.http.get<ResponseMovie | ResponseWithError>(this.urlMovies);
  }
}
