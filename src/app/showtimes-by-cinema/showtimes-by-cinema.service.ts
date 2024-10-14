import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cinema, ResponseList, ResponseOne, ResponseWithError, Show } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShowtimesByCinemaService {

  readonly showtimeUrl = "http://localhost:3000/api/shows"
  readonly cinemaUrl = "http://localhost:3000/api/cinemas"
  constructor(private http :HttpClient) { }

  getCinema(id :number): Observable<any>{
    return this.http.get<ResponseOne<Cinema> | ResponseWithError>(`${this.cinemaUrl}/${id}`);
  }
  getShowtimesByCinema(id :number): Observable<any>{
    return this.http.get<ResponseList<Show> | ResponseWithError>(`${this.showtimeUrl}/bycinema/${id}`);
  }
}
