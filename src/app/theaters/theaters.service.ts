
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseList } from '../interfaces/response-list.interface.js';
import { Cinema } from '../interfaces/cinema.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';

@Injectable({
  providedIn: 'root'
})
export class TheatersService {

  readonly cinemaUrl = `${environment.apiBaseUrl}/cinemas`;

  constructor(private http: HttpClient) { }

  getAllCinemas(): Observable<any> {
    return this.http
      .get<ResponseList<Cinema> | ResponseWithError>(this.cinemaUrl);
  }

}
