import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Buy, ResponseList, ResponseOne, ResponseWithError, Ticket, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  constructor( private http: HttpClient ) { }

  readonly ticketsUrlByUser = "http://localhost:3000/api/buys/byUser"

  buy!: Buy;

  /*
  setPurchase(purchase: Buy):void {
    this.buy = purchase;
  }

  getOnePurchase(): Buy {
    return this.buy;
  }
  */


  getBuyByUser(id: number):Observable<any>{
    return this.http.post<ResponseList<Buy> | ResponseWithError>(`${this.ticketsUrlByUser}`, {user: id});
  }

  
}
