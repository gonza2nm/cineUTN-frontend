import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buy, ResponseList, ResponseOne, ResponseWithError, User } from '../interfaces/interfaces';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private http: HttpClient) { }


  readonly urlBuy = 'http://localhost:3000/api/buys';
  

  getBuys():Observable<any>{
    return this.http.get<ResponseList<Buy> | ResponseWithError>(this.urlBuy);
  }

  getOneBuy(id: number): Observable<any> {
    return this.http.get<ResponseOne<Buy> | ResponseWithError>(`${this.urlBuy}/${id}`)
  }
  
  addBuy(description: string, total:number, user:number):Observable<any> {
    return this.http.post<ResponseOne<Buy> | ResponseWithError>(`${this.urlBuy}`, {description, total, user, status: 'valido'} )
  }
  
  updatebuy(id: number, status:string):Observable<any>{
    return this.http.put<ResponseOne<Buy> | ResponseWithError>(`${this.urlBuy}/${id}`, {status});
  }

  deleteBuy(id: number): Observable<any> {
    return this.http.delete<ResponseOne<Buy> | ResponseWithError>(`${this.urlBuy}/${id}`)
  }

}
