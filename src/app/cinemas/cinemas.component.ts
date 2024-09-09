import { Component, OnInit } from '@angular/core';
import { Cinema } from '../interfaces/interfaces';
import { CinemaService } from './cinema.service';

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
        console.log(this.cinemas) //sacar esto
      },
      (error) => {
        console.error('Error getting cinemas:', error)
      }
    )
    //Me devuelve el cine completo con las peliculas y todo, pero yo en realidad quiero solo los datos del cine o si lo quiero....? porque al borrar un cine deberia borrar tambien las cosas relacionadas a el, ej: las salas. PERO, eso se haria en /manager/home/cinemas/"X" y no aca, conviene pedirlo solo con los datos iniciales al pedir que lo seleccione para administrar y luego buscar por ID el cine cuando seleccione cual quiere administrar o combiene directamente buscar todos y listo?
  }

}
