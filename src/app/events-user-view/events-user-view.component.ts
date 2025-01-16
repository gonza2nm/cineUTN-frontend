import { Component, OnInit } from '@angular/core';
import { EventService } from '../events/event.service';
import { Cinema, Event } from '../interfaces/interfaces.js';
import { CinemaService } from '../cinemas/cinema.service';

@Component({
  selector: 'app-events-user-view',
  templateUrl: './events-user-view.component.html',
  styleUrls: ['./events-user-view.component.css']
})
export class EventsUserViewComponent implements OnInit {

  events: Event[] = [];
  cinemas: Cinema[] = [];
  selectedCinema: Cinema | null = null;

  errorMessage: string | null = null;
  loading: boolean = true

  constructor(
    private eventService: EventService,
    private cinemaService: CinemaService,
  ) { }

  ngOnInit(): void {
    this.loadAllEvents()
    this.loadCinemas()
  }

  loadAllEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        this.events = response.data;
        this.errorMessage = null;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Ocurrio un error buscando los eventos, intente nuevamente.';
        console.error('Error getting events:', err.error.message);
        this.loading = false;
      }
    });
  }

  getCinemasNames(event: Event): string {
    // Agarramos los nombres de los cines de ese evento
    return event.cinemas.map(cinema => cinema.name).join(', ');
  }

  loadCinemas() {
    this.cinemaService.getAllCinemas().subscribe({
      next: (response) => {
        this.cinemas = response.data;
      },
      error: (err) => {
        console.error('Error getting all cinemas', err.error.message)
      }
    })
  }

  /*recibe el objeto seleccionado del dropdown y lo asigna al cine seleccionado para luego hacer los filtros
  asigna null si no esta seleccionado y asigna el cine en caso de que si*/
  handleItemSelected(item: Cinema | { clear: string }): void {
    if ('clear' in item) {
      this.selectedCinema = null;
      this.loadAllEvents();
    } else {
      this.selectedCinema = item;
    }
    this.filterEventsByCinema();
  }

  filterEventsByCinema() {
    if (this.selectedCinema) {
      this.eventService.getEventsByCinema(this.selectedCinema.id).subscribe({
        next: (response) => {
          if ('data' in response) {
            this.events = response.data;
            this.errorMessage = null;
          }
        },
        error: (err) => {
          this.errorMessage = 'Ocurrió un error filtrando los eventos, intente nuevamente.';
          console.error('Error filtering events:', err.error);
        }
      });
    }
  }
}
