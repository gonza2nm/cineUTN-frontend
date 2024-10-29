import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../interfaces/interfaces.js';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movies/movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  movieId: number | null = null;
  isEditMode: boolean = false;
  errorMessage: string | null = null;
  movieForm: FormGroup;
  imageLink: string = '';
  movieData: Movie = {
    id: 0,
    name: '',
    description: '',
    imageLink: '',
    genres: [],
    cinemas: [],
    formats: [],
    languages: []
  }

  constructor(
    private route: ActivatedRoute, // Se usa para acceder a informacion de la ruta activa , en este caso para acceder al parametro id
    private movieService: MovieService,
    private router: Router //permite redirigir a una página diferente despues de que se haya completado alguna acción. (Ej: luego de crear la pelicula lo mando a la lista de peliculas)
  ) {

    //se inicializa dentro del constructor, para que este configurado y disponible para usarse
    this.movieForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageLink: new FormControl('', [Validators.required]),
    });

    // Actualiza imageLink en tiempo real
    this.movieForm.get('imageLink')?.valueChanges.subscribe((value: string) => {
      this.imageLink = value;
    });

  }



  ngOnInit(): void {
    //recupero el id de la ruta actual
    this.movieId = this.route.snapshot.params['id']

    if (this.movieId) {
      this.isEditMode = true;
      this.loadOneMovie();
    }
  }

  loadOneMovie() {

  }

  saveMovie() {

  }

  deleteMovie() {

  }



}
