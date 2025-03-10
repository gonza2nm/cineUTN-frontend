import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseList } from '../interfaces/response-list.interface.js';
import { Cinema } from '../interfaces/cinema.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';
import { Genre } from '../interfaces/genre.interface.js';
import { ResponseOne } from '../interfaces/response-one.interface.js';
import { Movie } from '../interfaces/movie.interface.js';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  readonly urlCines = `${environment.apiBaseUrl}/cinemas`;
  readonly urlMovies = `${environment.apiBaseUrl}/movies`;
  readonly urlGenres = `${environment.apiBaseUrl}/genres`;

  constructor(private http: HttpClient) { }

  getCinemas(): Observable<any> {
    return this.http.get<ResponseList<Cinema> | ResponseWithError>(this.urlCines);
  }

  getGenres(): Observable<any> {
    return this.http.get<ResponseList<Genre> | ResponseWithError>(this.urlGenres);
  }

  getCinema(
    id: number,
    populate: string
  ): Observable<any> {
    populate = populate.trim();

    const options = populate
      ? { params: new HttpParams().set('genres', populate) }
      : {};
    return this.http.get<ResponseOne<Cinema> | ResponseWithError>(`${this.urlCines}/${id}`, options);
    /* 
    lo de arriba es lo mismo que hacer esto:
    return this.http.get<ReponseSingleCinema | ResponseWithError>(
      `${this.urlCines}/${id}?genres=all`
    );
    */
  }

  getMovies(): Observable<any> {
    return this.http.get<ResponseList<Movie> | ResponseWithError>(this.urlMovies);
  }
}
