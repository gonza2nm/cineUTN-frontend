import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { ResponseList } from '../interfaces/response-list.interface.js';
import { Promotion } from '../interfaces/promotion.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';
import { ResponseOne } from '../interfaces/response-one.interface.js';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private http: HttpClient) { }

  readonly urlPromotion = `${environment.apiBaseUrl}/promotions`;



  getAllPromotions(): Observable<any> {
    return this.http.get<ResponseList<Promotion> | ResponseWithError>(this.urlPromotion);
  }

  getAllPromotionsbyCinema(cinemaId: number): Observable<any> {
    return this.http.get<ResponseList<Promotion> | ResponseWithError>(`${this.urlPromotion}/bycinema/${cinemaId}`);
  }

  getOnePromotions(code: string): Observable<any> {
    return this.http.get<ResponseOne<Promotion> | ResponseWithError>(`${this.urlPromotion}/${code}`)
  }

  addPromotion(promotionData: Promotion): Observable<any> {
    return this.http.post<ResponseOne<Promotion> | ResponseWithError>(`${this.urlPromotion}`, promotionData)
  }

  updatePromotion(code: string, promotionData: Promotion): Observable<any> {
    return this.http.put<ResponseOne<Promotion> | ResponseWithError>(`${this.urlPromotion}/${code}`, promotionData);
  }

  deletePromotion(code: string): Observable<any> {
    return this.http.delete<ResponseOne<Promotion> | ResponseWithError>(`${this.urlPromotion}/${code}`)
  }
}
