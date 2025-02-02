import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Buy, ResponseList, ResponseOne, ResponseWithError, Show, Ticket } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  //Produccion
  readonly urlTicket = 'https://cineutn-backend-deploy.onrender.com/api/tickets';
  //Desarrollo
  //readonly urlTicket = "http://localhost:3000/api/tickets"


  getTicketsByBuy(id: number): Observable<any> {
    return this.http.get<ResponseList<Ticket> | ResponseWithError>(`${this.urlTicket}/byBuy/${id}`);
  }

  getTickets(): Observable<any> {
    return this.http.get<ResponseList<Buy> | ResponseWithError>(this.urlTicket);
  }

  getOneTicket(id: number): Observable<any> {
    return this.http.get<ResponseOne<Ticket> | ResponseWithError>(`${this.urlTicket}/${id}`)
  }

  addTickets(ticketData: Ticket): Observable<any> {
    return this.http.post<ResponseOne<Ticket> | ResponseWithError>(`${this.urlTicket}`, ticketData)
  }

  updateTicket(id: number, ticketData: Ticket): Observable<any> {
    return this.http.patch<ResponseOne<Ticket> | ResponseWithError>(`${this.urlTicket}/${id}`, ticketData);
  }

  deleteTickets(id: number): Observable<any> {
    return this.http.delete<ResponseList<Ticket> | ResponseWithError>(`${this.urlTicket}/byBuy/${id}`)
  }

}
