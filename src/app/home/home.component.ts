import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Cinema, Genre, Movie } from '../interfaces/interfaces.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cinemas: Cinema[] = [];
  movies: Movie[] = [];
  selectedCinema: Cinema | null = null;
  filteredMovies: Movie[] = [];
  constructor(private service: HomeService) {}

  ngOnInit(): void {
    this.loadCinemas();
    this.loadMovies();
  }
  //solicita todos los cines y guarda en una variable para no volver a hacer la solicitud todo el tiempo
  loadCinemas(): void {
    this.service.getCinemas().subscribe((response) => {
      if ('data' in response) {
        this.cinemas = response.data;
        console.log(this.cinemas);
      } else {
        this.cinemas = [];
        console.error('Ocurrio un error al hacer la consulta de Cinemas');
      }
    });
  }
  //solicita todas las peliculas y guarda en una variable para no volver a hacer la solicitud todo el tiempo
  loadMovies(): void {
    this.service.getMovies().subscribe((response) => {
      if ('data' in response) {
        this.movies = response.data;
        this.filteredMovies = response.data;
        console.log(this.movies);
      } else {
        console.log(response.message);
        this.filteredMovies = [];
        this.movies = [];
      }
    });
  }
  //solicita el cine seleccinado y guarda en una variable
  loadCinema(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.service.getCinema(id, 'all').subscribe((response) => {
        if ('data' in response) {
          this.selectedCinema = response.data;
          resolve();
        } else {
          console.log(response.message);
          this.selectedCinema = null;
          this.filteredMovies = [];
          reject();
        }
      });
    });
  }

  /* filtra las peliculas y guarda las peliculas en una variable que luego se pasa a otro componente para mostrarlas*/
  async filterMovies() {
    if (!this.selectedCinema) {
      this.filteredMovies = this.movies;
      console.log('1 movies,', this.filteredMovies);
    } else if (this.selectedCinema) {
      await this.loadCinema(this.selectedCinema.id);
      this.filteredMovies = this.selectedCinema.movies;
      console.log('2 movies,', this.filteredMovies);
    }
  }

  /*recibe el objeto seleccionado del dropdown y lo asigna al cine seleccionado para luego hacer los filtros
  asigna null si no esta seleccionado y asigna el cine en caso de que si*/
  handleItemSelected(item: Cinema | null): void {
    this.selectedCinema = item;
    console.log('cinema seleccionado', this.selectedCinema);
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
