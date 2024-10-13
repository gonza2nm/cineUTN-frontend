import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cinema, ResponseList, ResponseWithError } from '../interfaces/interfaces.js';

@Injectable({
  providedIn: 'root'
})
export class TheaterByCinemaService {

  readonly cinemaUrl = 'http://localhost:3000/api/cinemas';

  constructor(private http: HttpClient) { }

  getCinema(id: number): Observable<any> {
    return this.http
      .get<ResponseList<Cinema> | ResponseWithError>(`${this.cinemaUrl}/${id}`);
  }
}
