
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cinema, ResponseList, ResponseWithError } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TheatersService {

  //Produccion
  readonly cinemaUrl = 'https://cineutn-backend-deploy.onrender.com/api/cinemas';
  //Desarrollo
  //readonly cinemaUrl = 'http://localhost:3000/api/cinemas';

  constructor(private http: HttpClient) { }

  getAllCinemas(): Observable<any> {
    return this.http
      .get<ResponseList<Cinema> | ResponseWithError>(this.cinemaUrl);
  }

}
