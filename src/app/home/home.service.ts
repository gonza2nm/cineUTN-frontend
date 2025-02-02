import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseList, ResponseWithError, ResponseOne, Cinema, Genre, Movie } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  //Produccion
  readonly urlCines = 'https://cineutn-backend-deploy.onrender.com/api/cinemas';
  readonly urlMovies = 'https://cineutn-backend-deploy.onrender.com/api/movies';
  readonly urlGenres = 'https://cineutn-backend-deploy.onrender.com/api/genres';
  //Desarrollo
  //readonly urlCines = 'http://localhost:3000/api/cinemas';
  //readonly urlMovies = 'http://localhost:3000/api/movies';
  //readonly urlGenres = 'http://localhost:3000/api/genres';

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
