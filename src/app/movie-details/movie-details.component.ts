import { Component, OnInit } from '@angular/core';
import { MovieDetailsService } from './movie-details.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movieId : number = 1;
  cinemaId : number = 2;

  constructor(private service : MovieDetailsService) { }
  
  ngOnInit(): void {
    this.loadMovieDetails();
    if(!this.movieId || !this.cinemaId){

    } else {
      this.loadShows();
    }
  }

  loadShows() : void {

  }

  loadMovieDetails() : void {
    
  }
  
}
