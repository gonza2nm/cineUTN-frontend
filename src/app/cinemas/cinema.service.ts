import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseOne, Cinema, ResponseList, ResponseWithError } from "../interfaces/interfaces";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CinemaService {

  readonly apiUrl = `${environment.apiBaseUrl}/cinemas`;

  //HttpClient Se inyecta en el servicio a través del constructor para que pueda usarse dentro de los métodos del servicio
  constructor(private http: HttpClient) { }

  //el Observable emitirá un objeto de tipo ResponseList<Cinema> si la solicitud es exitosa o ResponseWithError si ocurre un error.
  getAllCinemas(): Observable<any> {
    return this.http
      .get<ResponseList<Cinema> | ResponseWithError>(this.apiUrl)  //Realiza la solicitud GET y espera una respuesta de tipo ResponseList<Cinema>
  }

  getOneCinema(id: number): Observable<any> {
    return this.http
      .get<ResponseOne<Cinema> | ResponseWithError>(`${this.apiUrl}/${id}`)
  }

  updateCinema(id: number, cinema: Cinema): Observable<any> {
    return this.http
      .put<ResponseOne<Cinema> | ResponseWithError>(`${this.apiUrl}/${id}`, cinema)
  }

  addCinema(cinema: Cinema): Observable<any> {
    return this.http
      .post<ResponseOne<Cinema> | ResponseWithError>(this.apiUrl, cinema)
  }

  deleteCinema(id: number): Observable<any> {
    return this.http
      .delete<ResponseOne<Cinema> | ResponseWithError>(`${this.apiUrl}/${id}`)
  }
}
