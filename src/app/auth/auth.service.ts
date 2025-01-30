import { Injectable } from '@angular/core';
import { ResponseOne, User } from '../interfaces/interfaces.js';
import { BehaviorSubject, catchError, map, Observable, of, tap, } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean>
  private userSubject : BehaviorSubject<User | null>;
  user : Observable<User| null>
  readonly url = 'http://localhost:3000/api/users';
  

  constructor(private http: HttpClient) { 
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.checkTokenFindData();
  }

  login(userData: any): Observable<ResponseOne<User>> {
    return this.http.post<ResponseOne<User>>(`${this.url}/login`, userData, { withCredentials: true }).pipe(
      tap((response) =>{
        const user = response.data;
        this.userSubject.next(user);
        this.loggedIn.next(true)
      }),
      catchError((error) => {
        console.error('Error en login:', error.error);
        this.userSubject.next(null);
        this.loggedIn.next(false)
        throw error;
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http.post<any>(`${this.url}/logout`,{}).pipe(
    map(() => {
        this.userSubject.next(null);
        this.loggedIn.next(false);
        return true; 
      }),
      catchError((error) => {
        console.error('Error en login:', error.error);
        return of(false);
      })  
    );
  }

  checkTokenFindData():void{
    this.http.get<ResponseOne<User>>(`${this.url}/verify-token-find-data`).subscribe(
      (response: ResponseOne<User>)=>{
        this.userSubject.next(response.data);
        this.loggedIn.next(true);
      },
      (error:any) =>{
        this.logout();
      }
    )
  }

  isLoggedIn():Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isManager(): Observable<boolean>{
    return this.user.pipe(map(user => user?.type === "manager"));
  }
}
