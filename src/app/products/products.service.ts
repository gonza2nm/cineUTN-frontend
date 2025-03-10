import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseList } from '../interfaces/response-list.interface.js';
import { Snack } from '../interfaces/snack.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';
import { ResponseOne } from '../interfaces/response-one.interface.js';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  readonly urlProducts = `${environment.apiBaseUrl}/snacks`;

  getAllProducts(): Observable<any> {
    return this.http.get<ResponseList<Snack> | ResponseWithError>(this.urlProducts);
  }

  getOneProduct(id: number): Observable<any> {
    return this.http.get<ResponseOne<Snack> | ResponseWithError>(`${this.urlProducts}/${id}`)
  }

  addProduct(productData: Snack): Observable<any> {
    return this.http.post<ResponseOne<Snack> | ResponseWithError>(`${this.urlProducts}`, productData)
  }

  updateProduct(id: number, productData: Snack): Observable<any> {
    return this.http.put<ResponseOne<Snack> | ResponseWithError>(`${this.urlProducts}/${id}`, productData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<ResponseOne<Snack> | ResponseWithError>(`${this.urlProducts}/${id}`)
  }
}
