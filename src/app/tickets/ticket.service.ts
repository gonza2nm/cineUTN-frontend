import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Buy, ResponseList, ResponseOne, ResponseWithError, Show, Ticket } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  readonly urlTicket = "http://localhost:3000/api/tickets"


  getTicketsByBuy(id: number): Observable<any> {
    return this.http.get<ResponseList<Ticket> | ResponseWithError>(`${this.urlTicket}/byBuy/${id}`);
  }


  addtickets(show: number, buy: number, cantidad: number) {
    const requests = [];
    // Repetir la llamada según la cantidad especificada
    for (let i = 0; i < cantidad; i++) {
      const request = this.http.post(`${this.urlTicket}`, { show, buy });
      requests.push(request); // Guardar cada solicitud en el array
    }

    // Ejecutar todas las solicitudes simultáneamente
    return forkJoin(requests);
  }


  deleteTickets(id: number): Observable<any> {
    return this.http.delete<ResponseList<Ticket> | ResponseWithError>(`${this.urlTicket}/byBuy/${id}`)
  }

}
