import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Cinema, Genre, Movie } from '../interfaces/interfaces.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cinemas: Cinema[] = [];
  movies: Movie[] = [];
  genres: Genre[] = [];
  selectedGenre: Genre | null = null;
  selectedCinema: Cinema | null = null;
  filteredMovies: Movie[] = [];
  constructor(private service: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.loadCinemas();
    this.loadMovies();
    this.loadGenres();
  }

  navigateToMovie(movie: Movie): void {
    const queryParams: any = {};

    if (this.selectedCinema) {
      queryParams.cinemaId = this.selectedCinema.id;
    }
    // Navegamos a la página de detalles de la película con los query params
    this.router.navigate(['/movies', movie.id], {
      queryParams: queryParams,
    });
  }
  //solicita todos los cines y guarda en una variable para no volver a hacer la solicitud todo el tiempo
  loadCinemas(): void {
    this.service.getCinemas().subscribe({
      next: (response) => {
          this.cinemas = response.data;
      }, error: () => {
        this.cinemas = [];
        console.error('Ocurrio un error al hacer la consulta de Cinemas');
      }
    });
  }
  //solicita los generos que existen en el sistema
  loadGenres(): void {
    this.service.getGenres().subscribe({
      next: (response) => {
        this.genres = response.data;
      }, error: () => {
        this.genres = [];
        console.error('Ocurrio un erro al hacer la consulta de Genres');
      }
    });
  }
  //solicita todas las peliculas y guarda en una variable para no volver a hacer la solicitud todo el tiempo
  loadMovies(): void {
    this.service.getMovies().subscribe({
      next: (response) =>{
        this.movies = response.data;
        this.filteredMovies = response.data;
      },error:() =>{
        this.filteredMovies = [];
        this.movies = [];
        console.error('Ocurrio un erro al hacer la consulta de Movies');
      }
    });
  }
  //solicita el cine seleccinado y guarda en una variable
  loadCinema(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.service.getCinema(id, 'all').subscribe({
        next: (response) =>{
          this.selectedCinema = response.data;
          resolve();
        },error:() =>{
          console.log('Ocurrio un error al buscar el cine seleccionado');
          this.selectedCinema = null;
          this.filteredMovies = [];
          reject();
        }
      });
    });
  }

  /* filtra las peliculas y guarda las peliculas en una variable que luego se pasa a otro componente para mostrarlas*/
  async filterMovies() {
    if (!this.selectedCinema && !this.selectedGenre) {
      this.filteredMovies = this.movies;
    } else if (this.selectedCinema !== null) {
      await this.loadCinema(this.selectedCinema.id);
      if (!this.selectedGenre) {
        this.filteredMovies = this.selectedCinema.movies;
      } else {
        this.filteredMovies = this.selectedCinema.movies.filter((movie) =>
          movie.genres.some((genre) => genre.id === this.selectedGenre?.id)
        );
      }
    } else if (this.selectedGenre !== null && !this.selectedCinema) {
      this.filteredMovies = this.movies.filter((movie) =>
        movie.genres.some((genre) => genre.id === this.selectedGenre?.id)
      );
    }
  }

  /*recibe el objeto seleccionado del dropdown y lo asigna al cine seleccionado para luego hacer los filtros
  asigna null si no esta seleccionado y asigna el cine en caso de que si*/
  handleItemSelected(item: Cinema | Genre | { clear: string }): void {
    if ('clear' in item) {
      if (item.clear === 'Cine') {
        this.selectedCinema = null;
      } else {
        this.selectedGenre = null;
      }
    } else {
      if ('address' in item) {
        this.selectedCinema = item;
      } else {
        this.selectedGenre = item;
      }
    }

    this.filterMovies();
  }

  //desvia la pagina hacia el listado de movies una vez que cambia el cine
  onSelect(event: Event): void {
    const target = document.getElementById('movies');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
