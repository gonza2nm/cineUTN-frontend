import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseList } from '../interfaces/response-list.interface.js';
import { Buy } from '../interfaces/buy.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';
import { ResponseOne } from '../interfaces/response-one.interface.js';
import { ResponseQR } from '../interfaces/response-qr.interface.js';
import { Seat } from '../interfaces/seat.interface.js';

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
    total: number,
    user: number,
    show: number,
    snacks: { id: number, cant: number }[],
    promotions: { code: string, cant: number }[],
    seats: Seat[]
  ): Observable<any> {
    return this.http.post<ResponseOne<Buy> | ResponseWithError>(`${this.urlBuy}`, { total, user, show, snacks, promotions, seats })
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

  updateSeatbyShow(id: number, seatsId: number[]): Observable<any> {
    return this.http.patch<ResponseOne<Seat> | ResponseWithError>(`${this.urlSeat}/update/${id}`, { seatsId });
  }

}
