import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Buy, ResponseList, ResponseOne, ResponseWithError, Ticket, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  constructor( private http: HttpClient ) { }

  buy!: Buy;


  setPurchase(purchase: Buy):void {
    this.buy = purchase;
  }

  getOnePurchase(): Buy {
    return this.buy;
  }

  
}
