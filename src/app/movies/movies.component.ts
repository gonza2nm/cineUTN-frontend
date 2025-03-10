import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { Movie } from '../interfaces/movie.interface.js';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = []; //array vacio de tipo movie[]
  errorMessage: string | null = null; //una variable que puede tener un msj de error o null
  loading: boolean = true //Sirve para que no se muestren los mensajes de error mientras todavia esta cargando el loadMovies

  //recibe una instancia de movieService
  constructor(private movieService: MovieService) { }

  //cuando el componente es inicializado se ejecuta
  ngOnInit(): void {
    this.loadMovies();
  }

  //realiza la solitud al servicio para obtener los datos de las movies
  loadMovies() {
    //Se llama al método getAllMovies() del servicio MovieService, que devuelve un Observable que se suscribe, puede devolver (response) o (error).
    this.movieService.getAllMovies().subscribe({
      next: (response) => {
        this.movies = response.data;
        this.errorMessage = null; //borra el mensaje de error por si viene alguno viejo arrastrado
        this.loading = false;
      },
      error: (err) => {  //el observable emitio un error 
        //Si ocurre un error durante la solicitud HTTP, se asigna un mensaje genérico a errorMessage, y el error se imprime en la consola
        this.errorMessage = 'Ocurrio un error buscando las peliculas, intente nuevamente.';
        console.error('Error getting movies:', err.error.message);
        this.loading = false;
      }
    });
  }
}
