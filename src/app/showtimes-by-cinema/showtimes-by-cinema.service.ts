import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Cinema,
  Movie,
  ResponseList,
  ResponseOne,
  ResponseWithError,
  Show,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShowtimesByCinemaService {
  readonly showtimeUrl = 'http://localhost:3000/api/shows';
  readonly movieUrl = 'http://localhost:3000/api/movies';
  readonly cinemaUrl = 'http://localhost:3000/api/cinemas';
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
    return this.http.post<ResponseOne<Show> | ResponseWithError>(
      this.showtimeUrl,
      show, { withCredentials: true }
    );
  }

  updateShowtime(id: number, show: Show): Observable<any> {
    return this.http.put<ResponseOne<Show> | ResponseWithError>(
      `${this.showtimeUrl}/${id}`,
      show, { withCredentials: true }
    );
  }

  deleteShowtime(id: number): Observable<any> {
    return this.http.delete<ResponseOne<Show> | ResponseWithError>(
      `${this.showtimeUrl}/${id}`, { withCredentials: true }
    );
  }
}
