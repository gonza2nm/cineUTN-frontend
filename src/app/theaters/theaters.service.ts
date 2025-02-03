
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cinema, ResponseList, ResponseWithError } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
