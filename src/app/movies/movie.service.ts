import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, ResponseList, ResponseOne, ResponseWithError } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  readonly urlMovies = 'http://localhost:3000/api/movies';

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
      .post<ResponseOne<Movie> | ResponseWithError>(this.urlMovies, movie) //no hace falta el `${}` porque no se incluye ningun valor dinamico en al url
  }

  deleteMovie(id: number): Observable<any> {
    return this.http
      .delete<ResponseOne<Movie> | ResponseWithError>(`${this.urlMovies}/${id}`)
  }
}