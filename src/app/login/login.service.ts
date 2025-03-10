import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface.js';
import { ResponseOne } from '../interfaces/response-one.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';
import { ResponseList } from '../interfaces/response-list.interface.js';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  readonly url = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) { }


  getUser(userData: any): Observable<any> {
    return this.http.post<ResponseOne<User> | ResponseWithError>(`${this.url}/login`, userData);
  }

  addUser(userData: User): Observable<any> {
    return this.http.post<ResponseOne<User> | ResponseWithError>(`${this.url}/register`, userData)
  }

  updateUser(id: number | undefined, userData: User): Observable<any> {
    return this.http.put<ResponseOne<User> | ResponseWithError>(`${this.url}/${id}`, userData)
  }

  deleteUser(id: number | undefined): Observable<any> {
    return this.http.delete<ResponseOne<User> | ResponseWithError>(`${this.url}/${id}`)
  }

  getAllManagers(): Observable<any> {
    return this.http.get<ResponseList<User> | ResponseWithError>(`${this.url}/managers`)
  }

  getOneManager(id: number): Observable<any> {
    return this.http.get<ResponseOne<User> | ResponseWithError>(`${this.url}/managers/${id}`)
  }

  addManager(userData: any): Observable<any> {
    return this.http.post<ResponseOne<User> | ResponseWithError>(`this.url`, userData)
  }

}