import { Component, HostListener, OnInit } from '@angular/core';
import { MovieService } from '../movies/movie.service';
import { Router } from '@angular/router';
import { Movie } from '../interfaces/movie.interface.js';

@Component({
  selector: 'app-next-releases-slider',
  templateUrl: './next-releases-slider.component.html',
  styleUrls: ['./next-releases-slider.component.css']
})
export class NextReleasesSliderComponent implements OnInit {

  nextReleases: Movie[] = []; //todas las peliculas proximas
  displayedMovies: Movie[] = []; // peliculas que se muestran actualmente
  currentIndex: number = 0; // indice de la pelicula donde se encuentra el slider en ese momento (posicion donde empezamos a mostrar las peliculas)
  moviesPerView: number = 1;
  errorMessage: string | null = null;
  loading: boolean = true //para no mostrar error antes de que carge la pagina

  constructor(
    private movieService: MovieService,
    private router: Router) { }


  ngOnInit(): void {
    this.loadNextReleases();
    this.updateMoviesPerView(); // calcula cuantas peliculas mostrar segun el tamaño de pantalla
  }

  @HostListener('window:resize')
  onResize() {
    this.updateMoviesPerView();
    this.adjustCurrentIndex(); //para solucionar problemas en el final de la lista
  }

  loadNextReleases() {
    this.movieService.getNextReleases().subscribe({
      next: (response) => {
        this.nextReleases = response.data;
        this.errorMessage = null;
        this.loading = false;
        this.updateDisplayedMovies();
      },
      error: (err) => {
        this.errorMessage = 'An error occurred while fetching next realeases.';
        console.error('Error getting next realeases:', err.error.message);
        this.loading = false;
      }
    });
  }

  updateMoviesPerView() {
    const width = window.innerWidth;
    if (width < 680) {
      this.moviesPerView = 1;
    } else if (width < 908) {
      this.moviesPerView = 3;
    } else if (width < 1024) {
      this.moviesPerView = 4;
    } else if (width < 1280) {
      this.moviesPerView = 5;
    } else {
      this.moviesPerView = 6;
    }
    this.updateDisplayedMovies();
  }

  updateDisplayedMovies() {
    this.displayedMovies = this.nextReleases.slice(this.currentIndex, this.currentIndex + this.moviesPerView);
  }

  nextMovies() {
    if (this.currentIndex + this.moviesPerView < this.nextReleases.length) {
      this.currentIndex++;
    }
    this.updateDisplayedMovies();
  }

  prevMovies() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    this.updateDisplayedMovies();
  }

  adjustCurrentIndex() {
    // Verifica que el currentIndex no se pase del rango de la lista después de un cambio de tamaño
    if (this.currentIndex + this.moviesPerView > this.nextReleases.length) {
      this.currentIndex = Math.max(0, this.nextReleases.length - this.moviesPerView);
    }
    this.updateDisplayedMovies();
  }

  navigateToMovie(movie: Movie): void {
    this.router.navigate(['/movies', movie.id]);
  }
}
