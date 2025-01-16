import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, ResponseList, ResponseOne, ResponseWithError } from '../interfaces/interfaces.js';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  readonly apiUrl = 'http://localhost:3000/api/events';

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
