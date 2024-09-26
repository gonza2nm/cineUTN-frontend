import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, ResponseList, ResponseWithError } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  readonly urlMovies = 'http://localhost:3000/api/movies';

  //HttpClient Se inyecta en el servicio a través del constructor para que pueda usarse dentro de los métodos del servicio
  constructor(private http: HttpClient) { }


  //cambiar este getMovies por la funcion de los proximos estrenos cuando este
  getMovies(): Observable<any> {
    return this.http.get<ResponseList<Movie> | ResponseWithError>(this.urlMovies);
  }
}
