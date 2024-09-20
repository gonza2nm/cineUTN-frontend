import { Component, OnInit } from '@angular/core';
import { Cinema } from '../interfaces/interfaces';
import { CinemaService } from './cinema.service';

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
      error: () => {  //el observable emitio un error 
        //Si ocurre un error durante la solicitud HTTP, se asigna un mensaje genérico a errorMessage, y el error se imprime en la consola
        this.errorMessage = 'An error occurred while fetching cinemas.';
        console.error('Error getting cinemas:');
        this.loading = false;
      }
    });
  }
}

//Me devuelve el cine completo con las peliculas y todo, pero yo en realidad quiero solo los datos del cine o si lo quiero....? porque al borrar un cine deberia borrar tambien las cosas relacionadas a el, ej: las salas. PERO, eso se haria en /manager/home/cinemas/"X" y no aca, conviene pedirlo solo con los datos iniciales al pedir que lo seleccione para administrar y luego buscar por ID el cine cuando seleccione cual quiere administrar o combiene directamente buscar todos y listo?
