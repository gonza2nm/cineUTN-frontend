import { Injectable } from '@angular/core';
import { ResponseOne, User } from './interfaces/interfaces.js';
import { BehaviorSubject, catchError, map, Observable, of,} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  readonly url = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  setUser(value: User){
    sessionStorage.setItem("user",JSON.stringify(value));
  }

  getUser(): User | null{
    const json = sessionStorage.getItem("user")
    const user = json? JSON.parse(json) : null
    return user;
  }

  removeUser(): void {
    sessionStorage.removeItem("user");
  }

  clearSessionStorage(): void {
    sessionStorage.clear();
  }

  login(userData: any): Observable<boolean> {
    return this.loginUser(userData).pipe(
      map((response) => {
        if (response && response.data) {
          this.setUser(response.data);
          this.isLoggedInSubject.next(true);
          return true; // Login exitoso
        }// la funcion map lo convierte al true en observable automaticamente
        
        return false; // Si no hay datos, falló el login
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        this.isLoggedInSubject.next(false);
        return of(false); //el of transforma el false en un observable
      })
    );
  }

  logout(): void {
    this.removeUser();
    this.isLoggedInSubject.next(false);
  }

  checkLoginStatus(): void {
    const loggedIn = !!this.getUser();
    this.isLoggedInSubject.next(loggedIn);
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post<ResponseOne<User>>(`${this.url}/login`, userData);
  }

}
