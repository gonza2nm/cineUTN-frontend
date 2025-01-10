import { Component, OnInit } from '@angular/core';
import { Event } from '../interfaces/interfaces.js';
import { EventService } from './event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[] = [];
  errorMessage: string | null = null;
  loading: boolean = true

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
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

}
