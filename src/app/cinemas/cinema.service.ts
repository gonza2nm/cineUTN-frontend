import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseOne,Cinema, ResponseList, ResponseWithError} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})

export class CinemaService {

  readonly apiUrl = 'http://localhost:3000/api/cinemas';

  //HttpClient Se inyecta en el servicio a través del constructor para que pueda usarse dentro de los métodos del servicio
  constructor(private http: HttpClient) { }

  //el Observable emitirá un objeto de tipo ResponseList<Cinema> si la solicitud es exitosa o ResponseWithError si ocurre un error.
  getAllCinemas(): Observable<ResponseList<Cinema> | ResponseWithError> {
    return this.http
      .get<ResponseList<Cinema>>(this.apiUrl)  //Realiza la solicitud GET y espera una respuesta de tipo ResponseList<Cinema>
  }

  getOneCinema(id: number): Observable<ResponseOne<Cinema> | ResponseWithError> {
    return this.http
      .get<ResponseOne<Cinema>>(`${this.apiUrl}/${id}`)
  }

  updateCinema(id: number, cinema: Cinema): Observable<ResponseOne<Cinema> | ResponseWithError> {
    return this.http
      .put<ResponseOne<Cinema>>(`${this.apiUrl}/${id}`, cinema)
  }

  addCinema(cinema: Cinema): Observable<ResponseOne<Cinema> | ResponseWithError> {
    return this.http
      .post<ResponseOne<Cinema>>(this.apiUrl, cinema) //no hace falta el `${}` porque no se incluye ningun valor dinamico en al url
  }

  deleteCinema(id: number): Observable<ResponseOne<Cinema> | ResponseWithError> {
    return this.http
      .delete<ResponseOne<Cinema>>(`${this.apiUrl}/${id}`)
  }
}
