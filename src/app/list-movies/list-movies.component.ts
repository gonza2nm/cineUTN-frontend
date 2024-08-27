import { Component, Input } from '@angular/core';
import { Movie } from '../interfaces/interfaces.js';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css'],
})
export class ListMoviesComponent {
  @Input({ required: true }) movies: Movie[] = [];
}
