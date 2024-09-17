import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';

interface User {
  id: number,
  dni: string,
  name: string,
  surname: string,
  email: string,
  password: string,
  type: string,
  cinema: string | null
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly url = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  user!: User;


  //Obtiene
  getUser(email: string | undefined | null, password: string | undefined | null): Observable<any> {
    return this.http.get(`${this.url}/${email}/${password}`);
    //Esto, por seguridad, se hace con un post. Buscar como.
  }


  //Registra
  loadUser(userData: any): Observable<any> {
    return this.http.post(this.url, userData)
  }


  // Método para actualizar el valor del usuario.
  setUser(user: User):void {
    this.user = user
  }

  getOneUser(): User {
    return this.user;
  }





  // Otra forma de hacerlo ------------------------- 

  // BehaviorSubject para almacenar el valor del usuario
  //private userSource = new BehaviorSubject<any>(null);
  
  // Observable que expone el valor del usuario
  //currentUser = this.userSource.asObservable();

  // Método para actualizar el valor del usuario.
  //setUser(user: any) {
    //this.userSource.next(user);
  //}




}
