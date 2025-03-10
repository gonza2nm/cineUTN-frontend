import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseList } from '../interfaces/response-list.interface.js';
import { Genre } from '../interfaces/genre.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';
import { ResponseOne } from '../interfaces/response-one.interface.js';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  readonly genresUrl = `${environment.apiBaseUrl}/genres`;

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
