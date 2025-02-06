import { Component, OnInit } from '@angular/core';
import { TheaterByCinemaService } from '../theaters-by-cinema/theater-by-cinema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cinema, Theater } from '../interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-theater-edit',
  templateUrl: './theater-edit.component.html',
  styleUrls: ['./theater-edit.component.css'],
})
export class TheaterEditComponent implements OnInit {
  editMode: boolean = true;
  theaterForm: FormGroup = new FormGroup({
    max_seats: new FormControl('', [Validators.required, Validators.min(1)]),
    cantRows: new FormControl('', [Validators.required, Validators.min(1)]),
    cantCols: new FormControl('', [Validators.required, Validators.min(1)]),
  });
  cinema: Cinema = {
    id: 0,
    address: '',
    movies: [],
    name: '',
    theaters: [],
  };
  errorMessage: null | string = null;
  theaterId: null | number = null;
  maxSeats: number = 0;
  theater: Theater = {
    id: 0,
    numChairs: 0,
    cantRows: 0,
    cantCols: 0,
    cinema: { id: 0, name: '', address: '', theaters: [], movies: [] },
  };

  constructor(
    private service: TheaterByCinemaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cinema.id = this.route.snapshot.params['cid'];
    this.theaterId = this.route.snapshot.params['tid'];
    if (!this.theaterId) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
    this.loadCinema();

    this.theaterForm.get('cantRows')?.valueChanges.subscribe(() => this.updateMaxSeats());
    this.theaterForm.get('cantCols')?.valueChanges.subscribe(() => this.updateMaxSeats());
  }

  updateMaxSeats(): void {
    const cantRows = this.theaterForm.get('cantRows')?.value;
    const cantCols = this.theaterForm.get('cantCols')?.value;

    if (cantRows && cantCols) {
      this.maxSeats = cantRows * cantCols;
      this.theaterForm.get('max_seats')?.setValue(this.maxSeats);
    }
  }

  loadCinema() {
    if (this.cinema.id !== null) {
      this.service.getCinema(this.cinema.id).subscribe({
        next: (response) => {
          this.cinema = response.data;
          this.errorMessage = null;
          if (this.editMode) {
            this.loadTheater();
          }
        },
        error: () => {
          this.errorMessage = 'An error occurred while fetching cinema.';
          console.error('Error getting cinema:');
          this.router.navigate(['/manager-home/theaters']);
        },
      });
    }
  }

  loadTheater() {
    if (this.theaterId) {
      let isValid = this.validate();
      if (!isValid) {
        this.errorMessage = 'Url with incorrect data';
        console.log(this.errorMessage);
        this.router.navigate(['/manager-home/theaters']);
      } else {
        this.service.getTheater(this.theaterId).subscribe({
          next: (response) => {
            this.theater = response.data;
            this.errorMessage = null;
            this.theaterForm.setValue({
              max_seats: this.theater.numChairs,
              cantRows: this.theater.cantRows,
              cantCols: this.theater.cantCols
            });
          },
          error: () => {
            this.errorMessage = 'An error occurred while fetching the theater.';
            console.error('Error getting theater:');
          },
        });
      }
    }
  }

  validate() {
    return this.cinema.theaters.some((t) => t.id == this.theaterId);
  }

  deleteTheater() {
    if (this.theaterId) {
      this.service.deleteTheater(this.theaterId).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/manager-home/theaters/', this.cinema.id]);
        },
        error: () => {
          this.errorMessage =
            'Ocurrio un error al eliminar la sala, posiblemente tiene una funcion asociada, elimine las funciones y luego la sala.';
          console.error('Error deleting theater:');
        },
      });
    }
  }

  submit() {
    this.theater.numChairs = this.theaterForm.get('max_seats')?.value;
    this.theater.cantRows = this.theaterForm.get('cantRows')?.value;
    this.theater.cantCols = this.theaterForm.get('cantCols')?.value;
    //le ponemos a cinema un objeto cine solo con el id y sus propiedades vacias.Para despues en el back usar el getReference()
    this.theater.cinema = { id: this.cinema.id, name: '', address: '', theaters: [], movies: [] };

    if (this.editMode) {
      if (this.theaterId) {
        this.service.updateTheater(this.theaterId, this.theater).subscribe({
          next: () => {
            this.errorMessage = null;
            this.router.navigate(['/manager-home/theaters/', this.cinema.id]);
          },
          error: () => {
            this.errorMessage = 'An error occurred while updating the theater.';
            console.error('Error updating theater:');
          },
        });
      }
    } else {
      this.service.addTheater(this.theater).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/manager-home/theaters/', this.cinema.id]);
        },
        error: (err) => {
          this.errorMessage = 'Ocurrio un error al agregar la sala.';
          console.error('Error creating theater:', err.error);
        },
      });
    }
  }
}
