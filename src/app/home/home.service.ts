import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {
  ResponseCinema,
  ResponseMovie,
  ResponseWithError,
  ResponseSingleCinema,
  ResponseGenre,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  readonly urlCines = 'http://localhost:3000/api/cinemas';
  readonly urlMovies = 'http://localhost:3000/api/movies';
  readonly urlGenres = 'http://localhost:3000/api/genres';
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  getCinemas(): Observable<ResponseCinema | ResponseWithError> {
    return this.http
      .get<ResponseCinema | ResponseWithError>(this.urlCines)
      .pipe(catchError(this.handleError));
  }
  getGenres(): Observable<ResponseGenre | ResponseWithError> {
    return this.http
      .get<ResponseGenre | ResponseWithError>(this.urlGenres)
      .pipe(catchError(this.handleError));
  }
  /*
  la diferencia entre el codigo que no esta comentado y el que esta comentado
  es que el que esta comentado permite ver la url a la que se le esta haciendo la peticion
  junto con los parametros, encambio la otra no, ya que encrypta la url
  */
  getCinema(
    id: number,
    populate: string
  ): Observable<ResponseSingleCinema | ResponseWithError> {
    populate = populate.trim();

    const options = populate
      ? { params: new HttpParams().set('genres', populate) }
      : {};
    return this.http
      .get<ResponseSingleCinema | ResponseWithError>(
        `${this.urlCines}/${id}`,
        options
      )
      .pipe(catchError(this.handleError));
    /*
    return this.http.get<ReponseSingleCinema | ResponseWithError>(
      `${this.urlCines}/${id}?genres=all`
    );
    */
  }
  getMovies(): Observable<ResponseMovie | ResponseWithError> {
    return this.http
      .get<ResponseMovie | ResponseWithError>(this.urlMovies)
      .pipe(catchError(this.handleError));
  }
}
