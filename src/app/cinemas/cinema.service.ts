import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cinema } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  readonly apiUrl = 'http://localhost:3000/api/cinemas';

  constructor(private http: HttpClient) { }

  //Hace una peticion get al URL de la api, y espera un observable que va a emitira un arreglo de elemento de tipo cinema 
  getAllCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.apiUrl);
  }
}
