import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseList } from '../interfaces/response-list.interface.js';
import { Ticket } from '../interfaces/ticket.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';
import { Buy } from '../interfaces/buy.interface.js';
import { ResponseOne } from '../interfaces/response-one.interface.js';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  readonly urlTicket = `${environment.apiBaseUrl}/tickets`;


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
