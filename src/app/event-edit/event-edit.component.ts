import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../events/event.service';
import { CinemaService } from '../cinemas/cinema.service';
import { Cinema } from '../interfaces/cinema.interface.js';
import { Event } from '../interfaces/event.interface.js';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  eventId: number | null = null;
  isEditMode: boolean = false;
  errorMessage: string | null = null;
  eventForm: FormGroup;
  eventData: Event = {
    id: 0,
    name: '',
    description: '',
    startDate: new Date(), //lo inicializamo con la fecha de hoy para que no de error
    finishDate: new Date(),
    cinemas: [],
  }
  //para obtener los cines actuales del evento:
  eventCinemasIds: number[] = [];
  //para obtener todos los cines existentes
  allCinemas: Cinema[] = [];

  constructor(
    private route: ActivatedRoute, // Se usa para acceder a informacion de la ruta activa , en este caso para acceder al parametro id
    private router: Router,
    private eventService: EventService,
    private cinemaService: CinemaService,
  ) {
    //se inicializa dentro del constructor, para que este configurado y disponible para usarse
    this.eventForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      finishDate: new FormControl('', [Validators.required]),
    }, { validators: this.checkDates }); //funcion de validacion de fechas
  }

  ngOnInit(): void {
    //recupero el id de la ruta actual
    this.eventId = this.route.snapshot.params['id']

    if (this.eventId) {
      this.isEditMode = true;
      this.loadOneEvent();
    } else { // si no edit mode igual necesito recuperar todos los cines
      this.loadAllCinemas()
    }
  }

  loadOneEvent() {
    if (this.eventId) { //sin este if no deja entrar al metodo porque dice que puede ser null
      this.eventService.getOneEvent(this.eventId).subscribe({
        next: (response) => {
          this.eventData = response.data
          this.errorMessage = null;
          //Pongo los datos del event en el form
          this.eventForm.setValue({
            name: this.eventData.name,
            description: this.eventData.description,
            startDate: this.formatToDateTimeLocal(this.eventData.startDate),
            finishDate: this.formatToDateTimeLocal(this.eventData.finishDate),
          });

          //extraemos los IDs de lo cines asociados al evento
          this.eventCinemasIds = this.eventData.cinemas.map(cinema => cinema.id).filter((id): id is number => id !== undefined)
          this.loadAllCinemas();

        },
        error: (err) => {
          this.errorMessage = 'An error occurred while fetching the event.'
          console.error('Error getting event:', err.error.message);
          this.router.navigate(['/manager-home/events']); //por si se quiere meter a un id que no existe.
        }
      });
    }
  }

  loadAllCinemas() {
    this.cinemaService.getAllCinemas().subscribe({
      next: (response) => {
        this.allCinemas = response.data;
      },
      error: (err) => {
        console.error('Error getting all cinemas', err.error.message)
      }
    })
  }

  saveEvent() {
    //Guardo los datos ingresados del form en el eventData
    this.eventData.name = this.eventForm.get('name')?.value; //busca en el formGroup el formControl que se llame 'name' y con .value le agarra el valor.
    this.eventData.description = this.eventForm.get('description')?.value;
    this.eventData.startDate = this.eventForm.get('startDate')?.value;
    this.eventData.finishDate = this.eventForm.get('finishDate')?.value;

    // guarda en el eventData objetos cines solo con el id y sus propiedades vacias. Para despues en el back usar el getReference()
    this.eventData.cinemas = this.eventCinemasIds.map(id => ({ id, name: '', address: '', theaters: [], movies: [] }));
    if (this.isEditMode) {
      if (this.eventId) { //sin este if no deja entrar al metodo porque dice que puede ser null
        this.eventService.updateEvent(this.eventId, this.eventData).subscribe({
          next: () => {
            this.errorMessage = null; //borra el mensaje de error por si viene alguno viejo arrastrado
            this.router.navigate(['/manager-home/events'])
          },
          error: (err) => {
            this.errorMessage = 'Ocurrio un error al actualizar el evento: ' + err.error.message
            console.error('Error updating event:', err.error);
          }
        });
      }
    } else { //o sea si no esta en editMode entra al add
      this.eventService.addEvent(this.eventData).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/manager-home/events'])
        },
        error: (err) => {
          this.errorMessage = 'Ocurrio un error al guardar el evento: ' + err.error.message
          console.error('Error saving event:', err.error);
        }
      })
    }
  }

  deleteEvent() {
    if (this.eventId) {
      this.eventService.deleteEvent(this.eventId).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/manager-home/events'])
        },
        error: (err) => {
          this.errorMessage = 'An error occurred while deleting the event.'
          console.error('Error deleting event:', err.error.error);
        }
      })
    }
  }

  checkDates: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const start = group.get('startDate')?.value;
    const end = group.get('finishDate')?.value;

    if (!start || !end) {
      return null; // No validar si no hay datos
    }
    const startDate = new Date(start);
    const endDate = new Date(end);

    return startDate && endDate && startDate <= endDate
      ? null
      : { invalidDates: true };
  };

  formatToDateTimeLocal(date2: Date): string {
    const date = new Date(date2);
    // Ajustar la fecha eliminando la diferencia de zona horaria
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }



  toggleCinemaSelection(cinemaId: number) {
    const index = this.eventCinemasIds.indexOf(cinemaId);
    if (index === -1) {
      this.eventCinemasIds.push(cinemaId);
    } else {
      this.eventCinemasIds.splice(index, 1);
    }
  }

}


