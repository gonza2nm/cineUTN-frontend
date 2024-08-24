import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly Url = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }


  getUser(id: number) {
    return this.http.get(`${this.Url}/${id}`);
  }
}
