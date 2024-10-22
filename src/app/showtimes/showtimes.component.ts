import { Component, OnInit } from '@angular/core';
import { Cinema } from '../interfaces/interfaces.js';
import { CinemaService } from '../cinemas/cinema.service';

@Component({
  selector: 'app-showtimes',
  templateUrl: './showtimes.component.html',
  styleUrls: ['./showtimes.component.css']
})
export class ShowtimesComponent implements OnInit  {

  cinemas: Cinema[] = [];
  errorMessage: string | null = null;
  loading: boolean = true;

  constructor(private service: CinemaService) { }
  
  ngOnInit(): void {
    this.loadCinemas();
  }
  loadCinemas() {
    this.service.getAllCinemas().subscribe({
      next: (response) => {
          this.cinemas = response.data;
          this.errorMessage = null;
          this.loading = false;
      },
      error: () => {  
        this.errorMessage = 'An error occurred while fetching cinemas.';
        console.error('Error getting cinemas:');
        this.loading = false;
      }
    });
  }

}
