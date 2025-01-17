import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ResponseList, ResponseOne, ResponseWithError } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  readonly urlProducts = 'http://localhost:3000/api/urlProducts';

  getProducts():Observable<any>{
    return this.http.get<ResponseList<Product> | ResponseWithError>(this.urlProducts);
  }

  getOneProduct(id: number): Observable<any> {
    return this.http.get<ResponseOne<Product> | ResponseWithError>(`${this.urlProducts}/${id}`)
  }

  addProduct(id: number):Observable<any> {
    return this.http.post<ResponseOne<Product> | ResponseWithError>(`${this.urlProducts}`, {id} )
  }

  updateProduct(id: number):Observable<any>{
    return this.http.put<ResponseOne<Product> | ResponseWithError>(`${this.urlProducts}/${id}`, {id});
  }
    
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<ResponseOne<Product> | ResponseWithError>(`${this.urlProducts}/${id}`)
  }
}
