import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Movie } from '../interfaces/interfaces.js';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnChanges {
  @Input({ required: true }) movies: Movie[] = [];
  limitedMovies: Movie[] = [];
  currentIndex = 0;
  maxMovies = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies']) {
      this.maxMovies = this.movies.length;
      this.currentIndex = 0; // Reinicia el índice para evitar desbordamiento
    }
  }

  get transform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  prev(): void {
    this.currentIndex =
      this.currentIndex === 0 ? this.maxMovies - 1 : this.currentIndex - 1;
  }

  next(): void {
    this.currentIndex =
      this.currentIndex === this.maxMovies - 1 ? 0 : this.currentIndex + 1;
  }
  goToSlide(index: number): void {
    this.currentIndex = index;
  }
}
