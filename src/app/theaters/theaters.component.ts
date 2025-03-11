import { Component, OnInit } from '@angular/core';
import { TheatersService } from './theaters.service';
import { Cinema } from '../interfaces/cinema.interface.js';

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
})
export class TheatersComponent implements OnInit {

  cinemas: Cinema[] = [];
  errorMessage: string | null = null;
  loading: boolean = true;

  constructor(private service: TheatersService) { }

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
        this.errorMessage = 'Ocurrio un error buscando los cines, intente nuevamente.';
        console.error('Error getting cinemas:');
        this.loading = false;
      }
    });
  }

}
