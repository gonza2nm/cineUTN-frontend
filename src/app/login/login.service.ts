import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseOne, ResponseWithError, User } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  readonly url = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}


  user!: User;
  


  getUser(userData: any): Observable<any> {
    return this.http.post<ResponseOne<User> | ResponseWithError>(`${this.url}/login`, userData);
  }

  addUser(userData: any): Observable<any> {
    return this.http.post<ResponseOne<User> | ResponseWithError>(`${this.url}/register`, userData)
  }

  updateUser(id:number, userEditData:any): Observable<any> {
    return this.http.put<ResponseOne<User> | ResponseWithError>(`${this.url}/${id}`, userEditData)
  }

  deleteUser() {

  }

  //-----------------------------------------------------------------------------


  // Método para actualizar el valor del usuario y pasarle a my-account
  setUser(user: User):void {
    this.user = user;
  }

  getOneUser(): User {
    return this.user;
  }



}
