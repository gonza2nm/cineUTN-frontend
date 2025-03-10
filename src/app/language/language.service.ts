import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseList } from '../interfaces/response-list.interface.js';
import { Language } from '../interfaces/language.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  readonly urlLanguages = `${environment.apiBaseUrl}/languages`;

  //HttpClient Se inyecta en el servicio a través del constructor para que pueda usarse dentro de los métodos del servicio
  constructor(private http: HttpClient) { }

  getLanguages(): Observable<any> {
    return this.http
      .get<ResponseList<Language> | ResponseWithError>(this.urlLanguages)
  }
}
