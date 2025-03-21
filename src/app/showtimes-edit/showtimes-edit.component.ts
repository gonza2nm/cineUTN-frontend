import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ShowtimesByCinemaService } from '../showtimes-by-cinema/showtimes-by-cinema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatWidth, getLocaleDateTimeFormat } from '@angular/common';
import { Theater } from '../interfaces/theater.interface.js';
import { Movie } from '../interfaces/movie.interface.js';
import { Format } from '../interfaces/format.interface.js';
import { Language } from '../interfaces/language.interface.js';
import { Show } from '../interfaces/show.interface.js';

@Component({
  selector: 'app-showtimes-edit',
  templateUrl: './showtimes-edit.component.html',
})
export class ShowtimesEditComponent implements OnInit {
  editMode: boolean = true;
  showtimeForm!: FormGroup;
  cinemaId: number | null = null;
  theaters: Theater[] = [];
  movies: Movie[] = [];
  errorMessage: null | string = null;
  showtimeId: null | number = null;
  selectedMovieId: number | null = null;
  languages: Language[] = [];
  formats: Format[] = [];
  showtime: Show = {
    id: 0,
    dayAndTime: new Date(),
    finishTime: new Date(),
    format: { id: 0, formatName: '' },
    language: {
      id: 0,
      languageName: '',
    },
    movie: {
      id: 0,
      name: '',
      duration: 0,
      description: '',
      imageLink: '',
      genres: [],
      cinemas: [],
      formats: [],
      languages: []
    },
    theater: {
      cinema: {
        id: 0,
        name: '',
        address: '',
        theaters: [],
        movies: [],
      }, id: 0, numChairs: 0, cantRows: 0, cantCols: 0
    },
    tickets: [],
  };

  constructor(
    private service: ShowtimesByCinemaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cinemaId = this.route.snapshot.params['cid'];
    this.showtimeId = this.route.snapshot.params['sid'];
    this.showtimeForm = new FormGroup(
      {
        startDate: new FormControl('', [Validators.required]),
        selectMovieId: new FormControl(null, [Validators.required]),
        selectTheaterId: new FormControl(null, [Validators.required]),
        selectFormatId: new FormControl(null, [Validators.required]),
        selectLanguageId: new FormControl(null, [Validators.required]),
      }
    );

    if (!this.showtimeId) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
    this.loadCinema();
  }

  loadCinema() {
    if (this.cinemaId !== null) {
      this.service.getCinema(this.cinemaId).subscribe({
        next: (response) => {
          this.cinemaId = response.data.id;
          this.theaters = response.data.theaters;
          this.movies = response.data.movies;
          this.errorMessage = null;
          if (this.editMode) {
            this.loadShowtime();
          }
        },
        error: () => {
          this.errorMessage = 'An error occurred while fetching cinema.';
          console.error('Error getting cinema:');
          this.router.navigate(['/manager-home/showtimes']);
        },
      });
    }
  }

  loadShowtime() {
    if (this.showtimeId) {
      this.service.getShowtime(this.showtimeId, 'yes').subscribe({
        next: (response) => {
          this.showtime = response.data;
          this.errorMessage = null;
          if (!this.validate()) {
            this.errorMessage = 'Url with incorrect data';
            this.router.navigate(['/manager-home/showtimes']);
          }
          this.formats = this.showtime.movie.formats;
          this.languages = this.showtime.movie.languages;
          this.showtimeForm.setValue({
            startDate: this.formatToDateTimeLocal(this.showtime.dayAndTime),
            selectMovieId: this.showtime.movie.id,
            selectFormatId: this.showtime.format.id,
            selectLanguageId: this.showtime.language.id,
            selectTheaterId: this.showtime.theater.id,
          });
        },
        error: () => {
          this.errorMessage = 'An error occurred while fetching the showtime.';
          console.error('Error getting showtime:');
        },
      });
    }
  }

  validate() {
    return this.theaters.some((t) => t.id == this.showtime?.theater.id);
  }

  deleteShowtime() {
    if (this.showtimeId) {
      this.service.deleteShowtime(this.showtimeId).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/manager-home/showtimes/', this.cinemaId]);
        },
        error: () => {
          this.errorMessage = 'An error occurred while deleting the showtime.';
          console.error('Error deleting showtime:');
        },
      });
    }
  }

  submit() {
    this.showtime.dayAndTime = this.showtimeForm.get('startDate')?.value;
    this.showtime.format = this.showtimeForm.get('selectFormatId')?.value;
    this.showtime.language = this.showtimeForm.get('selectLanguageId')?.value;
    this.showtime.movie = this.showtimeForm.get('selectMovieId')?.value;
    this.showtime.theater = this.showtimeForm.get('selectTheaterId')?.value;
    if (this.editMode) {
      if (this.showtimeId != null) {
        this.service.updateShowtime(this.showtimeId, this.showtime).subscribe({
          next: () => {
            this.errorMessage = null;
            this.router.navigate(['/manager-home/showtimes/', this.cinemaId]);
          },
          error: (err) => {
            this.errorMessage = err.error.message;;
            console.error('Error updating showtime:');
          },
        });
      }
    } else {
      this.service.addShowtime(this.showtime).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/manager-home/showtimes/', this.cinemaId]);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          console.error('Error creating showtime:', err.error.message);
        },
      });
    }
  }

  formatToDateTimeLocal(date2: Date): string {
    const date = new Date(date2);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  onMovieChange() {
    this.selectedMovieId = this.showtimeForm.get('selectMovieId')?.value;
    if (this.showtime != null) {
      this.showtimeForm.setValue({
        startDate: this.showtimeForm.get('startDate')?.value,
        selectMovieId: this.selectedMovieId,
        selectTheaterId: this.showtimeForm.get('selectTheaterId')?.value,
        selectFormatId: null,
        selectLanguageId: null,
      });
    }

    if (this.selectedMovieId !== null) {
      this.service.getMovieData(this.selectedMovieId).subscribe({
        next: (response) => {
          this.formats = response.data.formats;
          this.languages = response.data.languages;
        },
        error: () => {
          this.errorMessage = 'An error occurred while searching the movie.';
          console.error('Error searching movie:');
        },
      });
    } else {
      this.languages = [];
      this.formats = [];
    }
  }
}
