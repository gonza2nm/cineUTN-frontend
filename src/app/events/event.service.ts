import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../interfaces/event.interface.js';
import { ResponseList } from '../interfaces/response-list.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';
import { ResponseOne } from '../interfaces/response-one.interface.js';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  readonly apiUrl = `${environment.apiBaseUrl}/events`;

  //HttpClient Se inyecta en el servicio a través del constructor para que pueda usarse dentro de los métodos del servicio
  constructor(private http: HttpClient) { }


  getAllEvents(): Observable<any> {
    return this.http
      .get<ResponseList<Event> | ResponseWithError>(this.apiUrl)
  }

  getOneEvent(id: number): Observable<any> {
    return this.http
      .get<ResponseOne<Event> | ResponseWithError>(`${this.apiUrl}/${id}`)
  }

  getEventsByCinema(cinemaId: number) {
    return this.http
      .get<ResponseList<Event> | ResponseWithError>(`${this.apiUrl}/cinema/${cinemaId}`)
  }

  updateEvent(id: number, event: Event): Observable<any> {
    return this.http
      .put<ResponseOne<Event> | ResponseWithError>(`${this.apiUrl}/${id}`, event)
  }

  addEvent(event: Event): Observable<any> {
    return this.http
      .post<ResponseOne<Event> | ResponseWithError>(this.apiUrl, event)
  }

  deleteEvent(id: number): Observable<any> {
    return this.http
      .delete<ResponseOne<Event> | ResponseWithError>(`${this.apiUrl}/${id}`)
  }
}
