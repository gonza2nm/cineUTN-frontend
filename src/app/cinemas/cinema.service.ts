import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseSingleCinema, ResponseCinema, ResponseWithError, Cinema } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class CinemaService {

  readonly apiUrl = 'http://localhost:3000/api/cinemas';

  //HttpClient Se inyecta en el servicio a través del constructor para que pueda usarse dentro de los métodos del servicio
  constructor(private http: HttpClient) { }

  //el Observable emitirá un objeto de tipo ResponseCinema si la solicitud es exitosa o ResponseWithError si ocurre un error.
  getAllCinemas(): Observable<ResponseCinema | ResponseWithError> {
    return this.http
      .get<ResponseCinema>(this.apiUrl)  //Realiza la solicitud GET y espera una respuesta de tipo ResponseCinema
      .pipe(catchError(this.handleError)); //Si hay un error, llama al método handleError, .pipe() se usa para transformar o manejar el flujo del Observable.
  }

  getOneCinema(id: number): Observable<ResponseSingleCinema | ResponseWithError> {
    return this.http
      .get<ResponseSingleCinema>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));

  }

  updateCinema(id: number, cinema: Cinema): Observable<ResponseSingleCinema | ResponseWithError> {
    return this.http
      .put<ResponseSingleCinema>(`${this.apiUrl}/${id}`, cinema)
      .pipe(catchError(this.handleError));
  }

  addCinema(cinema: Cinema): Observable<ResponseSingleCinema | ResponseWithError> {
    return this.http
      .post<ResponseSingleCinema>(this.apiUrl, cinema) //no hace falta el `${}` porque no se incluye ningun valor dinamico en al url
      .pipe(catchError(this.handleError));
  }

  deleteCinema(id: number): Observable<ResponseSingleCinema | ResponseWithError> {
    return this.http
      .delete<ResponseSingleCinema>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError))
  }

  // HttpErrorResponse contiene info sobre el error HTTP
  private handleError(error: HttpErrorResponse) {
    // Si el código de estado es 0, indica que ocurrió un error en la red o en el lado del cliente
    if (error.status === 0) {
      console.error('An error occurred:', error.error); //se muestra el error
    } else {
      // Si el código de estado no es 0, entonces se considera un error en el servidor (404, 500, etc.)
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Emite un Observable con un mensaje de error(los que procese arriba) para mostrar al usuario. Es lo que captura la parte de (error) en el componente.S
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
