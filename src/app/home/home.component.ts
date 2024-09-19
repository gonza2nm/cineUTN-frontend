import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Cinema, Genre, Movie } from '../interfaces/interfaces.js';

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
  filteredMovies: Movie[] | null = [];
  constructor(private service: HomeService) { }

  ngOnInit(): void {
    this.loadCinemas();
    this.loadMovies();
    this.loadGenres();
  }
  //solicita todos los cines y guarda en una variable para no volver a hacer la solicitud todo el tiempo
  loadCinemas(): void {
    this.service.getCinemas().subscribe({
      next: (response) => {
          this.cinemas = response.data;
          console.log(this.cinemas);
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
        console.log(this.genres);
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
        console.log("movies");
        console.log(this.movies);
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
      console.log('1 movies,', this.filteredMovies);
    } else if (this.selectedCinema !== null) {
      await this.loadCinema(this.selectedCinema.id);
      if (!this.selectedGenre) {
        this.filteredMovies = this.selectedCinema.movies;
        console.log('2 movies,', this.filteredMovies);
      } else {
        this.filteredMovies = this.selectedCinema.movies.filter((movie) =>
          movie.genres.some((genre) => genre.id === this.selectedGenre?.id)
        );
        console.log('3 movies,', this.filteredMovies);
      }
    } else if (this.selectedGenre !== null && !this.selectedCinema) {
      console.log('4 movies,', this.filteredMovies);
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
        console.log('cinema seleccionado', this.selectedCinema);
      } else {
        this.selectedGenre = item;
        console.log('genero seleccionado', this.selectedGenre);
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
