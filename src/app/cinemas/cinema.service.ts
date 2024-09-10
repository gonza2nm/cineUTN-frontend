import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Cinema, ResponseCinema, ResponseWithError } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class CinemaService {

  readonly apiUrl = 'http://localhost:3000/api/cinemas';

  constructor(private http: HttpClient) { }

  getAllCinemas(): Observable<ResponseCinema | ResponseWithError> {
    return this.http
      .get<ResponseCinema>(this.apiUrl)  //Realiza la solicitud GET y espera una respuesta de tipo ResponseCinema
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Si el error es un error de cliente o de red
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      // Si el error proviene del backend
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Devuelve un Observable con un mensaje de error para mostrar al usuario
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
