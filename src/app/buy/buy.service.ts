import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buy, ResponseList, ResponseOne, ResponseQR, ResponseWithError, Seat, User } from '../interfaces/interfaces';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private http: HttpClient) { }


  readonly urlBuy = `${environment.apiBaseUrl}/buys`;
  readonly urlSeat = `${environment.apiBaseUrl}/seats`;

  getBuys(): Observable<any> {
    return this.http.get<ResponseList<Buy> | ResponseWithError>(this.urlBuy);
  }

  getOneBuy(id: number): Observable<any> {
    return this.http.get<ResponseOne<Buy> | ResponseWithError>(`${this.urlBuy}/${id}`)
  }
  
  addBuy(
    description: string, 
    total: number, 
    user:number, 
    show: number, 
    snacks: { id: number, cant: number }[], 
    promotions: {code:string, cant: number}[],
    seats: Seat[]
  ):Observable<any> {
    return this.http.post<ResponseOne<Buy> | ResponseWithError>(`${this.urlBuy}`, {description, total, user, show, snacks, promotions, seats} )
  }

  getQRCodeBuy(id: number): Observable<any> {
    return this.http.get<ResponseQR | ResponseWithError>(`${this.urlBuy}/generateQr/${id}`)
  }

  validateQRCode(token: string): Observable<any> {
    return this.http.post<ResponseOne<Buy> | ResponseWithError>(`${this.urlBuy}/validateQr`, { token });
  }

  updatebuy(id: number, status: string): Observable<any> {
    return this.http.patch<ResponseOne<Buy> | ResponseWithError>(`${this.urlBuy}/${id}`, { status });
  }

  deleteBuy(id: number): Observable<any> {
    return this.http.delete<ResponseOne<Buy> | ResponseWithError>(`${this.urlBuy}/${id}`)
  }

  //Metodos para los asientos.

  getSeatsbyShow(id: number): Observable<any> {
    return this.http.get<ResponseList<Seat> | ResponseWithError>(`${this.urlSeat}/byShow/${id}`)
  }

  updateSeatbyShow( id: number, seatsId: number[]): Observable<any> {
    return this.http.patch<ResponseOne<Seat> | ResponseWithError>(`${this.urlSeat}/update/${id}`, { seatsId });
  }

}
