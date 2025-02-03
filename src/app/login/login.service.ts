import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseList, ResponseOne, ResponseWithError, User } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  readonly url = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) { }


  user!: User;



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