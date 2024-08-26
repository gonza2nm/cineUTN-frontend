import { Component, Input } from '@angular/core';
import { Movie } from '../interfaces/interfaces.js';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @Input({ required: true }) movies: Movie[] = [];
  limitedMovies: Movie[] = [];
  currentIndex = 0;
  maxMovies = 4;

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
