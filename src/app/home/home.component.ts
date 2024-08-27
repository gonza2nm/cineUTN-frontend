import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Cinema, Genre, Movie } from '../interfaces/interfaces.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cinemas: Cinema[] = [];
  genres: Genre[] = [];
  movies: Movie[] = [];
  selectedCinema: Cinema | null = null;
  selectedGenre: Genre | null = null;
  filteredMovies: Movie[] = [];
  filteredGenres: Genre[] = [];
  constructor(private service: HomeService) {}
  ngOnInit(): void {
    this.loadCinemas();
    this.loadGenres();
    this.loadMovies();
  }
  loadCinemas(): void {
    this.service.getCinemas().subscribe(
      (response) => {
        if ('data' in response) {
          const { data } = response;
          this.cinemas = data;
          console.log(this.cinemas);
        }
      },
      (error) => {
        console.error('Ocurrio un error al hacer la consulta de Cinemas');
      }
    );
  }
  loadGenres(): void {
    this.service.getGenres().subscribe(
      (response) => {
        if ('data' in response) {
          const { data } = response;
          this.genres = data;
          this.filteredGenres = data;
          console.log(this.genres);
        }
      },
      (error) => {
        console.error('Ocurrio un error al hacer la consulta de Genres');
      }
    );
  }
  loadMovies(): void {
    this.service.getMovies().subscribe(
      (response) => {
        if ('data' in response) {
          const { data } = response;
          this.movies = data;
          this.filteredMovies = data;
          console.log(this.movies);
        }
      },
      (error) => {
        console.error('Ocurrio un error al hacer la consulta de Movies');
      }
    );
  }

  loadCinema(id: number): Cinema | any {
    this.service.getCinema(id).subscribe(
      (response) => {
        if ('data' in response) {
          const { data } = response;
          data;
        }
      },
      (error) => {
        console.error('Ocurrio un error al hacer la consulta de Movies');
        return error;
      }
    );
  }

  /* filtra las peliculas y le pasa el dato correspondiente a el componente que muestra las peliculas*/
  filterMovies() {
    if (!this.selectedCinema && !this.selectedGenre) {
      this.filteredMovies = this.movies;
      this.filteredGenres = this.genres;
    } else if (!this.selectedCinema && this.selectedGenre !== null) {
      this.filteredMovies = this.movies.filter((movie) =>
        movie.genres.some((genre) => genre.id === this.selectedGenre?.id)
      );
      this.filteredMovies.forEach((movie) => {
        console.log(`Pelicula: ${movie.name}, id: ${movie.id}`);
      });
    } else if (!this.selectedGenre && this.selectedCinema !== null) {
      const cinema = this.loadCinema(this.selectedCinema.id);
      // Seguir con esto de la solicitud de cine, revisar bien que datos se reciben y como trabajar para hacer el filtro necesario
    }
  }

  /*recibe el objeto seleccionado del dropdown, segun si es cine o genero hace los filtos
  en caso de que devuelva un objeto que tiene el atributo clear ese contiene el nombre
  del filtro y anula los filtros*/
  handleItemSelected(item: Cinema | Genre | { clear: string }): void {
    if ('clear' in item) {
      if (item.clear === 'Cine') {
        this.selectedCinema = null;
        console.log(`cinema seleccionado ${this.selectedCinema}`);
      } else {
        this.selectedGenre = null;
        console.log(`genero seleccionado ${this.selectedGenre}`);
      }
    } else if ('address' in item) {
      //es cine
      this.selectedCinema = item;
      console.log(`cinema seleccionado ${this.selectedCinema.name}`);
      // Aplicar filtro basado en el cine seleccionado
    } else {
      //es genero
      this.selectedGenre = item;
      console.log(`genero seleccionado ${this.selectedGenre.name}`);
      // Aplicar filtro basado en el género seleccionado
    }
    this.filterMovies();
  }
}
