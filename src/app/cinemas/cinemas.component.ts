import { Component, OnInit } from '@angular/core';
import { Cinema } from '../interfaces/interfaces.js';
import { CinemaService } from './cinema.service.js';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit {

  cinemas: Cinema[] = [];

  constructor(private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.loadCinemas();
  }

  loadCinemas() {
    this.cinemaService.getAllCinemas().subscribe(
      (data: Cinema[]) => {
        this.cinemas = data;
      },
      (error) => {
        console.error('Error getting cinemas:', error)
      }
    )
  }
}
