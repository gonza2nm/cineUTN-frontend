import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Snack, ResponseList, ResponseOne, ResponseWithError } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  readonly urlProducts = 'http://localhost:3000/api/snacks';

  getAllProducts():Observable<any>{
    return this.http.get<ResponseList<Snack> | ResponseWithError>(this.urlProducts);
  }

  getOneProduct(id: number): Observable<any> {
    return this.http.get<ResponseOne<Snack> | ResponseWithError>(`${this.urlProducts}/${id}`)
  }

  addProduct(productData: Snack):Observable<any> {
    return this.http.post<ResponseOne<Snack> | ResponseWithError>(`${this.urlProducts}`, productData )
  }

  updateProduct(id: number, productData: Snack):Observable<any>{
    return this.http.put<ResponseOne<Snack> | ResponseWithError>(`${this.urlProducts}/${id}`, productData);
  }
    
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<ResponseOne<Snack> | ResponseWithError>(`${this.urlProducts}/${id}`)
  }
}
