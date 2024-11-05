import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable} from 'rxjs';
import { Buy, ResponseList, ResponseOne, ResponseWithError, Show, Ticket } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }


  
  readonly urlTicket = "http://localhost:3000/api/tickets"
  readonly ticketsUrlByBuy = "http://localhost:3000/api/tickets/byBuy"
  readonly ticketsUrlDelted = "http://localhost:3000/api/tickets/remove2"


  getTickets(id: number):Observable<any>{
    return this.http.post<ResponseList<Ticket> | ResponseWithError>(`${this.ticketsUrlByBuy}`, {buy: id});
  }

  addTicket(show: number, buy: number,) {
    this.http.post(`${this.urlTicket}`, { show, buy });
  }

  //No terminado
  updatebuy(id: number, algo:string):Observable<any>{
    return this.http.put<ResponseOne<Buy> | ResponseWithError>(`${this.urlTicket}/${id}`, {algo});
  }

  deleteBuy(id: number): Observable<any> {
    return this.http.delete<ResponseOne<Buy> | ResponseWithError>(`${this.urlTicket}/${id}`)
  }


  //---------------------------------------------------------------------------------



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

  //--------------------------------------------------------------------------------

  deleteTickets(buy: number): Observable<any> {

    return this.http.post<ResponseOne<Buy> | ResponseWithError>(`${this.ticketsUrlDelted}`, {buy})
  }



  //--------------------------------------------------------

  readonly urlShow = 'http://localhost:3000/api/shows'

  getShow(id: number):Observable<any> {
    return this.http.get<ResponseOne<Show> | ResponseWithError>(`${this.urlShow}/${id}`);
  }
}
