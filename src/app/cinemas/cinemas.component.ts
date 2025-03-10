import { Component, OnInit } from '@angular/core';
import { CinemaService } from './cinema.service';
import { Cinema } from '../interfaces/cinema.interface.js';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit {

  cinemas: Cinema[] = []; //array vacio de tipo Cinema[]
  errorMessage: string | null = null; //una variable que puede tener un msj de error o null
  loading: boolean = true //Sirve para que no se muestren los mensajes de error mientras todavia esta cargando el loadCinemas

  //recibe una instancia de CinemaService
  constructor(private cinemaService: CinemaService) { }

  //cuando el componente es inicializado se ejecuta
  ngOnInit(): void {
    this.loadCinemas();
  }

  //realiza la solitud al servicio para obtener los datos de los cinema
  loadCinemas() {
    //Se llama al método getAllCinemas() del servicio CinemaService, que devuelve un Observable que se suscribe, puede devolver (response) o (error).
    this.cinemaService.getAllCinemas().subscribe({
      next: (response) => {
        this.cinemas = response.data;
        this.errorMessage = null; //borra el mensaje de error por si viene alguno viejo arrastrado
        this.loading = false;
      },
      error: (err) => {  //el observable emitio un error 
        //Si ocurre un error durante la solicitud HTTP, se asigna un mensaje genérico a errorMessage, y el error se imprime en la consola
        this.errorMessage = 'Ocurrio un error buscando los cines, intente nuevamente.';
        console.error('Error getting cinemas:', err.error.message);
        this.loading = false;
      }
    });
  }
}
