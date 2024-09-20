import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Format, Language, Movie, ResponseList, ResponseOne, ResponseWithError} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  readonly urlShows = 'http://localhost:3000/api/shows';
  readonly urlMovies = 'http://localhost:3000/api/movies'
  readonly urlLanguages = 'http://localhost:3000/api/languages'
  readonly urlFormats = 'http://localhost:3000/api/formats'

  constructor(private http: HttpClient) { }

  getMovieDetails(id: number):Observable<any>{
    return this.http.get<ResponseOne<Movie> | ResponseWithError>(`${this.urlMovies}/${id}`);
  }
  getAllFormats():Observable<any>{
    return this.http.get<ResponseList<Format> | ResponseWithError>(this.urlFormats);
  }
  getAllLanguages():Observable<any>{
    return this.http.get<ResponseList<Language> | ResponseWithError>(this.urlLanguages);
  }
}
