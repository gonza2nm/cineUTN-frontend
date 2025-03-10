import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseList } from '../interfaces/response-list.interface.js';
import { Movie } from '../interfaces/movie.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';
import { ResponseOne } from '../interfaces/response-one.interface.js';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  readonly urlMovies = `${environment.apiBaseUrl}/movies`;

  //HttpClient Se inyecta en el servicio a través del constructor para que pueda usarse dentro de los métodos del servicio
  constructor(private http: HttpClient) { }


  getNextReleases(): Observable<any> {
    return this.http.get<ResponseList<Movie> | ResponseWithError>(`${this.urlMovies}/next-releases`);
  }


  getAllMovies(): Observable<any> {
    return this.http
      .get<ResponseList<Movie> | ResponseWithError>(this.urlMovies)
  }

  getOneMovie(id: number): Observable<any> {
    return this.http
      .get<ResponseOne<Movie> | ResponseWithError>(`${this.urlMovies}/${id}`)
  }

  updateMovie(id: number, movie: Movie): Observable<any> {
    return this.http
      .put<ResponseOne<Movie> | ResponseWithError>(`${this.urlMovies}/${id}`, movie)
  }

  addMovie(movie: Movie): Observable<any> {
    return this.http
      .post<ResponseOne<Movie> | ResponseWithError>(this.urlMovies, movie)
  }

  deleteMovie(id: number): Observable<any> {
    return this.http
      .delete<ResponseOne<Movie> | ResponseWithError>(`${this.urlMovies}/${id}`)
  }
}
