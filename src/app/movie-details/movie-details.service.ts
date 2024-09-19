import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseList, ResponseWithError, Show } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  readonly urlShows = 'http://localhost:3000/api/shows';
  readonly urlMovies = 'http://localhost:3000/api/movies'
  constructor(private http: HttpClient) { }

  getMovieDetails():Observable<ResponseList<Show> | ResponseWithError>{
    return new Observable()
  }
}
