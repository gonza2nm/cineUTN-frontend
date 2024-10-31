import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Genre, Movie } from '../interfaces/interfaces.js';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movies/movie.service';
import { GenresService } from '../genres/genres.service';

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
  //esto es para obtener los genres, cinemas, etc actuales de la movie
  movieGenresIds: number[] = []

  // esto para obetener todos los existentes
  allGenres: Genre[] = []

  constructor(
    private route: ActivatedRoute, // Se usa para acceder a informacion de la ruta activa , en este caso para acceder al parametro id
    private movieService: MovieService,
    private genresService: GenresService,
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
    if (this.movieId) {
      this.movieService.getOneMovie(this.movieId).subscribe({
        next: (respose) => {
          this.movieData = respose.data
          this.errorMessage = null;

          this.movieData.formats = [];
          this.movieData.languages = [];
          this.movieData.cinemas = [];

          this.movieForm.setValue({
            name: this.movieData.name,
            description: this.movieData.description,
            imageLink: this.movieData.imageLink,
          });

          //map crea un nuevo array con todos los id de los genre de la pelicula
          this.movieGenresIds = this.movieData.genres.map(genre => genre.id).filter((id): id is number => id !== undefined);
          this.loadAllGenres();
        },
        error: () => {
          this.errorMessage = 'An error occurred while fetching the movie.'
          console.error('Error getting movie:');
          this.router.navigate(['/manager-home/movies']);
        }
      })
    }


  }

  loadAllGenres() {
    this.genresService.getGenres().subscribe({
      next: (response) => {
        this.allGenres = response.data; //guardo en allGenres todos los generos globales.
      },
      error: () => {
        console.error('Error getting all the genres')
      }
    })
  }

  saveMovie() {
    this.movieData.name = this.movieForm.get('name')?.value; //pongo los datos de del from en la movieData
    this.movieData.description = this.movieForm.get('description')?.value;
    this.movieData.imageLink = this.movieForm.get('imageLink')?.value;

    // Guardamos los generos actuales en movieData antes de guardarlo
    this.movieData.genres = this.movieGenresIds.map(id => ({ id }));



    if (this.isEditMode) {
      if (this.movieId) {
        this.movieService.updateMovie(this.movieId, this.movieData).subscribe({
          next: () => {
            this.errorMessage = null; //borra el mensaje de error por si viene alguno viejo arrastrado
            this.router.navigate(['/manager-home/movies'])
          },
          error: (error) => {
            this.errorMessage = 'An error occurred while updating the movie.'
            console.error('Error updating movie:', error.error);
          }
        })
      }
    }
  }

  deleteMovie() {

  }

  toggleGenreSelection(genreId: number) {
    const index = this.movieGenresIds.indexOf(genreId);
    if (index === -1) { // Si no esta en el array, lo agregamos
      this.movieGenresIds.push(genreId);
    } else { // Si ya esta, lo quitamos
      this.movieGenresIds.splice(index, 1);
    }
  }


}
