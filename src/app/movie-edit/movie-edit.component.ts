import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cinema, Format, Genre, Language, Movie } from '../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movies/movie.service';
import { GenresService } from '../genres/genres.service';
import { FormatService } from '../formats/format.service';
import { LanguageService } from '../language/language.service';
import { CinemaService } from '../cinemas/cinema.service';

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
  //esto es para obtener los genres, cinemas, etc actuales de la movie (su id)
  movieGenresIds: number[] = []
  movieFormatsIds: number[] = []
  movieLanguagesIds: number[] = []
  movieCinemasIds: number[] = []
  // esto para obetener todos los existentes
  allGenres: Genre[] = []
  allFormats: Format[] = []
  allLanguages: Language[] = []
  allCinemas: Cinema[] = []

  constructor(
    private route: ActivatedRoute, // Se usa para acceder a informacion de la ruta activa , en este caso para acceder al parametro id
    private movieService: MovieService,
    private genresService: GenresService,
    private formatService: FormatService,
    private languageService: LanguageService,
    private cinemaService: CinemaService,
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
    } else { // si no es edit mode igual tiene que cargar todas las relaciones para que el user pueda eleguir
      this.loadAllGenres();
      this.loadAllFormats();
      this.loadAllLanguages();
      this.loadAllCinemas();
    }
  }

  loadOneMovie() {
    if (this.movieId) {
      this.movieService.getOneMovie(this.movieId).subscribe({
        next: (respose) => {
          this.movieData = respose.data
          this.errorMessage = null;
          this.movieForm.setValue({
            name: this.movieData.name,
            description: this.movieData.description,
            imageLink: this.movieData.imageLink,
          });

          //map crea un nuevo array con todos los id de los genre de la pelicula
          this.movieGenresIds = this.movieData.genres.map(genre => genre.id).filter((id): id is number => id !== undefined);
          this.loadAllGenres();

          this.movieFormatsIds = this.movieData.formats.map(format => format.id).filter((id): id is number => id !== undefined)
          this.loadAllFormats();

          this.movieLanguagesIds = this.movieData.languages.map(language => language.id).filter((id): id is number => id !== undefined)
          this.loadAllLanguages();

          this.movieCinemasIds = this.movieData.cinemas.map(cinema => cinema.id).filter((id): id is number => id !== undefined)
          this.loadAllCinemas();
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

  loadAllFormats() {
    this.formatService.getFormats().subscribe({
      next: (response) => {
        this.allFormats = response.data;
      },
      error: () => {
        console.error('Error getting all formats')
      }
    })
  }

  loadAllLanguages() {
    this.languageService.getLanguages().subscribe({
      next: (response) => {
        this.allLanguages = response.data;
      },
      error: () => {
        console.error('Error getting all languages')
      }
    })
  }

  loadAllCinemas() {
    this.cinemaService.getAllCinemas().subscribe({
      next: (response) => {
        this.allCinemas = response.data;
      },
      error: () => {
        console.error('Error getting all cinemas')
      }
    })
  }

  saveMovie() {
    this.movieData.name = this.movieForm.get('name')?.value; //pongo los datos de del form en la movieData
    this.movieData.description = this.movieForm.get('description')?.value;
    this.movieData.imageLink = this.movieForm.get('imageLink')?.value;

    // Guardamos los id de los generos actuales en movieData antes de guardarlo y le ponemos los datos que le faltan vacios para que no genere problemas de tipo.
    this.movieData.genres = this.movieGenresIds.map(id => ({ id, name: '' }));
    this.movieData.formats = this.movieFormatsIds.map(id => ({ id, formatName: '' }));
    this.movieData.languages = this.movieLanguagesIds.map(id => ({ id, languageName: '' }));
    this.movieData.cinemas = this.movieCinemasIds.map(id => ({ id, name: '', address: '', theaters: [], movies: [] }));



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
    } else {
      this.movieService.addMovie(this.movieData).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/manager-home/movies'])
        },
        error: () => {
          this.errorMessage = 'An error occurred while saving the movie.'
          console.error('Error saving movie:');
        }
      })
    }
  }

  deleteMovie() {
    //Ojito, que no deje borrar si existen funciones que usen la pelicula! (y eventos en A.D)

  }

  toggleGenreSelection(genreId: number) {
    const index = this.movieGenresIds.indexOf(genreId);
    if (index === -1) { // Si no esta en el array, lo agregamos
      this.movieGenresIds.push(genreId);
    } else { // Si ya esta, lo quitamos
      this.movieGenresIds.splice(index, 1);
    }
  }

  toggleFormatSelection(formatId: number) {
    const index = this.movieFormatsIds.indexOf(formatId);
    if (index === -1) {
      this.movieFormatsIds.push(formatId);
    } else {
      this.movieFormatsIds.splice(index, 1);
    }
  }

  toggleLanguageSelection(languageId: number) {
    const index = this.movieLanguagesIds.indexOf(languageId);
    if (index === -1) {
      this.movieLanguagesIds.push(languageId);
    } else {
      this.movieLanguagesIds.splice(index, 1);
    }
  }

  toggleCinemaSelection(cinemaId: number) {
    const index = this.movieCinemasIds.indexOf(cinemaId);
    if (index === -1) {
      this.movieCinemasIds.push(cinemaId);
    } else {
      this.movieCinemasIds.splice(index, 1);
    }
  }
}
