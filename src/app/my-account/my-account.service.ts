import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseList } from '../interfaces/response-list.interface.js';
import { Buy } from '../interfaces/buy.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  constructor(private http: HttpClient) { }

  readonly ticketsUrlByUser = `${environment.apiBaseUrl}/buys/byUser`;

  getBuyByUser(id: number): Observable<any> {
    return this.http.get<ResponseList<Buy> | ResponseWithError>(`${this.ticketsUrlByUser}/${id}`);
  }

}
