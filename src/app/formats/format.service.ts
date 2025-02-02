import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Format, ResponseList, ResponseWithError } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  //Produccion
  readonly urlFormats = 'https://cineutn-backend-deploy.onrender.com/api/formats';
  //Desarrollo
  //readonly urlFormats = 'http://localhost:3000/api/formats ';

  //HttpClient Se inyecta en el servicio a través del constructor para que pueda usarse dentro de los métodos del servicio
  constructor(private http: HttpClient) { }

  getFormats(): Observable<any> {
    return this.http
      .get<ResponseList<Format> | ResponseWithError>(this.urlFormats)
  }

}

