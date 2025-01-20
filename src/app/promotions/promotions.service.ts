import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion, ResponseList, ResponseOne, ResponseWithError, Ticket } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private http: HttpClient) { }

  readonly urlPromotion = 'http://localhost:3000/api/promotions';


  getAllPromotions():Observable<any>{
      return this.http.get<ResponseList<Promotion> | ResponseWithError>(this.urlPromotion);
    }
  
  getOnePromotions(id: number): Observable<any> {
    return this.http.get<ResponseOne<Promotion> | ResponseWithError>(`${this.urlPromotion}/${id}`)
  }
    
  addPromotion(promotionData: Promotion):Observable<any> {
    return this.http.post<ResponseOne<Promotion> | ResponseWithError>(`${this.urlPromotion}`, promotionData )
  }
    
  updatePromotion(id: number, promotionData: Promotion):Observable<any>{
    return this.http.put<ResponseOne<Promotion> | ResponseWithError>(`${this.urlPromotion}/${id}`, promotionData);
  }
  
  deletePromotion(id: number): Observable<any> {
    return this.http.delete<ResponseOne<Promotion> | ResponseWithError>(`${this.urlPromotion}/${id}`)
  }
}
