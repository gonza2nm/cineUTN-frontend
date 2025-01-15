import { Component, OnInit } from '@angular/core';
import { EventService } from '../events/event.service';
import { Event } from '../interfaces/interfaces.js';

@Component({
  selector: 'app-events-user-view',
  templateUrl: './events-user-view.component.html',
  styleUrls: ['./events-user-view.component.css']
})
export class EventsUserViewComponent implements OnInit {

  events: Event[] = [];
  errorMessage: string | null = null;
  loading: boolean = true
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadAllEvents()
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

}
