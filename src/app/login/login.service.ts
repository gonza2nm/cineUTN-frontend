import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly url = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}


  //Obtiene
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }


  //Registra
  loadUser(userData: any): Observable<any> {
    return this.http.post(this.url, userData)
  }

}
