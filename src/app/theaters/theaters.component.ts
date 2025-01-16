import { Component, OnInit } from '@angular/core';
import { Cinema } from '../interfaces/interfaces';
import { TheatersService } from './theaters.service';

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.css']
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
