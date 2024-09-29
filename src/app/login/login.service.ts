import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseOne, ResponseWithError, User } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  readonly url = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  user!: User;
  

  //Metodos para la base de datos ---------------------------------------

  //Obtiene el usuario para el login
  getUser(userData: any): Observable<any> {
    return this.http.post<ResponseOne<User> | ResponseWithError>(`${this.url}/login`, userData);
  }


  //Registra el usuario
  addUser(userData: any): Observable<any> {
    return this.http.post<ResponseOne<User> | ResponseWithError>(`${this.url}/register`, userData)
  }

  //Actualiza los datos del usuario.
  updateUser() {

  }

  //Elimina la cuenta del usuario.
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

  //--------------------------------------------------------------------------

  //Para cambiar el estado del navbar de "inicion sesion" a  "mi cuenta".

  private isAuthenticated = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this.isAuthenticated.asObservable();

  login() {
    this.isAuthenticated.next(true);
  }

  logout() {
    this.isAuthenticated.next(false);
  }



}
