import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private http: HttpClient) { }

  readonly urlBuy = 'http://localhost:3000/api/buys'
  readonly urlTicket = 'http://localhost:3000/api/tickets'
  
  addBuy(description: string, total:number, user:number):any {
    return this.http.post(`${this.urlBuy}`, {description, total, user} )
  }

  deleteBuy(id: number) {
    return this.http.delete(`${this.urlBuy}/${id}`)
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
}
