import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseOne } from '../interfaces/response-one.interface.js';
import { Cinema } from '../interfaces/cinema.interface.js';
import { ResponseWithError } from '../interfaces/response-with-error.interface.ts.js';
import { ResponseList } from '../interfaces/response-list.interface.js';
import { Show } from '../interfaces/show.interface.js';
import { Movie } from '../interfaces/movie.interface.js';

@Injectable({
  providedIn: 'root',
})
export class ShowtimesByCinemaService {

  readonly showtimeUrl = `${environment.apiBaseUrl}/shows`;
  readonly movieUrl = `${environment.apiBaseUrl}/movies`;
  readonly cinemaUrl = `${environment.apiBaseUrl}/cinemas`;

  constructor(private http: HttpClient) { }

  getCinema(id: number): Observable<any> {
    return this.http.get<ResponseOne<Cinema> | ResponseWithError>(
      `${this.cinemaUrl}/${id}`
    );
  }

  getShowtimesByCinema(id: number): Observable<any> {
    return this.http.get<ResponseList<Show> | ResponseWithError>(
      `${this.showtimeUrl}/bycinema/${id}`
    );
  }

  getShowtime(id: number, moreDetails: string | null = null): Observable<any> {
    if (moreDetails != null && moreDetails?.toLocaleLowerCase() == 'yes') {
      return this.http.get<ResponseOne<Show> | ResponseWithError>(
        `${this.showtimeUrl}/${id}?moredetails=${moreDetails}`
      );
    }
    return this.http.get<ResponseOne<Show> | ResponseWithError>(
      `${this.showtimeUrl}/${id}`
    );
  }

  getMovieData(id: number): Observable<any> {
    return this.http.get<ResponseOne<Movie> | ResponseWithError>(
      `${this.movieUrl}/${id}`
    );
  }

  addShowtime(show: Show): Observable<any> {
    return this.http.post<ResponseOne<Show> | ResponseWithError>(this.showtimeUrl, show);
  }

  updateShowtime(id: number, show: Show): Observable<any> {
    return this.http.put<ResponseOne<Show> | ResponseWithError>(`${this.showtimeUrl}/${id}`, show);
  }

  deleteShowtime(id: number): Observable<any> {
    return this.http.delete<ResponseOne<Show> | ResponseWithError>(`${this.showtimeUrl}/${id}`);
  }
}
