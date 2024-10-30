import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
