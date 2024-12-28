import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cinema, ResponseList, ResponseOne, ResponseWithError, Theater } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TheaterByCinemaService {

  readonly cinemaUrl = 'http://localhost:3000/api/cinemas';
  readonly theaterUrl = 'http://localhost:3000/api/theaters';

  constructor(private http: HttpClient) { }

  getCinema(id: number): Observable<any> {
    return this.http
      .get<ResponseList<Cinema> | ResponseWithError>(`${this.cinemaUrl}/${id}`);
  }

  getTheater(id: number): Observable<any> {
    return this.http.get<ResponseOne<Theater> | ResponseWithError>(`${this.theaterUrl}/${id}`);
  }

  updateTheater(id: number, theater: Theater): Observable<any> {
    return this.http.put<ResponseOne<Theater> | ResponseWithError>(`${this.theaterUrl}/${id}`, theater, { withCredentials: true });
  }

  addTheater(theater: Theater): Observable<any> {
    return this.http.post<ResponseOne<Theater> | ResponseWithError>(this.theaterUrl, theater, { withCredentials: true });
  }

  deleteTheater(id: number) {
    return this.http.delete<ResponseOne<Theater> | ResponseWithError>(`${this.theaterUrl}/${id}`, { withCredentials: true });
  }
}
