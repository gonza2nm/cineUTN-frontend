import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion, ResponseList, ResponseOne, ResponseWithError, Ticket } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private http: HttpClient) { }

  //Produccion
  //readonly urlPromotion = 'https://cineutn-backend-deploy.onrender.com/api/promotions';
  //Desarrollo
  //readonly urlPromotion = 'http://localhost:3000/api/promotions';
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
