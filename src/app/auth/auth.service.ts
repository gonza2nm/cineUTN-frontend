import { Injectable } from '@angular/core';
import { ResponseOne, User } from '../interfaces/interfaces.js';
import { BehaviorSubject, catchError, map, Observable, of, tap, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user = this.userSubject.asObservable();
  loggedIn = this.loggedInSubject.asObservable();

  readonly url = `${environment.apiBaseUrl}/users`;


  constructor(private http: HttpClient) { }

  login(userData: any): Observable<ResponseOne<User>> {
    return this.http.post<ResponseOne<User>>(`${this.url}/login`, userData, { withCredentials: true }).pipe(
      tap((response) => {
        const user = response.data;
        this.userSubject.next(user);
        this.loggedInSubject.next(true)
      }),
      catchError((error) => {
        console.error('Error en login:', error.error);
        this.userSubject.next(null);
        this.loggedInSubject.next(false)
        throw error;
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http.post<any>(`${this.url}/logout`, {}).pipe(
      map(() => {
        this.userSubject.next(null);
        this.loggedInSubject.next(false);
        return true;
      }),
      catchError((error) => {
        console.error('Error en login:', error.error);
        return of(false);
      })
    );
  }

  checkTokenFindData(): Observable<any> {
    return this.http.get<ResponseOne<User>>(`${this.url}/verify-token-find-data`).pipe(
      tap({
        next: (response: ResponseOne<User>) => {
          this.userSubject.next(response.data);
          this.loggedInSubject.next(true);
        },
        error: (error: any) => {
          console.error('Error verificando token:', error.error);
          this.loggedInSubject.next(false);
          this.userSubject.next(null);
        }
      }),
      catchError((error) => {
        console.error('Error en verificación de token:', error.error);
        this.loggedInSubject.next(false);
        this.userSubject.next(null);
        return of(null);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn;
  }

  isManager(): Observable<boolean> {
    return this.user.pipe(map(user => user?.type === "manager"));
  }
}
