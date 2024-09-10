import { Component, OnInit } from '@angular/core';
import { Cinema } from '../interfaces/interfaces';
import { CinemaService } from './cinema.service';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit {
  //array vacio de tipo Cinema[]
  cinemas: Cinema[] = [];
  //una variable que puede tener un msj de error o null
  errorMessage: string | null = null;

  //recibe una instancia de CinemaService
  constructor(private cinemaService: CinemaService) { }

  //cuando el componente es inicializado se ejecuta
  ngOnInit(): void {
    this.loadCinemas();
  }

  //realiza la solitud al servicio para obtener los datos de los cinema
  loadCinemas() {
    //Se llama al método getAllCinemas() del servicio CinemaService, que devuelve un Observable que se suscribe, puede devolver (response) o (error).
    this.cinemaService.getAllCinemas().subscribe(
      (response) => {
        if ('data' in response) { //si la respuesta tiene un campo data(o sea fue exitosa) se asigna la lista de cines a this.cinemas y el msj de error se reinicia a null
          this.cinemas = response.data;
          this.errorMessage = null;
        } else {
          //si no hay data(o sea hay un problema en la response), se asigna el mensaje de error a this.errorMesaje (responseWithError), ej: message: cinemas not found
          this.errorMessage = response.message;
        }
      },
      (error) => {  //el observable emitio un error 
        //Si ocurre un error durante la solicitud HTTP, se asigna un mensaje genérico a errorMessage, y el error se imprime en la consola
        this.errorMessage = 'An error occurred while fetching cinemas.';
        console.error('Error getting cinemas:', error);
      }
    );
  }
}

//Me devuelve el cine completo con las peliculas y todo, pero yo en realidad quiero solo los datos del cine o si lo quiero....? porque al borrar un cine deberia borrar tambien las cosas relacionadas a el, ej: las salas. PERO, eso se haria en /manager/home/cinemas/"X" y no aca, conviene pedirlo solo con los datos iniciales al pedir que lo seleccione para administrar y luego buscar por ID el cine cuando seleccione cual quiere administrar o combiene directamente buscar todos y listo?
