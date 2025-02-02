import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre, ResponseList, ResponseOne, ResponseWithError } from '../interfaces/interfaces.js';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  //Produccion
  readonly genresUrl = 'https://cineutn-backend-deploy.onrender.com/api/genres';
  //Desarrollo
  //readonly genresUrl = "http://localhost:3000/api/genres"

  constructor(private http: HttpClient) { }

  getGenres(): Observable<any> {
    return this.http.get<ResponseList<Genre> | ResponseWithError>(this.genresUrl);
  }

  getOneGenre(id: number): Observable<any> {
    return this.http.get<ResponseOne<Genre> | ResponseWithError>(`${this.genresUrl}/${id}`);
  }

  addGenre(genre: Genre): Observable<any> {
    return this.http.post<ResponseOne<Genre> | ResponseWithError>(this.genresUrl, genre);
  }

  updateGenre(id: number, genre: Genre): Observable<any> {
    return this.http.put<ResponseOne<Genre> | ResponseWithError>(`${this.genresUrl}/${id}`, genre);
  }

  deleteGenre(id: number): Observable<any> {
    return this.http.delete<ResponseOne<Genre> | ResponseWithError>(`${this.genresUrl}/${id}`);
  }

}
